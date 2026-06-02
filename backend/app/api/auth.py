from fastapi import APIRouter, Depends, Header
from sqlalchemy.orm import Session
from sqlalchemy import or_
from fastapi.security import OAuth2PasswordBearer

from app.database.database import get_db
from app.models.user_model import User
from app.models.blacklist_model import Blacklist

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

from app.schemas.user_schema import (
    UserRegister,
    UserLogin
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
        license_number=user.license_number,
        vat_id=user.vat_id,
        country=user.country,
        password=hashed_password,
        role="doctor"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Doctor registered successfully"
    }


@router.post("/admin-register")
def admin_register(
    user: UserRegister,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()
    print("Admin register called")

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
        vat_id=user.vat_id,
        country=user.country,
        password=hashed_password,
        role="admin"
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
    print("Login started")

    db_user = db.query(User).filter(
        or_(
            User.email == user.username,
            User.phone == user.username
        )
    ).first()

    print("User found:", db_user)

    if not db_user:
        return {
            "message": "Invalid username or password"
        }

    print("Checking password")

    if not verify_password(
        user.password,
        db_user.password
    ):
        return {
            "message": "Invalid username or password"
        }

    print("Password verified")

    access_token = create_access_token(
        data={
            "user_id": db_user.id,
            "email": db_user.email,
            "role": db_user.role
        }
    )

    print("Token generated")

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "full_name": db_user.full_name,
            "email": db_user.email,
            "phone": db_user.phone,
            "role": db_user.role
        }
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