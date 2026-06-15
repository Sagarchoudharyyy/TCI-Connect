from typing import Optional
from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    business_name: str
    license_number: str
    vat_id: str
    country: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    business_name: Optional[str] = None
    license_number: Optional[str] = None
    vat_id: Optional[str] = None
    country: Optional[str] = None
    address: Optional[str] = None