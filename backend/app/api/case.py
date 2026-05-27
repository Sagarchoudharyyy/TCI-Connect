from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db   
from app.models.case_model import Case
from app.schemas.case_schema import (CaseCreate,CaseResponse)

router=APIRouter()

@router.post(
    "/cases",
    response_model=CaseResponse
)
def create_case(
    case: CaseCreate,
    db: Session = Depends(get_db)
):
    new_case = Case(
        case_id=case.case_id,
        patient_id=case.patient_id,
        doctor_id=case.doctor_id,
        appointment_date=case.appointment_date,
        age=case.age,
        delivery_deadline=case.delivery_deadline,
        preview_status=case.preview_status,
        status=case.status
    )

    db.add(new_case)
    db.commit()
    db.refresh(new_case)

    return new_case


@router.get(
    "/cases",
    response_model=list[CaseResponse]
)
def get_cases(
    db: Session = Depends(get_db)
):
    cases = db.query(Case).all()

    return cases


@router.get(
    "/cases/{case_id}",
    response_model=CaseResponse
)
def get_case(
    case_id: int,
    db: Session = Depends(get_db)
):
    case = (
        db.query(Case)
        .filter(Case.id == case_id)
        .first()
    )

    if not case:
        raise HTTPException(
            status_code=404,
            detail="Case not found"
        )

    return case


@router.put("/cases/{case_id}",
            response_model=CaseResponse
)
def update_case(   
    case_id:int,
    updated_case:CaseCreate,
    db:Session=Depends(get_db)
):
     case = (
        db.query(Case)
        .filter(Case.id == case_id)
        .first()
    )
     if not case:
         raise HTTPException(
             status_code=400,
             detail="Case not found"
         )
     case.case_id=updated_case.case_id
     case.patient_id=updated_case.patient_id
     case.doctor_id=updated_case.doctor_id
     case.appointment_date=updated_case.appointment_date
     case.age = updated_case.age
     case.delivery_deadline = updated_case.delivery_deadline
     case.preview_status = updated_case.preview_status
     case.status = updated_case.status
     
     db.commit()
     db.refresh(case)
     return case


@router.delete("/cases/{case_id}")
def delete_case(
    case_id: int,
    db: Session = Depends(get_db)
):
    case = (
        db.query(Case)
        .filter(Case.id == case_id)
        .first()
    )

    if not case:
        raise HTTPException(
            status_code=404,
            detail="Case not found"
        )

    db.delete(case)
    db.commit()

    return {
        "message": "Case deleted successfully"
    }



