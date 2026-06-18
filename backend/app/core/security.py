from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt,JWTError
from dotenv import load_dotenv
import os

load_dotenv()
SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "my_super_secret_key_123"
)

ALGORITHM = os.getenv(
    "ALGORITHM",
    "HS256"
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(
    plain_password,
    hashed_password
):
    return pwd_context.verify(
        plain_password,
        hashed_password
    )


def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=30)

    to_encode.update({
        "exp": expire
    })

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload=jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        return payload
    except JWTError:
        return None