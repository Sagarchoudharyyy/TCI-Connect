from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.user_model import User
from app.schemas.user_schema import UserRegister
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter()


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
        username=user.username,
        phone=user.phone,
        business_name=user.business_name,
        license_number=user.license_number,
        vat_id=user.vat_id,
        country=user.country,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message":
        "User registered successfully"
    }

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

from app.schemas.user_schema import (
    UserRegister,
    UserLogin
)


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    db_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if not db_user:
        return {
            "message":
            "Invalid username and password"
        }

    if not verify_password(
        user.password,
        db_user.password
    ):
        return {
            "message":
            "Invalid username and password"
        }

    access_token = create_access_token(
        data={
            "user_id": db_user.id,
            "email": db_user.email,
            "role": db_user.role
        }
    )

    return {
        "access_token":
        access_token,

        "token_type":
        "bearer",

        "user": {
            "id":
            db_user.id,

            "full_name":
            db_user.full_name,

            "email":
            db_user.email,

            "role":
            db_user.role
        }
    }