from fastapi import APIRouter, Depends, Header
from sqlalchemy.orm import Session
from sqlalchemy import or_
from fastapi.security import OAuth2PasswordBearer

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
    decode_access_token
)

from app.schemas.user_schema import (
    UserRegister,
    UserLogin,
    ChangePasswordRequest
)

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)


@router.post("/register")
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        return {
            "message": "Email already exists"
        }

    hashed_password = hash_password(
        user.password
    )

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
        status="pending"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
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

    return {
    "message": "Registration successful. Waiting for admin approval"
}

@router.post("/admin-register")
def admin_register(
    user: UserRegister,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()


    if existing_user:
        return {
            "message": "Email already exists"
        }

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


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
  

    db_user = db.query(User).filter(
        or_(
            User.email == user.username,
            User.phone == user.username
        )
    ).first()



    if not db_user:
        return {
            "message": "Invalid username or password"
        }

   

    if not verify_password(
        user.password,
        db_user.password
    ):
        return {
            "message": "Invalid username or password"
        }

    
    
    if (
    db_user.role == "doctor"
    and db_user.status != "approved"
    ):
     return {
        "message":
        "Your account is under admin review. Please wait for approval."
    }

    access_token = create_access_token(
        data={
            "user_id": db_user.id,
            "email": db_user.email,
            "role": db_user.role
        }
    )

    return {
    "access_token": access_token,
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
        "role": db_user.role
    }
}
    
@router.post("/forgot-password")
def forgot_password(
    request: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == request.email
    ).first()

    if not user:
        return {
            "success": False,
            "message": "Email not found"
        }

    return {
        "success": True,
        "message": "Email exists"
    }
@router.post("/reset-password")
def reset_password(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == request.email
    ).first()

    if not user:
        return {
            "success": False,
            "message": "Email not found"
        }

   

    user.password = hash_password(request.password)

    db.commit()

    return {
        "success": True,
        "message": "Password updated successfully"
    }
    

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

    user = db.query(User).filter(
        User.id == user_id
    ).first()

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
    
@router.post("/logout")
def logout(
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):

    token = authorization.replace(
        "Bearer ",
        ""
    )

    blacklist_token = Blacklist(
        token=token
    )

    db.add(blacklist_token)
    db.commit()

    return {
        "message": "Logged out successfully"
    }