from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional


class CaseCreate(BaseModel):
    case_id:str
    patient_id:int
    doctor_id:int
    appointment_date:Optional[datetime]=None
    age: Optional[int] = None
    delivery_deadline: Optional[date] = None
    preview_status: Optional[str] = "Pending"
    status: Optional[str] = "Submitted"
    
class CaseResponse(BaseModel):
    id: int
    case_id: str
    patient_id: int
    doctor_id: int
    doctor_name: str | None = None
    patient_name: str | None = None
    phone: str | None = None

    appointment_date: Optional[datetime]
    age: Optional[int]
    delivery_deadline: Optional[date]

    preview_status: str
    status: str
    created_at: Optional[datetime] = None
    files: list = []

    class Config:
        from_attributes = True
