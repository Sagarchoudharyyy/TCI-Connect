from pydantic import BaseModel
from datetime import datetime

class ChatCreate(BaseModel):
    sender_id: int
    receiver_id: int
    message: str
    
class ChatResponse(BaseModel):
    id: int
    sender_id: int
    receiver_id: int
    message: str
    is_read: bool
    timestamp: datetime
    
    class Config:
        from_attributes = True