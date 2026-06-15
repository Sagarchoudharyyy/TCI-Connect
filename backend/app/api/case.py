from fastapi import (
        APIRouter,
        Depends,
        HTTPException,
        UploadFile,
        File
)
from sqlalchemy.orm import Session
from uuid import uuid4
import os
import shutil

from app.database.database import get_db
from app.models.case_model import Case
from app.models.case_file_model import CaseFile
from app.models.user_model import User
from app.models.notification_model import Notification
from pydantic import BaseModel
from fastapi.responses import FileResponse
from app.models.case_detail_model import CaseDetail

from app.schemas.case_schema import (
        CaseCreate,
        CaseResponse,
        CaseUpdate
    )
router = APIRouter()

class StatusUpdate(BaseModel):
        status: str

@router.post(
        "/cases",
        response_model=CaseResponse
    )
def create_case(
        case: CaseCreate,
        db: Session = Depends(get_db)
    ):

        new_case = Case(
            doctor_id=case.doctor_id,
            patient_name=case.patient_name,
            patient_phone=case.patient_phone,
            gender=case.gender,
            age=case.age,
            case_type=case.case_type,
            appointment_date=case.appointment_date,
            appointment_time=case.appointment_time,
            delivery_deadline=case.delivery_deadline,
            preview_status=case.preview_status,
            status=case.status
        )

        db.add(new_case)
        db.commit()
        db.refresh(new_case)

        case_detail = CaseDetail(
            case_id=new_case.id,

            case_stage=
            case.details.case_stage,

            surface_texture=
            case.details.surface_texture,

            glazed_polish=
            case.details.glazed_polish,

            incisal_translucency=
            case.details.incisal_translucency,

            prepared_tooth_shade=
            case.details.prepared_tooth_shade,

            shade_guide_color=
            case.details.shade_guide_color,

            material_type=",".join(
            case.details.material_type
            ),

            crown_bridge=",".join(
            case.details.crown_bridge
            ),

            implant_type=
            case.details.implant_type,

            platform_diameter=
            case.details.platform_diameter,

            screw_retained=
                case.details.screw_retained,

            screw_retained_hybrid=
                case.details.screw_retained_hybrid,

            cement_retained_ti_abutment=
                case.details
                .cement_retained_ti_abutment,

            zr_abutment=
                case.details.zr_abutment,

            implant_bar_type=
                case.details.implant_bar_type,

            attachment_type=
                case.details.attachment_type,

            additional_restorations=
                ",".join(
                    case.details
                    .additional_restorations
                ),

            design_preview=
                case.details.design_preview,

            additional_instructions=
            case.details
            .additional_instructions
        )

        db.add(case_detail)
        db.commit()

        doctor = db.query(User).filter(
            User.id == new_case.doctor_id
        ).first()

        notification = Notification(
            message=f"New case submitted by Dr. {doctor.full_name} (Case ID: {new_case.id})"
        )

        db.add(notification)
        db.commit()
        return {
            "id": new_case.id,
            "doctor_id": new_case.doctor_id,
            "doctor_name": doctor.full_name,
            "patient_name": new_case.patient_name,
            "patient_phone": new_case.patient_phone,
            "gender": new_case.gender,
            "age": new_case.age,
            "case_type": new_case.case_type,
            "appointment_date": new_case.appointment_date,
            "appointment_time":new_case.appointment_time,
            "delivery_deadline": new_case.delivery_deadline,
            "preview_status": new_case.preview_status,
            "status": new_case.status,
            "created_at": new_case.created_at,
            "files": []
        }

@router.get(
        "/cases",
        response_model=list[CaseResponse]
    )
def get_cases(
        db: Session = Depends(get_db)
    ):

        cases = db.query(Case).all()

        result = []

        for case in cases:

            result.append({
                "id": case.id,
                "doctor_id": case.doctor_id,
                "doctor_name": case.doctor.full_name,
                "doctor_phone":case.doctor.phone,
                "patient_name": case.patient_name,
                "patient_phone": case.patient_phone,
                "gender": case.gender,
                "age": case.age,
                "case_type": case.case_type,
                "appointment_date": case.appointment_date,
                "appointment_time":case.appointment_time,
                "delivery_deadline": case.delivery_deadline,
                "preview_status": case.preview_status,
                "status": case.status,
                "created_at": case.created_at,
                "files": [
                    {
                        "id": file.id,
                        "file_name": file.file_name,
                        "file_path": file.file_path
                    }
                    for file in case.files
                ]
            })

        return result

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

        return {
            "id": case.id,
            "doctor_id": case.doctor_id,
            "doctor_name": case.doctor.full_name,
            "patient_name": case.patient_name,
            "patient_phone": case.patient_phone,
            "gender": case.gender,
            "age": case.age,
            "case_type": case.case_type,
            "appointment_date": case.appointment_date,
            "appointment_time":case.appointment_time,
            "delivery_deadline": case.delivery_deadline,
            "preview_status": case.preview_status,
            "status": case.status,
            "created_at": case.created_at,
            "files": [
                {
                    "id": file.id,
                    "file_name": file.file_name,
                    "file_path": file.file_path
                }

            
                for file in case.files
            ],
            "details": {
            "case_stage":
             case.details.case_stage
                if case.details else None,

            "material_type":
                case.details.material_type
                if case.details else None,

            "shade_guide_color":
                case.details.shade_guide_color
                if case.details else None,

            "surface_texture":
                case.details.surface_texture
                if case.details else None,

            "crown_bridge":
                case.details.crown_bridge
                if case.details else None,

            "glazed_polish":
                case.details.glazed_polish
                if case.details else None,

            "incisal_translucency":
                case.details.incisal_translucency
                if case.details else None,

            "additional_restorations":
                case.details.additional_restorations
                if case.details else None,

            "additional_instructions":
                case.details.additional_instructions
                if case.details else None,
            }
        }


@router.put(
        "/cases/{case_id}",
        response_model=CaseResponse
    )
def update_case(
        case_id: int,
        updated_case: CaseUpdate,
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
        case.patient_name = updated_case.patient_name
        case.patient_phone = updated_case.patient_phone
        case.gender = updated_case.gender
        case.age = updated_case.age
        case.case_type = updated_case.case_type
        case.appointment_date = updated_case.appointment_date
        case.appointment_time=updated_case.appointment_time
        case.delivery_deadline = updated_case.delivery_deadline
        case.preview_status = updated_case.preview_status
        case.status = updated_case.status

        if updated_case.details:

            case_detail = (
            db.query(CaseDetail)
            .filter(
                CaseDetail.case_id == case.id
            )
            .first()
        )

        if case_detail:

            case_detail.case_stage = (
                updated_case.details.case_stage
            )

            case_detail.surface_texture = (
                updated_case.details.surface_texture
            )

            case_detail.glazed_polish = (
                updated_case.details.glazed_polish
            )

            case_detail.incisal_translucency = (
                updated_case.details
                .incisal_translucency
            )

            case_detail.prepared_tooth_shade = (
                updated_case.details
                .prepared_tooth_shade
            )

            case_detail.shade_guide_color = (
                updated_case.details
                .shade_guide_color
            )

            case_detail.material_type = ",".join(
                updated_case.details.material_type
            )

            case_detail.crown_bridge = ",".join(
                updated_case.details.crown_bridge
            )

            case_detail.implant_type = (
                updated_case.details
                .implant_type
            )

            case_detail.platform_diameter = (
                updated_case.details
                .platform_diameter
            )

            case_detail.screw_retained = (
                updated_case.details
                .screw_retained
            )

            case_detail.screw_retained_hybrid = (
                updated_case.details
                .screw_retained_hybrid
            )

            case_detail.cement_retained_ti_abutment = (
                updated_case.details
                .cement_retained_ti_abutment
            )

            case_detail.zr_abutment = (
                updated_case.details
                .zr_abutment
            )

            case_detail.implant_bar_type = (
                updated_case.details
                .implant_bar_type
            )

            case_detail.attachment_type = (
                updated_case.details
                .attachment_type
            )

            case_detail.additional_restorations = ",".join(
                updated_case.details
                .additional_restorations
            )

            case_detail.design_preview = (
                updated_case.details
                .design_preview
            )

            case_detail.additional_instructions = (
                updated_case.details
                .additional_instructions
            )

        db.commit()
        db.refresh(case)

        return {
            "id": case.id,
            "doctor_id": case.doctor_id,
            "doctor_name": case.doctor.full_name,
            "patient_name": case.patient_name,
            "patient_phone": case.patient_phone,
            "gender": case.gender,
            "age": case.age,
            "case_type": case.case_type,
            "appointment_date": case.appointment_date,
            "appointment_time":case.appointment_time,
            "delivery_deadline": case.delivery_deadline,
            "preview_status": case.preview_status,
            "status": case.status,
            "created_at": case.created_at,
            "files": [
                {
                    "id": file.id,
                    "file_name": file.file_name,
                    "file_path": file.file_path
                }
                for file in case.files
            ]
        }

@router.put("/cases/{case_id}/status")
def update_case_status(
        case_id: int,
        status_data: StatusUpdate,
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

        case.status = status_data.status

        db.commit()
        db.refresh(case)

        return {
            "message": "Status updated successfully",
            "status": case.status
        }


@router.get("/cases/{case_id}/history")
def get_case_history(
        case_id: int,
        db: Session = Depends(get_db)
    ):
        current_case = (
            db.query(Case)
            .filter(Case.id == case_id)
            .first()
        )

        if not current_case:
            raise HTTPException(
                status_code=404,
                detail="Case not found"
            )

        previous_cases = (
            db.query(Case)
            .filter(
                Case.patient_phone ==
                current_case.patient_phone,
                Case.id != case_id
            )
            .order_by(
                Case.created_at.desc()
            )
            .all()
        )

        return [
            {
                "id": case.id,
                "status": case.status,
                "delivery_deadline":
                    case.delivery_deadline,
                "created_at":
                    case.created_at
            }
            for case in previous_cases
        ]
    
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

@router.post("/cases/{case_id}/upload")
async def upload_case_file(
        case_id: int,
        file: UploadFile = File(...),
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

        upload_folder = "uploads"

        os.makedirs(
            upload_folder,
            exist_ok=True
        )

        unique_filename = (
            f"{uuid4()}_{file.filename}"
        )

        file_path = os.path.join(
            upload_folder,
            unique_filename
        )

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer
            )

        new_file = CaseFile(
            case_id=case.id,   # foreign key uses DB id
            file_type=file.content_type,
            file_name=file.filename,
            file_path=file_path
        )

        db.add(new_file)
        db.commit()
        db.refresh(new_file)
        print("CASE FOUND:", case.id)
        print("FILE:", file.filename)
        print("SAVED CASE ID:", new_file.case_id)

        return {
            "message": "File uploaded successfully",
            "file_name": file.filename
        }


@router.get("/case_files")
def get_case_files(
    db: Session = Depends(get_db)
):
    return db.query(CaseFile).all()

@router.get(
        "/download-file")
def download_file(
        file_path: str
    ):

        if not os.path.exists(
            file_path
        ):
            raise HTTPException(
                status_code=404,
                detail="File not found"
            )

        return FileResponse(
            path=file_path,
            filename=os.path.basename(
                file_path
            ),
            media_type=
            "application/octet-stream"
        )

@router.get("/case_files")
def get_case_files(
        db: Session = Depends(get_db)
    ):
        return db.query(CaseFile).all()


@router.delete(
        "/case-files/{file_id}"
    )
def delete_case_file(
        file_id: int,
        db: Session = Depends(get_db)
    ):

        file = (
            db.query(CaseFile)
            .filter(
                CaseFile.id == file_id
            )
            .first()
        )

        if not file:
            raise HTTPException(
                status_code=404,
                detail="File not found"
            )

        # delete physical file
        if os.path.exists(
            file.file_path
        ):
            os.remove(
                file.file_path
            )

        # delete DB record
        db.delete(file)
        db.commit()

        return {
            "message":
            "File deleted successfully"
        }
