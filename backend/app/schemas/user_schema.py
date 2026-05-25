from pydantic import BaseModel,EmailStr

class UserRegister(BaseModel):
    full_name:str
    email:EmailStr
    username:str
    phone: str
    business_name: str
    license_number: str
    vat_id: str
    country: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str
