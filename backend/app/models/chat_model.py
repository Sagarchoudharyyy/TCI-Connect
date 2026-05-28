from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from app.database.database import Base

class ChatMessage(Base):
  __tablename__="chat_message"
  
  id=Column(Integer,primary_key=True,index=True)
  sender_id=Column(Integer)
  receiver_id=Column(Integer)
  message=Column(String)
  is_read=Column(Boolean,default=False)
  timestamp=Column(DateTime(timezone=True),server_default=func.now())