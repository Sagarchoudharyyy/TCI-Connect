from passlib.context import CryptContext
from jose import jwt, JWTError
from dotenv import load_dotenv
import os
import uuid

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

    to_encode.update({
        "type": "access"
    })

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt

def create_refresh_token(data: dict):

    to_encode = data.copy()

    to_encode.update({
        "type": "refresh",
        "jti": str(uuid.uuid4())
    })

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt

def decode_access_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        if payload.get("type") != "access":
            return None

        return payload

    except JWTError as e:

        print("JWT ERROR:", str(e))

        return None


def decode_refresh_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        if payload.get("type") != "refresh":
            return None

        return payload

    except JWTError as e:

        print("REFRESH JWT ERROR:", str(e))

        return None