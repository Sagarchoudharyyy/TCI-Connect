from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    ForeignKey
)

from sqlalchemy.orm import relationship
from app.database.database import Base


class CaseDetail(Base):
    __tablename__ = "case_details"

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
        unique=True,
        nullable=False
    )

    case_stage=Column(
        String(100),
        nullable=True
    )

    surface_texture = Column(
        String(100),
        nullable=True
    )

    glazed_polish = Column(
        String(100),
        nullable=True
    )

    incisal_translucency = Column(
        String(100),
        nullable=True
    )

    prepared_tooth_shade = Column(
        String(100),
        nullable=True
    )

    shade_guide_color = Column(
        String(255),
        nullable=True
    )

    
    material_type = Column(
        Text,
        nullable=True
    )


    crown_bridge = Column(
        Text,
        nullable=True
    )
   
    additional_restorations = Column(
        Text,
        nullable=True
    )

    design_preview = Column(
        Boolean,
        default=False
    )


    additional_instructions = Column(
        Text,
        nullable=True
    )

    case = relationship(
        "Case",
        back_populates="details"
    )

    implant_details = relationship(
    "ImplantDetail",
    back_populates="case_detail",
    cascade="all, delete-orphan"
)