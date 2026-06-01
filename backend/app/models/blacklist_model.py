from sqlalchemy import Column, Integer, String
from app.database.database import Base

class Blacklist(Base):
    __tablename__="blacklist"
    
    id=Column(Integer,primary_key=True,index=True)
    token=Column(String,unique=True,nullable=False)