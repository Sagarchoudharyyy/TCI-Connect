from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.models.category_model import Category
from app.schemas.category_schema import CategoryCreate

router = APIRouter(tags=["Category"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/category")
def create_category(
    category: CategoryCreate,
    db: Session = Depends(get_db)
):
    new_category = Category(
        category_name=category.category_name
    )

    db.add(new_category)
    db.commit()
    db.refresh(new_category)

    return {
        "message": "Category created successfully",
        "data": new_category
    }


@router.get("/category")
def get_category(
    db: Session = Depends(get_db)
):
    return db.query(Category).all()


@router.put("/category/{id}")
def update_category(
    id:int,
    category:CategoryCreate,
    db:Session=Depends(get_db)
):
    db_category=db.query(Category).filter(Category.id==id).first()

    if not db_category:
        return {
            "message":"Category not fount"
        }
    db_category.category_name=category.category_name
    db.commit()
    db.refresh(db_category)

    return {
        "message": "Category updated successfully",
        "data": db_category
    }

@router.delete("/category/{id}")
def delete_category(
    id: int,
    db: Session = Depends(get_db)
):

    doctor = db.query(Category).filter(
        Category.id == Category.id,
    ).first()

    if not doctor:
        return {"message": "Category not found"}

    db.delete(doctor)
    db.commit()

    return {
        "message": "Category deleted successfully"
    }



