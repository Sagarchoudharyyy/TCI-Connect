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
from sqlalchemy import Boolean


class CaseFile(Base):
    __tablename__ = "case_files"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    case_id = Column(
        Integer,
        ForeignKey(
            "cases.id",
            ondelete="CASCADE"
        ),
        nullable=False,
        index=True
    )

    file_type = Column(
        String(100),
        nullable=True
    )

    file_name = Column(
        String(255),
        nullable=False
    )

    file_path = Column(
        String,
        nullable=False
    )

    upload_at = Column(
        DateTime,
        server_default=func.now(),
        index=True
    )

    is_confirmed = Column(
        Boolean,
        default=False,
        nullable=False
    )

    file_category = Column(
        String(50),
        nullable=True,
        index=True
    )

    case = relationship(
        "Case",
        back_populates="files"
    )