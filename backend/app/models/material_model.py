
from sqlalchemy import Column, Integer, String
from app.database.database import Base


class Material(Base):
    __tablename__ = "material"
    id = Column(Integer, primary_key=True, index=True)
    material_name = Column(String, nullable=False)  
