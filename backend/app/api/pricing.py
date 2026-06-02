from fastapi import APIRouter ,Depends
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.models.pricing_model import Pricing
from app.schemas.pricing_schema import PricingCreate

router =APIRouter(tags=["Pricing"])

def get_db():
  db=SessionLocal()
  try:
    yield db
  finally:
    db.close()

@router.post("/pricing") 
def create_price(
  price:PricingCreate,
  db:Session=Depends(get_db)
  
):
  new_price=Pricing(
    product=price.product,
    category=price.category,
    material=price.material,
    belgium_dentist_price=price.belgium_dentist_price,
    belgium_lab_price=price.belgium_lab_price,
    lebanon_dentist_price=price.lebanon_dentist_price,
    lebanon_lab_price=price.lebanon_lab_price
  )
  db.add(new_price)
  db.commit()
  db.refresh(new_price)
  return {
    "message": "Price created successfully",
    "data": new_price
}
  
@router.get("/pricing")
def get_all_prices(
  db:Session=Depends(get_db)
  
):
      return db.query(Pricing).all()
@router.get("/pricing/{price_id}")
def get_price(
  price_id:int,
  db:Session=Depends(get_db)
):
   return db.query(Pricing).filter(
     Pricing.id==price_id
   ).first()

@router.put("/pricing/{price_id}")
def update_price(
  price_id:int,
  price:PricingCreate,
  db: Session=Depends(get_db)
):
  db_price=db.query(Pricing).filter(Pricing.id==price_id).first()
  
  if not db_price:
    return{"message" : "price not found"}
  db_price.product = price.product
  db_price.category = price.category
  db_price.material = price.material

  db_price.belgium_dentist_price = price.belgium_dentist_price
  db_price.belgium_lab_price = price.belgium_lab_price

  db_price.lebanon_dentist_price = price.lebanon_dentist_price
  db_price.lebanon_lab_price = price.lebanon_lab_price

  db.commit()
  db.refresh(db_price)
  return {
        "message": "Price updated successfully",
        "data": db_price
  }


@router.delete("/pricing/{price_id}")
def delete_price(
  price_id:int,
  db:Session=Depends(get_db)
  
):
 db_price=db.query(Pricing).filter(
   Pricing.id==price_id
 ).first()
 
 if not db_price:
   return{"message":"Price not found"}
 db.delete(db_price)
 db.commit()
 
 return{
   "message":"Price deleted successfully"
 }  