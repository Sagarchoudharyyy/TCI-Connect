from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.models.material_model import Material
from app.schemas.material_schema import MaterialCreate

router=APIRouter()

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/material")
def get_material(
    db:Session=Depends(get_db)
):
    return db.query(Material).all()


@router.post("/material")
def create_material(
    material:MaterialCreate,
    db:Session=Depends(get_db)
):
    new_material=Material(
        material_name=material.material_name,
    )

    db.add(new_material)
    db.commit()
    db.refresh(new_material)

    return {
        "message": "Material created successfully",
        "data": new_material
    }


@router.put("/material/{id}")
def update_material(
    id:int,
    material:MaterialCreate,
    db:Session=Depends(get_db)
):
    db_material=db.query(Material).filter(Material.id==id).first()

    if not db_material:
        return {
            "message":"Material not found"
        }
    db_material.material_name=material.material_name
    db.commit()
    db.refresh(db_material)

    return {
        "message": "Material updated successfully",
        "data": db_material
    }

@router.delete("/material/{id}")
def delete_material(
    id: int,
    db: Session = Depends(get_db)
):

    doctor = db.query(Material).filter(
        Material.id == Material.id,
    ).first()

    if not doctor:
        return {"message": "Material not found"}

    db.delete(doctor)
    db.commit()

    return {
        "message": "Material deleted successfully"
    }