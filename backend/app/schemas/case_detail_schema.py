from pydantic import BaseModel
from typing import Optional, List


class CaseDetailCreate(BaseModel):
    case_stage:Optional[str]=None
    surface_texture: Optional[str] = None
    glazed_polish: Optional[str] = None
    incisal_translucency: Optional[str] = None
    prepared_tooth_shade: Optional[str] = None
    shade_guide_color: Optional[str] = None
    material_type: List[str] = []
    crown_bridge: List[str] = []
    additional_restorations: List[str] = []
    implant_type: Optional[str] = None
    platform_diameter: Optional[str] = None
    screw_retained: Optional[str] = None
    screw_retained_hybrid: Optional[str] = None
    cement_retained_ti_abutment: Optional[str] = None
    zr_abutment: Optional[str] = None
    implant_bar_type: Optional[str] = None
    attachment_type: Optional[str] = None
    design_preview: Optional[bool] = False
    additional_instructions: Optional[str] = None