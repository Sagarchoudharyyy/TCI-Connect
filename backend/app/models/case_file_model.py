from sqlalchemy import (
    Column,
    Integer,
    DateTime,
    String,
    ForeignKey
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class CaseFile(Base):
    __tablename__="case_files"
    id=Column(Integer,primary_key=True,index=True)

    case_id=Column(Integer,ForeignKey("cases.id",ondelete="CASCADE"),nullable=False)

    file_type=Column(String(100),nullable=True)

    file_name=Column(String(255),nullable=False)

    file_path=Column(String,nullable=False)
    
    upload_at=Column(DateTime,server_default=func.now())
    
    case=relationship("Case",back_populates="files")

