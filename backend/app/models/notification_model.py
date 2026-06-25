from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.database.database import Base 

class Notification(Base):
  __tablename__="notifications"

  id=Column(Integer,primary_key=True,index=True)

  message=Column(String,nullable=False)

  is_read=Column(Boolean,default=False)

  case_id=Column(Integer)

  notification_type = Column(String, nullable=True)  

  sender_id = Column(Integer, nullable=True)

  receiver_id = Column(Integer, nullable=True)

  created_at = Column( DateTime, server_default=func.now()
  )