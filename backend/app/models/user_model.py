from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy import DateTime
from sqlalchemy.sql import func

from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String, nullable=False)

    username = Column(String, unique=True, nullable=False)

    email = Column(String, unique=True, nullable=False)

    phone = Column(String, nullable=True)

    business_name = Column(String, nullable=True)

    license_number = Column(String, nullable=True)

    vat_id = Column(String, nullable=True)

    country = Column(String, nullable=True)
    
    address = Column(String, nullable=True)

    password = Column(String, nullable=False)

    business_type = Column(String)
    
    created_at = Column(DateTime,server_default=func.now())

    last_updated = Column(DateTime,server_default=func.now())

    role = Column(String, nullable=False)

    status = Column(String, default="pending")

    # Cases submitted by doctor
    doctor_cases = relationship(
        "Case",
        foreign_keys="Case.doctor_id",
        back_populates="doctor",
        cascade="all, delete-orphan"
    )