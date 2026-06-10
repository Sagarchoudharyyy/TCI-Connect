from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.user_model import User
from app.schemas.user_schema import UserRegister
from app.core.security import hash_password

router = APIRouter(tags=["Doctors"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/doctors")
def get_all_doctors(db: Session = Depends(get_db)):

    doctors = db.query(User).filter(User.role == "doctor").all()

    return doctors


@router.post("/doctors")
def create_doctor(user: UserRegister, db: Session = Depends(get_db)):

    new_doctor = User(
        full_name=user.full_name,
        username=user.email,
        email=user.email,
        phone=user.phone,
        business_name=user.business_name,
        license_number=user.license_number,
        vat_id=user.vat_id,
        country=user.country,
        password=hash_password(user.password),
        role="doctor",
        status="pending"
    )

    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)

    return {
        "message": "Doctor created successfully",
        "doctor": new_doctor
    }
    
@router.put("/doctors/{doctor_id}")
def update_doctor(
  doctor_id:int,
  user: UserRegister,
  db:Session =Depends(get_db)
):
  doctor =db.query(User).filter(
    User.id==doctor_id,
    User.role=="doctor"
  ).first()
  if not doctor:
    return {"message": "Doctor not found"}

  
   
  doctor.full_name = user.full_name
  doctor.username = user.email
  doctor.email = user.email
  doctor.phone = user.phone
  doctor.business_name = user.business_name
  doctor.license_number = user.license_number
  doctor.vat_id = user.vat_id
  doctor.country = user.country
  doctor.password = user.password
  db.commit()
  db.refresh(doctor)

  return {
        "message": "Doctor updated successfully",
        "doctor": doctor
    }

@router.put("/toggle-doctor-status/{doctor_id}")
def toggle_doctor_status(
    doctor_id: int,
    db: Session = Depends(get_db)
):

    doctor = db.query(User).filter(
        User.id == doctor_id,
        User.role == "doctor"
    ).first()

    if not doctor:
        return {
            "message": "Doctor not found"
        }

    if doctor.status == "approved":
        doctor.status = "pending"
    else:
        doctor.status = "approved"

    db.commit()
    db.refresh(doctor)

    return {
        "message": "Doctor status updated",
        "doctor": doctor
    }

@router.delete("/doctors/{doctor_id}")
def delete_doctor(
    doctor_id: int,
    db: Session = Depends(get_db)
):

    doctor = db.query(User).filter(
        User.id == doctor_id,
        User.role == "doctor"
    ).first()

    if not doctor:
        return {"message": "Doctor not found"}

    db.delete(doctor)
    db.commit()

    return {
        "message": "Doctor deleted successfully"
    }