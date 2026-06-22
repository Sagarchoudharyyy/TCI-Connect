from pydantic import BaseModel
from datetime import datetime

class NotificationResponse(BaseModel):
    id: int
    message: str
    is_read: bool
    created_at: datetime
    case_id:int|None

    class Config:
        from_attributes = True