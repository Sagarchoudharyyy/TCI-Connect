from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional
from app.schemas.case_detail_schema import (
    CaseDetailCreate,
    CaseDetailResponse
)


class CaseCreate(BaseModel):
    doctor_id: int

    patient_name: str

    patient_phone: Optional[str] = None

    gender: Optional[str] = None

    age: Optional[int] = None

    case_type: Optional[str] = None

    appointment_date: Optional[datetime] = None

    appointment_time: Optional[str] = None

    delivery_deadline: Optional[date] = None

    preview_status: Optional[str] = "-"

    status: Optional[str] = "Not Submitted"
    
    details: Optional[CaseDetailCreate] = None


class CaseUpdate(BaseModel):

    patient_name: Optional[str] = None

    patient_phone: Optional[str] = None

    gender: Optional[str] = None

    age: Optional[int] = None

    case_type: Optional[str] = None

    appointment_date: Optional[datetime] = None

    appointment_time: Optional[str] = None

    delivery_deadline: Optional[date] = None

    preview_status: Optional[str] = "-"

    status: Optional[str] = "Not Submitted"
    
    details: Optional[CaseDetailCreate] = None

class CaseResponse(BaseModel):
    id: int

    doctor_id: int

    doctor_name: Optional[str] = None

    doctor_phone: str | None=None

    patient_name: str

    patient_phone: Optional[str] = None

    gender: Optional[str] = None

    age: Optional[int] = None

    case_type: Optional[str] = None

    appointment_date: Optional[datetime] = None

    appointment_time: Optional[str] = None

    delivery_deadline: Optional[date] = None

    preview_status: str

    status: str

    created_at: Optional[datetime] = None

    files: list = []

    details: Optional[CaseDetailResponse] = None


    class Config:
        from_attributes = True