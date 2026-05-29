from sqlalchemy import Column, Integer, String, Float
from app.database.database import Base

class Pricing(Base):
    __tablename__ = "pricing"

    id = Column(Integer, primary_key=True, index=True)

    product = Column(String, nullable=False)

    category = Column(String, nullable=False)

    material = Column(String, nullable=False)

    belgium_dentist_price = Column(Float, nullable=False)

    belgium_lab_price = Column(Float, nullable=False)

    lebanon_dentist_price = Column(Float, nullable=False)

    lebanon_lab_price = Column(Float, nullable=False)