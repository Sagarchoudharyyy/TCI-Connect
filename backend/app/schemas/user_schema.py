from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    business_name: str
    business_type: str
    license_number: str
    vat_id: str
    country: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str
    
    
class ChangePasswordRequest(BaseModel):
    current_password:str
    new_password:str
    

class DoctorResponse(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str | None = None
    business_name: str | None = None
    business_type: str | None = None
    license_number: str | None = None
    vat_id: str | None = None
    country: str | None = None
    address: str | None = None
    status: str | None = None
    created_at: datetime | None = None
    Last_updated: datetime | None = None

    class Config:
        from_attributes = True