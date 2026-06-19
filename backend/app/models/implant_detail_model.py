from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey
)

from sqlalchemy.orm import relationship
from app.database.database import Base


class ImplantDetail(Base):
    __tablename__ = "implant_details"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    case_detail_id = Column(
        Integer,
        ForeignKey(
            "case_details.id",
            ondelete="CASCADE"
        ),
        nullable=False
    )

    implant_type = Column(Text, nullable=True)
    platform_diameter = Column(Text, nullable=True)
    screw_retained = Column(Text, nullable=True)
    screw_retained_hybrid = Column(Text, nullable=True)
    cement_retained_ti_abutment = Column(Text, nullable=True)
    zr_abutment = Column(Text, nullable=True)
    implant_bar_type = Column(Text, nullable=True)
    attachment_type = Column(Text, nullable=True)

    case_detail = relationship(
        "CaseDetail",
        back_populates="implant_details"
    )