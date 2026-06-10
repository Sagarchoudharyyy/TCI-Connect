from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional


class CaseCreate(BaseModel):
    case_id: str
    doctor_id: int
    patient_name: str
    patient_phone: Optional[str] = None
    gender: Optional[str] = None
    age: Optional[int] = None
    case_type: Optional[str] = None
    appointment_date: Optional[datetime] = None
    delivery_deadline: Optional[date] = None
    preview_status: Optional[str] = "Pending"
    status: Optional[str] = "Submitted"


class CaseUpdate(BaseModel):

    patient_name: Optional[str] = None

    patient_phone: Optional[str] = None

    gender: Optional[str] = None

    age: Optional[int] = None

    case_type: Optional[str] = None

    appointment_date: Optional[datetime] = None

    delivery_deadline: Optional[date] = None

    preview_status: Optional[str] = None

    status: Optional[str] = None

class CaseResponse(BaseModel):
    id: int
    case_id: str
    doctor_id: int
    doctor_name: Optional[str] = None
    patient_name: str
    patient_phone: Optional[str] = None
    gender: Optional[str] = None
    age: Optional[int] = None
    case_type: Optional[str] = None
    appointment_date: Optional[datetime] = None
    delivery_deadline: Optional[date] = None
    preview_status: str
    status: str
    created_at: Optional[datetime] = None
    files: list = []
    class Config:
        from_attributes = True