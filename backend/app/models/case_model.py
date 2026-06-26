from sqlalchemy import (
        Column,
        Integer,
        String,
        Date,
        DateTime,
        ForeignKey,
        Text
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
        doctor_id = Column(
            Integer,
            ForeignKey("users.id", ondelete="CASCADE"),
            nullable=False,
            index=True
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
        Text,
        nullable=True
        )

        appointment_date = Column(
            DateTime,
            nullable=True,
             index=True
        )


        appointment_time = Column(
            String(20),
            nullable=True
        )


        delivery_deadline = Column(
            Date,
            nullable=True,
            index=True
        )

        preview_status = Column(
            String(30),
            default="-",
            index=True
        )

        status = Column(
            String(30),
            default="Not Submitted",
             index=True
        )

        created_at = Column(
            DateTime,
            server_default=func.now(),
             index=True 
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
        details = relationship(
            "CaseDetail",
            back_populates="case",
            uselist=False,
            cascade="all, delete-orphan"
        )