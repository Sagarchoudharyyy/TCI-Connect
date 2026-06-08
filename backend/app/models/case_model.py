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

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    case_id = Column(
        String(50),
        unique=True,
        nullable=False
    )

    # Doctor who submitted the case
    doctor_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    # Patient Information
    patient_name = Column(
        String(255),
        nullable=False
    )

    patient_phone = Column(
        String(20),
        nullable=True
    )

    gender = Column(
        String(20),
        nullable=True
    )

    age = Column(
        Integer,
        nullable=True
    )

    case_type = Column(
        String(100),
        nullable=True
    )

    appointment_date = Column(
        DateTime,
        nullable=True
    )

    delivery_deadline = Column(
        Date,
        nullable=True
    )

    preview_status = Column(
        String(30),
        default="-"
    )

    status = Column(
        String(30),
        default="Submitted"
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )

    # Doctor Relationship
    doctor = relationship(
        "User",
        foreign_keys=[doctor_id],
        back_populates="doctor_cases"
    )

    # Case Files Relationship
    files = relationship(
        "CaseFile",
        back_populates="case",
        cascade="all, delete-orphan"
    )