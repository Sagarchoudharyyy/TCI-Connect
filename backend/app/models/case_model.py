from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    DateTime,
    ForeignKey
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class Case(Base):
    __tablename__ = "cases"

    id = Column(Integer, primary_key=True, index=True)

    case_id = Column(
        String(50),
        unique=True,
        nullable=False
    )

    patient_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    doctor_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    appointment_date = Column(
        DateTime,
        nullable=True
    )

    age = Column(
        Integer,
        nullable=True
    )

    delivery_deadline = Column(
        Date,
        nullable=True
    )

    preview_status = Column(
        String(30),
        default="Pending"
    )

    status = Column(
        String(30),
        default="Submitted"
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )

    # Relationships
    patient = relationship(
        "User",
        foreign_keys=[patient_id],
        back_populates="patient_cases"
    )

    doctor = relationship(
        "User",
        foreign_keys=[doctor_id],
        back_populates="doctor_cases"
    )
        
    files = relationship(
    "CaseFile",
    back_populates="case",
    cascade="all, delete-orphan"
)