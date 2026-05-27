from sqlalchemy import Column, Integer, String
from app.database.database import Base
from sqlalchemy.orm import relationship


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

    password = Column(String, nullable=False)

    role = Column(String, default="client")

    patient_cases = relationship(
        "Case",
        foreign_keys="Case.patient_id",
        back_populates="patient"
    )

    # Relationship for doctor cases
    doctor_cases = relationship(
        "Case",
        foreign_keys="Case.doctor_id",
        back_populates="doctor"
    )