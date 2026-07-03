from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    Index
)
from sqlalchemy.sql import func
from app.database.database import Base


class Notification(Base):
    __tablename__ = "notifications"

    __table_args__ = (
        Index(
            "idx_receiver_read",
            "receiver_id",
            "is_read"
        ),
    )

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    message = Column(
        String,
        nullable=False
    )

    is_read = Column(
        Boolean,
        default=False,
        index=True
    )

    case_id = Column(
        Integer,
        index=True
    )

    notification_type = Column(
        String,
        nullable=True,
        index=True
    )

    sender_id = Column(
        Integer,
        nullable=True,
        index=True
    )

    receiver_id = Column(
        Integer,
        nullable=True,
        index=True
    )

    created_at = Column(
        DateTime,
        server_default=func.now(),
        index=True
    )