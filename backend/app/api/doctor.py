from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.user_model import User
from app.schemas.user_schema import UserRegister
from app.core.security import hash_password
from app.models.notification_model import Notification

from app.services.email_service import (
    send_new_registration_email_to_admin,
    send_registration_received_email,
    send_doctor_approval_email,
)

from app.api.auth import get_current_user
from app.websocket.manager import manager


router = APIRouter(tags=["Doctors"])


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def require_admin(
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return current_user


@router.get("/doctors")
def get_all_doctors(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    doctors = (
        db.query(User)
        .filter(User.role == "doctor")
        .all()
    )

    return doctors


@router.get("/doctors/{doctor_id}")
def get_doctor_by_id(
    doctor_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    doctor = (
        db.query(User)
        .filter(
            User.id == doctor_id,
            User.role == "doctor"
        )
        .first()
    )

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    return doctor


@router.post("/doctors")
async def create_doctor(
    user: UserRegister,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    existing_doctor = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_doctor:
        raise HTTPException(
            status_code=409,
            detail="Email already exists"
        )

    new_doctor = User(
        full_name=user.full_name,
        username=user.email,
        email=user.email,
        phone=user.phone,
        business_name=user.business_name,
        business_type=user.business_type,
        license_number=user.license_number,
        vat_id=user.vat_id,
        country=user.country,
        address=user.address,
        password=hash_password(user.password),
        role="doctor",
        status="pending"
    )

    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)

    notification = Notification(
        message=f"New doctor registered: {new_doctor.full_name}",
        is_read=False,
        notification_type="doctor_registration"
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    background_tasks.add_task(
        send_new_registration_email_to_admin,
        new_doctor.full_name,
        new_doctor.email,
        new_doctor.phone,
        new_doctor.business_name,
        new_doctor.license_number,
    )

    background_tasks.add_task(
        send_registration_received_email,
        new_doctor.full_name,
        new_doctor.email,
    )

    await manager.send_doctor_update({
        "type": "doctor_created",
        "doctor_id": new_doctor.id
    })

    return {
        "message": "Doctor created successfully",
        "doctor": new_doctor
    }


@router.put("/doctors/{doctor_id}")
async def update_doctor(
    doctor_id: int,
    user: UserRegister,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    doctor = (
        db.query(User)
        .filter(
            User.id == doctor_id,
            User.role == "doctor"
        )
        .first()
    )

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    existing_user = (
        db.query(User)
        .filter(
            User.email == user.email,
            User.id != doctor_id
        )
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="Email already exists"
        )

    doctor.full_name = user.full_name
    doctor.username = user.email
    doctor.email = user.email
    doctor.phone = user.phone
    doctor.business_name = user.business_name
    doctor.business_type = user.business_type
    doctor.license_number = user.license_number
    doctor.vat_id = user.vat_id
    doctor.country = user.country
    doctor.address = user.address

    doctor.password = hash_password(user.password)

    db.commit()
    db.refresh(doctor)

    await manager.send_doctor_update({
        "type": "doctor_updated",
        "doctor_id": doctor.id
    })

    return {
        "message": "Doctor updated successfully",
        "doctor": doctor
    }


@router.put("/doctors/{doctor_id}/approve")
async def approve_doctor(
    doctor_id: int,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    doctor = (
        db.query(User)
        .filter(
            User.id == doctor_id,
            User.role == "doctor"
        )
        .first()
    )

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    if doctor.status == "approved":
        return {
            "message": "Doctor is already approved",
            "doctor": doctor
        }

    if doctor.status != "pending":
        raise HTTPException(
            status_code=400,
            detail=f"Doctor cannot be approved from status '{doctor.status}'"
        )

    doctor.status = "approved"

    db.commit()
    db.refresh(doctor)

    background_tasks.add_task(
        send_doctor_approval_email,
        doctor.full_name,
        doctor.email,
    )

    await manager.send_doctor_update({
        "type": "doctor_status_updated",
        "doctor_id": doctor.id
    })

    return {
        "message": "Doctor approved successfully",
        "doctor": doctor
    }


@router.put("/toggle-doctor-status/{doctor_id}")
async def toggle_doctor_status(
    doctor_id: int,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    doctor = (
        db.query(User)
        .filter(
            User.id == doctor_id,
            User.role == "doctor"
        )
        .first()
    )

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    old_status = doctor.status

    if doctor.status == "approved":

        doctor.status = "pending"

    elif doctor.status == "pending":

        doctor.status = "approved"

    else:

        raise HTTPException(
            status_code=400,
            detail=f"Doctor cannot be toggled from status '{doctor.status}'"
        )

    db.commit()
    db.refresh(doctor)

    if (
        old_status == "pending"
        and doctor.status == "approved"
    ):
        background_tasks.add_task(
            send_doctor_approval_email,
            doctor.full_name,
            doctor.email,
        )

    await manager.send_doctor_update({
        "type": "doctor_status_updated",
        "doctor_id": doctor.id
    })

    return {
        "message": "Doctor status updated",
        "doctor": doctor
    }


@router.delete("/doctors/{doctor_id}")
async def delete_doctor(
    doctor_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    doctor = (
        db.query(User)
        .filter(
            User.id == doctor_id,
            User.role == "doctor"
        )
        .first()
    )

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    deleted_doctor_id = doctor.id

    db.delete(doctor)
    db.commit()

    await manager.send_doctor_update({
        "type": "doctor_deleted",
        "doctor_id": deleted_doctor_id
    })

    return {
        "message": "Doctor deleted successfully"
    } 


# from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
# from sqlalchemy.orm import Session

# from app.database.database import SessionLocal
# from app.models.user_model import User
# from app.schemas.user_schema import UserRegister
# from app.core.security import hash_password
# from app.models.notification_model import Notification

# from app.services.email_service import (
#     send_new_registration_email_to_admin,
#     send_registration_received_email,
#     send_doctor_approval_email,
# )

# from app.api.auth import get_current_user


# router = APIRouter(tags=["Doctors"])


# # =========================================================
# # DATABASE
# # =========================================================

# def get_db():
#     db = SessionLocal()

#     try:
#         yield db
#     finally:
#         db.close()


# # =========================================================
# # ADMIN AUTHENTICATION
# # =========================================================

# def require_admin(
#     current_user: User = Depends(get_current_user)
# ):
#     if current_user.role != "admin":
#         raise HTTPException(
#             status_code=403,
#             detail="Admin access required"
#         )

#     return current_user


# # =========================================================
# # GET ALL DOCTORS
# # =========================================================

# @router.get("/doctors")
# def get_all_doctors(
#     db: Session = Depends(get_db),
#     current_user: User = Depends(require_admin)
# ):
#     doctors = (
#         db.query(User)
#         .filter(User.role == "doctor")
#         .all()
#     )

#     return doctors


# # =========================================================
# # GET SINGLE DOCTOR
# # =========================================================

# @router.get("/doctors/{doctor_id}")
# def get_doctor_by_id(
#     doctor_id: int,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(require_admin)
# ):
#     doctor = (
#         db.query(User)
#         .filter(
#             User.id == doctor_id,
#             User.role == "doctor"
#         )
#         .first()
#     )

#     if not doctor:
#         raise HTTPException(
#             status_code=404,
#             detail="Doctor not found"
#         )

#     return doctor


# # =========================================================
# # CREATE DOCTOR
# # =========================================================
# #
# # NOTE:
# # Public doctor registration is handled by:
# #
# # POST /api/register
# #
# # This endpoint is kept for compatibility with the existing
# # backend/frontend structure and is ADMIN ONLY.
# # =========================================================

# @router.post("/doctors")
# def create_doctor(
#     user: UserRegister,
#     background_tasks: BackgroundTasks,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(require_admin)
# ):
#     # -----------------------------------------------------
#     # Check duplicate email
#     # -----------------------------------------------------

#     existing_doctor = (
#         db.query(User)
#         .filter(User.email == user.email)
#         .first()
#     )

#     if existing_doctor:
#         raise HTTPException(
#             status_code=409,
#             detail="Email already exists"
#         )

#     # -----------------------------------------------------
#     # Create doctor
#     # -----------------------------------------------------

#     new_doctor = User(
#         full_name=user.full_name,
#         username=user.email,
#         email=user.email,
#         phone=user.phone,
#         business_name=user.business_name,
#         business_type=user.business_type,
#         license_number=user.license_number,
#         vat_id=user.vat_id,
#         country=user.country,
#         address=user.address,

#         # Always hash password
#         password=hash_password(user.password),

#         role="doctor",
#         status="pending"
#     )

#     db.add(new_doctor)
#     db.commit()
#     db.refresh(new_doctor)

#     # -----------------------------------------------------
#     # Create admin notification
#     # -----------------------------------------------------

#     notification = Notification(
#         message=f"New doctor registered: {new_doctor.full_name}",
#         is_read=False,
#         notification_type="doctor_registration"
#     )

#     db.add(notification)
#     db.commit()
#     db.refresh(notification)

#     # -----------------------------------------------------
#     # Send registration emails in background
#     # -----------------------------------------------------

#     background_tasks.add_task(
#         send_new_registration_email_to_admin,
#         new_doctor.full_name,
#         new_doctor.email,
#         new_doctor.phone,
#         new_doctor.business_name,
#         new_doctor.license_number,
#     )

#     background_tasks.add_task(
#         send_registration_received_email,
#         new_doctor.full_name,
#         new_doctor.email,
#     )

#     return {
#         "message": "Doctor created successfully",
#         "doctor": new_doctor
#     }


# # =========================================================
# # UPDATE DOCTOR
# # =========================================================

# @router.put("/doctors/{doctor_id}")
# def update_doctor(
#     doctor_id: int,
#     user: UserRegister,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(require_admin)
# ):
#     doctor = (
#         db.query(User)
#         .filter(
#             User.id == doctor_id,
#             User.role == "doctor"
#         )
#         .first()
#     )

#     if not doctor:
#         raise HTTPException(
#             status_code=404,
#             detail="Doctor not found"
#         )

#     # -----------------------------------------------------
#     # Check whether email belongs to another user
#     # -----------------------------------------------------

#     existing_user = (
#         db.query(User)
#         .filter(
#             User.email == user.email,
#             User.id != doctor_id
#         )
#         .first()
#     )

#     if existing_user:
#         raise HTTPException(
#             status_code=409,
#             detail="Email already exists"
#         )

#     # -----------------------------------------------------
#     # Update doctor information
#     # -----------------------------------------------------

#     doctor.full_name = user.full_name
#     doctor.username = user.email
#     doctor.email = user.email
#     doctor.phone = user.phone
#     doctor.business_name = user.business_name
#     doctor.business_type = user.business_type
#     doctor.license_number = user.license_number
#     doctor.vat_id = user.vat_id
#     doctor.country = user.country
#     doctor.address = user.address

#     # -----------------------------------------------------
#     # Hash password
#     # -----------------------------------------------------

#     doctor.password = hash_password(user.password)

#     db.commit()
#     db.refresh(doctor)

#     return {
#         "message": "Doctor updated successfully",
#         "doctor": doctor
#     }


# # =========================================================
# # APPROVE DOCTOR
# # =========================================================

# @router.put("/doctors/{doctor_id}/approve")
# def approve_doctor(
#     doctor_id: int,
#     background_tasks: BackgroundTasks,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(require_admin)
# ):
#     doctor = (
#         db.query(User)
#         .filter(
#             User.id == doctor_id,
#             User.role == "doctor"
#         )
#         .first()
#     )

#     if not doctor:
#         raise HTTPException(
#             status_code=404,
#             detail="Doctor not found"
#         )

#     # -----------------------------------------------------
#     # Already approved
#     # -----------------------------------------------------

#     if doctor.status == "approved":
#         return {
#             "message": "Doctor is already approved",
#             "doctor": doctor
#         }

#     # -----------------------------------------------------
#     # Only pending doctors can be approved
#     # -----------------------------------------------------

#     if doctor.status != "pending":
#         raise HTTPException(
#             status_code=400,
#             detail=f"Doctor cannot be approved from status '{doctor.status}'"
#         )

#     # -----------------------------------------------------
#     # Change status
#     # -----------------------------------------------------

#     doctor.status = "approved"

#     db.commit()
#     db.refresh(doctor)

#     # -----------------------------------------------------
#     # Send approval email
#     # -----------------------------------------------------

#     background_tasks.add_task(
#         send_doctor_approval_email,
#         doctor.full_name,
#         doctor.email,
#     )

#     return {
#         "message": "Doctor approved successfully",
#         "doctor": doctor
#     }


# # =========================================================
# # LEGACY TOGGLE STATUS
# # =========================================================
# #
# # Kept because the current admin frontend uses:
# #
# # PUT /api/toggle-doctor-status/{doctor_id}
# #
# # Current behavior:
# #
# # approved -> pending
# # pending  -> approved
# #
# # Approval email is sent ONLY for:
# #
# # pending -> approved
# # =========================================================

# @router.put("/toggle-doctor-status/{doctor_id}")
# def toggle_doctor_status(
#     doctor_id: int,
#     background_tasks: BackgroundTasks,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(require_admin)
# ):
#     doctor = (
#         db.query(User)
#         .filter(
#             User.id == doctor_id,
#             User.role == "doctor"
#         )
#         .first()
#     )

#     if not doctor:
#         raise HTTPException(
#             status_code=404,
#             detail="Doctor not found"
#         )

#     old_status = doctor.status

#     # -----------------------------------------------------
#     # Toggle status
#     # -----------------------------------------------------

#     if doctor.status == "approved":

#         doctor.status = "pending"

#     elif doctor.status == "pending":

#         doctor.status = "approved"

#     else:

#         raise HTTPException(
#             status_code=400,
#             detail=f"Doctor cannot be toggled from status '{doctor.status}'"
#         )

#     db.commit()
#     db.refresh(doctor)

#     # -----------------------------------------------------
#     # Send approval email ONLY for:
#     #
#     # pending -> approved
#     # -----------------------------------------------------

#     if (
#         old_status == "pending"
#         and doctor.status == "approved"
#     ):
#         background_tasks.add_task(
#             send_doctor_approval_email,
#             doctor.full_name,
#             doctor.email,
#         )

#     return {
#         "message": "Doctor status updated",
#         "doctor": doctor
#     }


# # =========================================================
# # DELETE DOCTOR
# # =========================================================

# @router.delete("/doctors/{doctor_id}")
# def delete_doctor(
#     doctor_id: int,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(require_admin)
# ):
#     doctor = (
#         db.query(User)
#         .filter(
#             User.id == doctor_id,
#             User.role == "doctor"
#         )
#         .first()
#     )

#     if not doctor:
#         raise HTTPException(
#             status_code=404,
#             detail="Doctor not found"
#         )

#     db.delete(doctor)
#     db.commit()

#     return {
#         "message": "Doctor deleted successfully"
#     }