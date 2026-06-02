from pydantic import BaseModel

class MaterialCreate(BaseModel):
    material_name: str