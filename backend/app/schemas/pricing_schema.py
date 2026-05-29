from pydantic import BaseModel


class PricingCreate(BaseModel):
    product: str
    category: str
    material: str

    belgium_dentist_price: float
    belgium_lab_price: float

    lebanon_dentist_price: float
    lebanon_lab_price: float


class PricingResponse(PricingCreate):
    id: int

    class Config:
        from_attributes = True