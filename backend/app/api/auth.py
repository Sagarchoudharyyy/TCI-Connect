from sqlalchemy.orm import Session
from sqlalchemy import or_

from fastapi.security import (
    OAuth2PasswordBearer,
    OAuth2PasswordRequestForm
)

from fastapi import (
    APIRouter,
    Depends,
    Header,
    HTTPException,
    status,
    BackgroundTasks,
    UploadFile,
    File,
)

import hashlib
import secrets
from datetime import datetime, timedelta
from app.models.password_reset_model import PasswordResetToken
from app.services.email_service import send_password_reset_email

import os
import shutil
from pydantic import BaseModel

from app.database.database import get_db
from app.models.user_model import User
from app.models.blacklist_model import Blacklist
from app.models.notification_model import Notification

from app.schemas.forgot_password_schema import (
    ForgotPasswordRequest,
    ResetPasswordRequest
)

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    decode_access_token,
    create_refresh_token,
    decode_refresh_token
)

from app.schemas.user_schema import (
    UserRegister,
    UserLogin,
    ChangePasswordRequest,
    UpdateProfileRequest
)

from app.services.email_service import (
    send_new_registration_email_to_admin,
    send_registration_received_email,
)
from app.websocket.manager import manager

# =========================================================
# ROUTER
# =========================================================

router = APIRouter()


# =========================================================
# OAUTH2
# =========================================================

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/token"
)


# =========================================================
# CURRENT USER
# =========================================================

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    # -----------------------------------------
    # 1. Decode JWT
    # -----------------------------------------

    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    # -----------------------------------------
    # 2. Check whether token is blacklisted
    # -----------------------------------------

    blacklisted_token = (
        db.query(Blacklist)
        .filter(Blacklist.token == token)
        .first()
    )

    if blacklisted_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has been logged out",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    # -----------------------------------------
    # 3. Get user_id from JWT
    # -----------------------------------------

    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    # -----------------------------------------
    # 4. Find user
    # -----------------------------------------

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    return user


# =========================================================
# DOCTOR REGISTRATION
# =========================================================

@router.post("/register")
async def register(
    user: UserRegister,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):

    # -----------------------------------------
    # Check duplicate email
    # -----------------------------------------

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="Email already exists"
        )

    # -----------------------------------------
    # Hash password
    # -----------------------------------------

    hashed_password = hash_password(user.password)

    # -----------------------------------------
    # Create doctor
    # -----------------------------------------

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        username=user.email,
        phone=user.phone,
        business_name=user.business_name,
        business_type=user.business_type,
        address=user.address,
        license_number=user.license_number,
        vat_id=user.vat_id,
        country=user.country,
        password=hashed_password,
        role="doctor",

        # New doctors must wait for admin approval
        status="pending"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # -----------------------------------------
    # Create admin notification
    # -----------------------------------------

    notification = Notification(
        message=f"New doctor registration request from {new_user.full_name}",
        is_read=False,
        notification_type="doctor_registration",
        sender_id=new_user.id,
        receiver_id=1
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    # -----------------------------------------
    # Send ADMIN registration email
    # in background
    # -----------------------------------------

    background_tasks.add_task(
        send_new_registration_email_to_admin,
        new_user.full_name,
        new_user.email,
        new_user.phone,
        new_user.business_name,
        new_user.license_number,
    )
    await manager.send_doctor_update({
    "type": "doctor_created",
    "doctor_id": new_user.id
})

    # -----------------------------------------
    # Send DOCTOR registration email
    # in background
    # -----------------------------------------

    background_tasks.add_task(
        send_registration_received_email,
        new_user.full_name,
        new_user.email,
    )

    # -----------------------------------------
    # Response
    # -----------------------------------------

    return {
        "message": "Registration successful. Waiting for admin approval"
    }


# =========================================================
# ADMIN REGISTER
# =========================================================

@router.post("/admin-register")
def admin_register(
    user: UserRegister,
    db: Session = Depends(get_db)
):

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="Email already exists"
        )

    hashed_password = hash_password(
        user.password
    )

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        username=user.email,
        phone=user.phone,
        business_name=user.business_name,
        license_number=user.license_number,
        business_type=user.business_type,
        address=user.address,
        vat_id=user.vat_id,
        country=user.country,
        password=hashed_password,
        role="admin",
        status="approved"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Admin registered successfully"
    }


# =========================================================
# LOGIN
# =========================================================

@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    db_user = (
        db.query(User)
        .filter(
            or_(
                User.email == user.username,
                User.phone == user.username
            )
        )
        .first()
    )

    if not db_user:
        return {
            "message": "Invalid username or password"
        }

    # -----------------------------------------
    # Verify password
    # -----------------------------------------

    if not verify_password(
        user.password,
        db_user.password
    ):
        return {
            "message": "Invalid username or password"
        }

    # -----------------------------------------
    # Doctor approval check
    # -----------------------------------------

    if (
        db_user.role == "doctor"
        and db_user.status != "approved"
    ):
        return {
            "message":
            "Your account is under admin review. Please wait for approval."
        }

    # -----------------------------------------
    # Create access token
    # -----------------------------------------

    access_token = create_access_token(
        data={
            "user_id": db_user.id,
            "email": db_user.email,
            "role": db_user.role
        }
    )

    # -----------------------------------------
    # Create refresh token
    # -----------------------------------------

    refresh_token = create_refresh_token(
        data={
            "user_id": db_user.id,
            "email": db_user.email,
            "role": db_user.role
        }
    )

    # -----------------------------------------
    # Response
    # -----------------------------------------

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",

        "user": {
            "id": db_user.id,
            "full_name": db_user.full_name,
            "email": db_user.email,
            "phone": db_user.phone,
            "business_name": db_user.business_name,
            "business_type": db_user.business_type,
            "license_number": db_user.license_number,
            "vat_id": db_user.vat_id,
            "country": db_user.country,
            "address": db_user.address,
            "role": db_user.role,
            "profile_image": db_user.profile_image,
        }
    }


# =========================================================
# TOKEN LOGIN
# =========================================================

@router.post("/token")
def token_login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    db_user = (
        db.query(User)
        .filter(
            or_(
                User.email == form_data.username,
                User.phone == form_data.username
            )
        )
        .first()
    )

    if not db_user:
        return {
            "message": "Invalid username or password"
        }

    if not verify_password(
        form_data.password,
        db_user.password
    ):
        return {
            "message": "Invalid username or password"
        }

    # -----------------------------------------
    # Doctor approval check
    # -----------------------------------------

    if (
        db_user.role == "doctor"
        and db_user.status != "approved"
    ):
        return {
            "message":
            "Your account is under admin review. Please wait for approval."
        }

    # -----------------------------------------
    # Create token
    # -----------------------------------------

    access_token = create_access_token(
        data={
            "user_id": db_user.id,
            "email": db_user.email,
            "role": db_user.role
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }



@router.post("/forgot-password")
def forgot_password(
    request: ForgotPasswordRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.email == request.email)
        .first()
    )

    # Always return the same response when the email
    # does not exist to avoid exposing registered emails.
    if not user:
        return {
            "success": True,
            "message": "If an account exists with this email, a password reset link has been sent."
        }

    # Invalidate previous unused reset tokens
    db.query(PasswordResetToken).filter(
        PasswordResetToken.user_id == user.id,
        PasswordResetToken.used == False,
    ).update(
        {
            PasswordResetToken.used: True
        },
        synchronize_session=False,
    )

    # Generate a secure random token
    raw_token = secrets.token_urlsafe(32)

    # Store only the hash in the database
    token_hash = hashlib.sha256(
        raw_token.encode("utf-8")
    ).hexdigest()

    expires_at = datetime.utcnow() + timedelta(minutes=30)

    reset_token = PasswordResetToken(
        user_id=user.id,
        token_hash=token_hash,
        expires_at=expires_at,
        used=False,
    )

    db.add(reset_token)
    db.commit()

    frontend_url = os.getenv(
        "FRONTEND_URL",
        "https://tcidentallab.com/new-tciconnect"
    ).rstrip("/")

    reset_url = (
        f"{frontend_url}/reset-password"
        f"?token={raw_token}"
    )

    background_tasks.add_task(
        send_password_reset_email,
        user.full_name,
        user.email,
        reset_url,
    )

    return {
        "success": True,
        "message": "If an account exists with this email, a password reset link has been sent."
    }



@router.post("/reset-password")
def reset_password(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db),
):
    token_hash = hashlib.sha256(
        request.token.encode("utf-8")
    ).hexdigest()

    reset_token = (
        db.query(PasswordResetToken)
        .filter(
            PasswordResetToken.token_hash == token_hash,
            PasswordResetToken.used == False,
        )
        .first()
    )

    if not reset_token:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired password reset link"
        )

    if reset_token.expires_at < datetime.utcnow():
        reset_token.used = True
        db.commit()

        raise HTTPException(
            status_code=400,
            detail="Invalid or expired password reset link"
        )

    user = (
        db.query(User)
        .filter(User.id == reset_token.user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Invalid password reset link"
        )

    user.password = hash_password(
        request.password
    )

    reset_token.used = True

    db.commit()

    return {
        "success": True,
        "message": "Password updated successfully"
    }



# =========================================================
# UPLOAD PROFILE IMAGE
# =========================================================

@router.post("/upload-profile-image")
def upload_profile_image(
    file: UploadFile = File(...),
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    payload = decode_access_token(token)

    if not payload:
        return {
            "success": False,
            "message": "Invalid token"
        }

    user_id = payload.get("user_id")

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        return {
            "success": False,
            "message": "User not found"
        }

    upload_dir = os.path.join(
        "uploads",
        "profile"
    )

    os.makedirs(
        upload_dir,
        exist_ok=True
    )

    filename = f"user_{user.id}_{file.filename}"

    file_path = os.path.join(
        upload_dir,
        filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    user.profile_image = filename

    db.commit()
    db.refresh(user)

    return {
        "success": True,
        "message": "Profile image uploaded successfully",
        "profile_image": user.profile_image
    }


# =========================================================
# CHANGE PASSWORD
# =========================================================

@router.post("/change-password")
def change_password(
    request: ChangePasswordRequest,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    payload = decode_access_token(token)

    if not payload:
        return {
            "success": False,
            "message": "Invalid token"
        }

    user_id = payload.get("user_id")

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        return {
            "success": False,
            "message": "User not found"
        }

    if not verify_password(
        request.current_password,
        user.password
    ):
        return {
            "success": False,
            "message": "Current password is incorrect"
        }

    user.password = hash_password(
        request.new_password
    )

    db.commit()

    return {
        "success": True,
        "message": "Password updated successfully"
    }


# =========================================================
# GET PROFILE
# =========================================================

@router.get("/profile")
def get_profile(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    payload = decode_access_token(token)

    if not payload:
        return {
            "success": False,
            "message": "Invalid token"
        }

    user_id = payload.get("user_id")

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        return {
            "success": False,
            "message": "User not found"
        }

    return {
        "success": True,

        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "phone": user.phone,
            "business_name": user.business_name,
            "business_type": user.business_type,
            "license_number": user.license_number,
            "vat_id": user.vat_id,
            "country": user.country,
            "address": user.address,
            "role": user.role,
            "profile_image": user.profile_image,
        }
    }


# =========================================================
# UPDATE PROFILE
# =========================================================

@router.put("/update-profile")
def update_profile(
    request: UpdateProfileRequest,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    payload = decode_access_token(token)

    if not payload:
        return {
            "success": False,
            "message": "Invalid token"
        }

    user_id = payload.get("user_id")

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        return {
            "success": False,
            "message": "User not found"
        }

    user.full_name = request.full_name
    user.phone = request.phone
    user.business_name = request.business_name
    user.business_type = request.business_type
    user.license_number = request.license_number
    user.vat_id = request.vat_id
    user.country = request.country
    user.address = request.address

    db.commit()
    db.refresh(user)

    return {
        "success": True,
        "message": "Profile updated successfully",

        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "phone": user.phone,
            "business_name": user.business_name,
            "business_type": user.business_type,
            "license_number": user.license_number,
            "vat_id": user.vat_id,
            "country": user.country,
            "address": user.address,
            "role": user.role
        }
    }


# =========================================================
# LOGOUT
# =========================================================
class LogoutRequest(BaseModel):
    refresh_token: str | None = None



@router.post("/logout")
def logout(
    request: LogoutRequest,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):

    # -----------------------------------------
    # 1. Get access token
    # -----------------------------------------

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization header is required"
        )

    access_token = authorization.replace(
        "Bearer ",
        ""
    )

    if not access_token:
        raise HTTPException(
            status_code=401,
            detail="Invalid authorization token"
        )

    # -----------------------------------------
    # 2. Blacklist access token
    # -----------------------------------------

    existing_access = (
        db.query(Blacklist)
        .filter(Blacklist.token == access_token)
        .first()
    )

    if not existing_access:
        db.add(
            Blacklist(
                token=access_token
            )
        )

    # -----------------------------------------
    # 3. Blacklist refresh token
    # -----------------------------------------

    if request.refresh_token:

        existing_refresh = (
            db.query(Blacklist)
            .filter(
                Blacklist.token == request.refresh_token
            )
            .first()
        )

        if not existing_refresh:
            db.add(
                Blacklist(
                    token=request.refresh_token
                )
            )

    # -----------------------------------------
    # 4. Save
    # -----------------------------------------

    db.commit()

    return {
        "message": "Logged out successfully"
    }

  

class RefreshTokenRequest(BaseModel):
    refresh_token: str


@router.post("/refresh-token")
def refresh_token(
    request: RefreshTokenRequest,
    db: Session = Depends(get_db)
):

    payload = decode_refresh_token(
        request.refresh_token
    )
    # -----------------------------------------
    # Check whether refresh token is blacklisted
    # -----------------------------------------

    blacklisted_token = (
        db.query(Blacklist)
        .filter(
            Blacklist.token == request.refresh_token
        )
        .first()
    )

    if blacklisted_token:
        raise HTTPException(
            status_code=401,
            detail="Refresh token has been logged out"
        )
    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired refresh token"
        )

    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Invalid refresh token"
        )

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    # -----------------------------------------
    # Doctor approval check
    # -----------------------------------------

    if (
        user.role == "doctor"
        and user.status != "approved"
    ):
        raise HTTPException(
            status_code=403,
            detail="Your account is not approved"
        )

    # -----------------------------------------
    # Create new access token
    # -----------------------------------------

    new_access_token = create_access_token(
        data={
            "user_id": user.id,
            "email": user.email,
            "role": user.role
        }
    )

    return {
        "access_token": new_access_token,
        "token_type": "bearer"
    }