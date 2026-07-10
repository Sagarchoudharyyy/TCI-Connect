from datetime import date
from re import search
from unittest import result
import aiofiles

from fastapi import (
        APIRouter,
        Depends,
        HTTPException,
        UploadFile,
        File
)
from sqlalchemy.orm import Session, selectinload
from uuid import uuid4
import os
import shutil
from fastapi import Form

from app.database.database import get_db
from app.models.case_model import Case
from app.models.case_file_model import CaseFile
from app.models.user_model import User
from app.models.notification_model import Notification
from fastapi.security import OAuth2PasswordBearer
from app.core.security import decode_access_token
from pydantic import BaseModel
from fastapi.responses import FileResponse
from sqlalchemy.orm import joinedload
from app.models.case_detail_model import CaseDetail
from app.models.implant_detail_model import ImplantDetail
from app.schemas.case_schema import DeleteTempFileRequest, SaveTempFileRequest
from fastapi import Query
from sqlalchemy import or_, String

from app.schemas.case_schema import (
        CaseCreate,
        CaseResponse,
        CaseUpdate
    )
router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/token")

class StatusUpdate(BaseModel):
        status: str
class PreviewStatusUpdate(BaseModel):
    preview_status: str


@router.post(
    "/cases",
    response_model=CaseResponse
)
def create_case(
    case: CaseCreate,
    db: Session = Depends(get_db)
):
    try:
        new_case = Case(
            doctor_id=case.doctor_id,
            patient_name=case.patient_name,
            patient_phone=case.patient_phone,
            gender=case.gender,
            age=case.age,
            appointment_date=case.appointment_date,
            appointment_time=case.appointment_time,
            delivery_deadline=case.delivery_deadline,
            preview_status=case.preview_status,
            status=case.status
        )

        db.add(new_case)
        db.flush()

        case_detail = CaseDetail(
            case_id=new_case.id,

            case_stage=", ".join(
                case.details.case_stage or []
            ) if case.details else None,

            surface_texture=", ".join(
                case.details.surface_texture or []
            ) if case.details else None,

            glazed_polish=", ".join(
                case.details.glazed_polish or []
            ) if case.details else None,

            incisal_translucency=", ".join(
                case.details.incisal_translucency or []
            ) if case.details else None,

            prepared_tooth_shade=", ".join(
                case.details.prepared_tooth_shade or []
            ) if case.details else None,

            shade_guide_color=(
                case.details.shade_guide_color
                if case.details else None
            ),

            material_type=",".join(
                case.details.material_type or []
            ) if case.details else None,

            crown_bridge=",".join(
                case.details.crown_bridge or []
            ) if case.details else None,

            additional_restorations=",".join(
                case.details.additional_restorations or []
            ) if case.details else None,

            design_preview=(
                case.details.design_preview
                if case.details else None
            ),

            additional_instructions=(
                case.details.additional_instructions
                if case.details else None
            )
        )

        db.add(case_detail)
        db.flush()

        upload_folder = "uploads"
        os.makedirs(upload_folder, exist_ok=True)

        for file in case.files:
            temp_path = file.file_path

            if not os.path.exists(temp_path):
                continue

            unique_filename = (
                f"{uuid4()}_{file.file_name}"
            )

            new_path = os.path.join(
                upload_folder,
                unique_filename
            )

            shutil.move(
                temp_path,
                new_path
            )

            case_file = CaseFile(
                case_id=new_case.id,
                file_name=file.file_name,
                file_type=file.file_type,
                file_path=new_path,
                file_category=file.file_category
            )

            db.add(case_file)

        if (
            case.details and
            case.details.implant_details
        ):
            for implant in case.details.implant_details:

                implant_record = ImplantDetail(
                    case_detail_id=case_detail.id,
                    implant_type=implant.implant_type,
                    platform_diameter=implant.platform_diameter,
                    screw_retained=implant.screw_retained,
                    screw_retained_hybrid=implant.screw_retained_hybrid,
                    cement_retained_ti_abutment=implant.cement_retained_ti_abutment,
                    zr_abutment=implant.zr_abutment,
                    implant_bar_type=implant.implant_bar_type,
                    attachment_type=implant.attachment_type,
                )

                db.add(implant_record)

        doctor = (
            db.query(User)
            .filter(
                User.id == new_case.doctor_id
            )
            .first()
        )

        if doctor:
            notification = Notification(
                message=(
                    f"New case submitted by "
                    f"Dr.{doctor.full_name} "
                    f"(Case ID: {new_case.id})"
                ),
                case_id=new_case.id,
                is_read=False,
                notification_type="new_case"
            )

            db.add(notification)

        # ONE COMMIT
        db.commit()

        db.refresh(new_case)
        db.refresh(case_detail)

        return {
            "id": new_case.id,
            "doctor_id": new_case.doctor_id,
            "doctor_name":
                doctor.full_name
                if doctor else None,
            "patient_name":
                new_case.patient_name,
            "patient_phone":
                new_case.patient_phone,
            "gender":
                new_case.gender,
            "age":
                new_case.age,
            "appointment_date":
                new_case.appointment_date,
            "appointment_time":
                new_case.appointment_time,
            "delivery_deadline":
                new_case.delivery_deadline,
            "preview_status":
                new_case.preview_status,
            "status":
                new_case.status,
            "created_at":
                new_case.created_at,

            "details": {
                "case_stage":
                    case_detail.case_stage.split(",")
                    if case_detail.case_stage else [],

                "surface_texture":
                    case_detail.surface_texture.split(",")
                    if case_detail.surface_texture else [],

                "glazed_polish":
                    case_detail.glazed_polish.split(",")
                    if case_detail.glazed_polish else [],

                "incisal_translucency":
                    case_detail.incisal_translucency.split(",")
                    if case_detail.incisal_translucency else [],

                "prepared_tooth_shade":
                    case_detail.prepared_tooth_shade.split(",")
                    if case_detail.prepared_tooth_shade else [],

                "shade_guide_color":
                    case_detail.shade_guide_color,

                "material_type":
                    case_detail.material_type.split(",")
                    if case_detail.material_type else [],

                "crown_bridge":
                    case_detail.crown_bridge.split(",")
                    if case_detail.crown_bridge else [],

                "additional_restorations":
                    case_detail.additional_restorations.split(",")
                    if case_detail.additional_restorations else [],

                "additional_instructions":
                    case_detail.additional_instructions,

                "implant_details": [
                    {
                        "implant_type": implant.implant_type,
                        "platform_diameter": implant.platform_diameter,
                        "screw_retained": implant.screw_retained,
                        "screw_retained_hybrid": implant.screw_retained_hybrid,
                        "cement_retained_ti_abutment": implant.cement_retained_ti_abutment,
                        "zr_abutment": implant.zr_abutment,
                        "implant_bar_type": implant.implant_bar_type,
                        "attachment_type": implant.attachment_type,
                    }
                    for implant in case_detail.implant_details
                ]
            },

            "files": [
                {
                    "id": file.id,
                    "file_name": file.file_name,
                    "file_type": file.file_type,
                    "file_path": file.file_path,
                    "file_category": file.file_category
                }
                for file in new_case.files
            ]
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get(
    "/cases"
)
def get_cases(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    search: str | None = None,
    status: str | None = None,
    deadline: date | None = None,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    
    payload = decode_access_token(token)
    print("Payload:", payload)
    print("User ID:", payload.get("user_id"))
    print("Role:", payload.get("role"))
   

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = payload.get("user_id")
    role = payload.get("role")
    query = (
    db.query(Case)
        .options(
            selectinload(Case.files),
            joinedload(Case.doctor)
        )
    )
    if role == "doctor":
        query = query.filter(Case.doctor_id == user_id)
    
    if status:
        query = query.filter(
        Case.status == status
    )

    if deadline:
        query = query.filter(
        Case.delivery_deadline == deadline
    )

    if search:
        query = query.filter(
            or_(
                Case.patient_name.ilike(f"%{search}%"),
                Case.id.cast(String).ilike(f"%{search}%"),
                Case.doctor.has(
                    User.full_name.ilike(f"%{search}%")
                )
            )
        )
    total = query.count()

    cases = (
        query
        .order_by(Case.created_at.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
        )
    result = []

    for case in cases:

        result.append({
            "id": case.id,
            "profile_image":
                case.doctor.profile_image
                if case.doctor else None,
            "doctor_name":
                case.doctor.full_name
                if case.doctor else None,
            "patient_name": case.patient_name,
            "phone_number":
                case.doctor.phone 
                if case.doctor else None,
            "age": case.age,
            "appointment_date": case.appointment_date,
            "delivery_deadline": case.delivery_deadline,
            "preview_status": case.preview_status,
            "status": case.status,
            "files": [
                    {
                        "id": file.id,
                        "file_name": file.file_name,
                        "file_type": file.file_type,
                        "file_path": file.file_path,
                        "file_category": file.file_category,
                    }
                    for file in case.files
                ],
            "has_case_document": any(
                f.file_category == "case_document"
                for f in case.files
            ),

            "has_digital_files": any(
                f.file_category == "digital_file"
                for f in case.files
            ),

            "has_preview_files": any(
                f.file_category == "preview_file"
                for f in case.files
            )
        })

    return {
    "items": result,
    "total": total,
    "page": page,
    "pages": (total + limit - 1) // limit
} 



@router.get(
        "/cases/{case_id}")
def get_case(
    case_id: int,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    
    payload = decode_access_token(token)
    print("Payload:", payload)
    

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user_id = payload.get("user_id")
    role = payload.get("role")
    
    print("User ID:", payload.get("user_id"))
    print("Role:", payload.get("role"))

    case = (
        db.query(Case)
        .options(
            joinedload(Case.doctor),
            selectinload(Case.files),
            joinedload(Case.details)
                .selectinload(CaseDetail.implant_details)
        )
        .filter(Case.id == case_id)
        .first()
    )

    if not case:
            raise HTTPException(
                status_code=404,
                detail="Case not found"
            )
            
    if role == "doctor" and case.doctor_id != user_id:
        raise HTTPException(
            status_code=403,
            detail="You are not authorized to access this case."
        )

    return {
            "id": case.id,
            "doctor_id": case.doctor_id,
            "profile_image":
                case.doctor.profile_image
                if case.doctor else None,
            "doctor_name": case.doctor.full_name,
            "patient_name": case.patient_name,
            "patient_phone": case.patient_phone,
            "gender": case.gender,
            "age": case.age,
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
                    "file_path": file.file_path,
                    "file_type": file.file_type,
                    "file_category": file.file_category
                }

            
                for file in case.files
            ],
            "details": {
                "case_stage":
                    case.details.case_stage.split(",")
                    if case.details and case.details.case_stage
                    else [],

                "surface_texture":
                    case.details.surface_texture.split(",")
                    if case.details
                    and case.details.surface_texture
                    else [],

                "glazed_polish":
                    case.details.glazed_polish.split(",")
                    if case.details
                    and case.details.glazed_polish
                    else [],


                "incisal_translucency":
                    case.details.incisal_translucency.split(",")
                    if case.details
                    and case.details.incisal_translucency
                    else [],


                 "prepared_tooth_shade":
                    case.details.prepared_tooth_shade.split(",")
                    if case.details
                    and case.details.prepared_tooth_shade
                    else [],

                
                "shade_guide_color":
                    case.details.shade_guide_color
                    if case.details else None,



               "material_type":
                    case.details.material_type.split(",")
                    if case.details
                    and case.details.material_type
                    else [],



                "crown_bridge":
                    case.details.crown_bridge.split(",")
                    if case.details
                    and case.details.crown_bridge
                    else [],

                "implant_details": [
                        {
                            "implant_type": implant.implant_type,
                            "platform_diameter": implant.platform_diameter,
                            "screw_retained": implant.screw_retained,
                            "screw_retained_hybrid": implant.screw_retained_hybrid,
                            "cement_retained_ti_abutment": implant.cement_retained_ti_abutment,
                            "zr_abutment": implant.zr_abutment,
                            "implant_bar_type": implant.implant_bar_type,
                            "attachment_type": implant.attachment_type,
                        }
                    for implant in case.details.implant_details
                ]
            if case.details else [],

                "additional_restorations":
                    case.details.additional_restorations.split(",")
                    if case.details
                    and case.details.additional_restorations
                    else [],

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
        .options(
            joinedload(Case.doctor),
            selectinload(Case.files),
            joinedload(Case.details)
                .selectinload(
                    CaseDetail.implant_details
                )
        )
        .filter(Case.id == case_id)
        .first()
    )

    if not case:
        raise HTTPException(
            status_code=404,
            detail="Case not found"
        )

    case_detail = case.details
  
    case.patient_name = updated_case.patient_name
    case.patient_phone = updated_case.patient_phone
    case.gender = updated_case.gender
    case.age = updated_case.age
    case.appointment_date = updated_case.appointment_date
    case.appointment_time = updated_case.appointment_time
    case.delivery_deadline = updated_case.delivery_deadline
    case.preview_status = updated_case.preview_status
    case.status = updated_case.status

    if updated_case.details:

        if not case_detail:
            raise HTTPException(
                status_code=404,
                detail="Case detail not found"
            )

        case_detail.case_stage = ",".join(
            updated_case.details.case_stage or []
        )

        case_detail.surface_texture = ", ".join(
            updated_case.details.surface_texture or []
        )

        case_detail.glazed_polish = ", ".join(
            updated_case.details.glazed_polish or []
        )

        case_detail.incisal_translucency = ", ".join(
            updated_case.details.incisal_translucency or []
        )

        case_detail.prepared_tooth_shade = ", ".join(
            updated_case.details.prepared_tooth_shade or []
        )

        case_detail.material_type = ",".join(
            updated_case.details.material_type or []
        )

        case_detail.crown_bridge = ",".join(
            updated_case.details.crown_bridge or []
        )

        case_detail.shade_guide_color = (
            updated_case.details.shade_guide_color
        )

        case_detail.additional_restorations = ",".join(
            updated_case.details.additional_restorations or []
        )

        case_detail.design_preview = (
            updated_case.details.design_preview
        )

        case_detail.additional_instructions = (
            updated_case.details.additional_instructions
        )

        db.query(ImplantDetail).filter(
            ImplantDetail.case_detail_id == case_detail.id
        ).delete()

        # Add new implants
        for implant in updated_case.details.implant_details:

            implant_record = ImplantDetail(
                case_detail_id=case_detail.id,
                implant_type=implant.implant_type,
                platform_diameter=implant.platform_diameter,
                screw_retained=implant.screw_retained,
                screw_retained_hybrid=implant.screw_retained_hybrid,
                cement_retained_ti_abutment=implant.cement_retained_ti_abutment,
                zr_abutment=implant.zr_abutment,
                implant_bar_type=implant.implant_bar_type,
                attachment_type=implant.attachment_type,
            )

            db.add(implant_record)

    db.commit()

    db.refresh(case)

    case = (
        db.query(Case)
        .options(
            joinedload(Case.doctor),
            selectinload(Case.files),
            joinedload(Case.details)
                .selectinload(
                    CaseDetail.implant_details
                )
        )
        .filter(Case.id == case_id)
        .first()
    )

    case_detail = case.details

    return {
        "id": case.id,
        "doctor_id": case.doctor_id,
        "doctor_name": (
            case.doctor.full_name
            if case.doctor else None
        ),
        "patient_name": case.patient_name,
        "patient_phone": case.patient_phone,
        "gender": case.gender,
        "age": case.age,
        "appointment_date": case.appointment_date,
        "appointment_time": case.appointment_time,
        "delivery_deadline": case.delivery_deadline,
        "preview_status": case.preview_status,
        "status": case.status,
        "created_at": case.created_at,

        "details": {
            "case_stage":
                case_detail.case_stage.split(",")
                if case_detail and case_detail.case_stage
                else [],

            "surface_texture":
                case_detail.surface_texture.split(",")
                if case_detail and case_detail.surface_texture
                else [],

            "glazed_polish":
                case_detail.glazed_polish.split(",")
                if case_detail and case_detail.glazed_polish
                else [],

            "incisal_translucency":
                case_detail.incisal_translucency.split(",")
                if case_detail and case_detail.incisal_translucency
                else [],

            "prepared_tooth_shade":
                case_detail.prepared_tooth_shade.split(",")
                if case_detail and case_detail.prepared_tooth_shade
                else [],

            "shade_guide_color":
                case_detail.shade_guide_color
                if case_detail else None,

            "material_type":
                case_detail.material_type.split(",")
                if case_detail and case_detail.material_type
                else [],

            "crown_bridge":
                case_detail.crown_bridge.split(",")
                if case_detail and case_detail.crown_bridge
                else [],

            "additional_restorations":
                case_detail.additional_restorations.split(",")
                if case_detail and case_detail.additional_restorations
                else [],

            "additional_instructions":
                case_detail.additional_instructions
                if case_detail else None,

            "implant_details": [
                {
                    "implant_type": implant.implant_type,
                    "platform_diameter": implant.platform_diameter,
                    "screw_retained": implant.screw_retained,
                    "screw_retained_hybrid": implant.screw_retained_hybrid,
                    "cement_retained_ti_abutment": implant.cement_retained_ti_abutment,
                    "zr_abutment": implant.zr_abutment,
                    "implant_bar_type": implant.implant_bar_type,
                    "attachment_type": implant.attachment_type,
                }
                for implant in (
                    case_detail.implant_details
                    if case_detail
                    else []
                )
            ]
        },

        "files": [
            {
                "id": file.id,
                "file_name": file.file_name,
                "file_type": file.file_type,
                "file_path": file.file_path,
                "file_category": file.file_category
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
        
        notification = Notification(
        message=f"Case #{case.id} status changed to {status_data.status}",
        case_id=case.id,
         receiver_id=case.doctor_id,
         notification_type="status_change",
        is_read=False
        )

        db.add(notification)

        
        db.commit()
        db.refresh(case)

        return {
            "message": "Status updated successfully",
            "status": case.status
        }

@router.put("/cases/{case_id}/preview-status")
def update_preview_status(
    case_id:int,
    preview_data:PreviewStatusUpdate,
    db:Session=Depends(get_db)
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
    case.preview_status = preview_data.preview_status
    db.commit()
    db.refresh(case)
    return {
        "message": "Preview status updated successfully",
        "preview_status": case.preview_status   
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
        .limit(20)
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
    category: str = Form(...),
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

    try:
        async with aiofiles.open(
            file_path,
            "wb"
        ) as out_file:

            while chunk := await file.read(
                1024 * 1024
            ):  # 1 MB chunks

                await out_file.write(
                    chunk
                )

        new_file = CaseFile(
            case_id=case.id,
            file_type=file.content_type,
            file_name=file.filename,
            file_path=file_path,
            file_category=category
        )

        db.add(new_file)
        db.commit()
        db.refresh(new_file)

        return {
            "message": "File uploaded successfully",
            "file_id": new_file.id,
            "file_name": new_file.file_name
        }

    except Exception:
        if os.path.exists(file_path):
            os.remove(file_path)

        raise HTTPException(
            status_code=500,
            detail="Failed to upload file"
        )
    
    
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
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    query = db.query(CaseFile)

    total = query.count()

    files = (
        query
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "items": files,
        "total": total,
        "page": page,
        "pages": (total + limit - 1) // limit
    }


@router.get("/case_files/{case_id}")
def get_case_files(
    case_id: int,
    db: Session = Depends(get_db)
):
    files = (
        db.query(CaseFile)
        .filter(CaseFile.case_id == case_id)
        .all()
    )

    return [
    {
        "id": file.id,
        "file_name": file.file_name,
        "file_type": file.file_type,
        "file_category": file.file_category,
        "file_path": file.file_path
    }
    for file in files
]


@router.delete("/case-files/{file_id}")
def delete_case_file(
    file_id: int,
    db: Session = Depends(get_db)
):
    file = (
        db.query(CaseFile)
        .filter(CaseFile.id == file_id)
        .first()
    )

    if not file:
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    try:
        try:
            os.remove(file.file_path)
        except FileNotFoundError:
            pass

        db.delete(file)
        db.commit()

        return {
            "message": "File deleted successfully"
        }

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Failed to delete file"
        )

@router.post("/temp-upload")
async def temp_upload(
    file: UploadFile = File(...)
):
    upload_dir = "temp_uploads"
    os.makedirs(
        upload_dir,
        exist_ok=True
    )

    unique_name = (
        f"{uuid4()}_{file.filename}"
    )

    file_path = os.path.join(
        upload_dir,
        unique_name
    )

    try:
        async with aiofiles.open(
            file_path,
            "wb"
        ) as out_file:

            while chunk := await file.read(
                1024 * 1024
            ):
                await out_file.write(
                    chunk
                )

        return {
            "file_name": file.filename,
            "file_path": file_path
        }

    except Exception:
        if os.path.exists(file_path):
            os.remove(file_path)

        raise HTTPException(
            status_code=500,
            detail="Failed to upload file"
        )

@router.delete("/delete-temp-file")
def delete_temp_file(
    data: DeleteTempFileRequest
):
    try:
        if data.file_path:
            try:
                os.remove(data.file_path)
            except FileNotFoundError:
                pass

        return {
            "message":
            "Temp file deleted"
        }

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Failed to delete temp file"
        )
    

@router.put("/cases/{case_id}/confirm-preview-files")
def confirm_preview_files(
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
    
    updated = (
        db.query(CaseFile)
        .filter(
            CaseFile.case_id == case_id,
            CaseFile.file_category == "preview_file",
            CaseFile.is_confirmed == False
        )
        .update(
            {"is_confirmed": True},
            synchronize_session=False
        )
    )

    if updated == 0:
        raise HTTPException(
            status_code=404,
            detail="No preview files found"
    )

    case.preview_status = "Waiting User"

    db.commit()
    db.refresh(case)

    return {
        "message": "Preview files confirmed",
        "preview_status": case.preview_status
    }


@router.put(
    "/cases/{case_id}/approve-preview"
)
def approve_preview(
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

    case.preview_status = "Approved"

    db.commit()

    return {
        "message":
            "Preview approved"
    }

@router.put(
    "/cases/{case_id}/reject-preview"
)
def reject_preview(
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

    case.preview_status = "Preview Rejected"

    db.commit()

    return {
        "message":
            "Preview rejected"
    }


@router.post("/cases/{case_id}/save-temp-file")
def save_temp_file(
    case_id: int,
    data: SaveTempFileRequest,
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

    temp_path = data.file_path

    if not temp_path.startswith("temp_uploads"):
        raise HTTPException(
            status_code=400,
            detail="Invalid file path"
        )

    if not os.path.exists(temp_path):
        raise HTTPException(
            status_code=404,
            detail="Temp file not found"
        )

    upload_folder = "uploads"
    os.makedirs(
        upload_folder,
        exist_ok=True
    )
    file_name = os.path.basename(temp_path)

    unique_filename = (
        f"{uuid4()}_{file_name}"
    )

    new_path = os.path.join(
        upload_folder,
        unique_filename
    )

    try:
        # Move file from temp to uploads
        shutil.move(
            temp_path,
            new_path
        )

        # Replace old case document
        if data.category == "case_document":

            old_file = (
                db.query(CaseFile)
                .filter(
                    CaseFile.case_id == case_id,
                    CaseFile.file_category == "case_document"
                )
                .first()
            )

            if old_file:

                try:
                    os.remove(old_file.file_path)
                except FileNotFoundError:
                    pass

                db.delete(old_file)

        new_file = CaseFile(
            case_id=case.id,
            file_name=file_name,
            file_path=new_path,
            file_type="application/octet-stream",
            file_category=data.category
        )

        db.add(new_file)
        db.commit()
        db.refresh(new_file)

        return {
            "message": "Temp file saved successfully",
            "file_id": new_file.id,
            "file_name": new_file.file_name
        }

    except Exception as e:
        db.rollback()

        # Remove moved file if DB fails
        if os.path.exists(new_path):
            os.remove(new_path)

        raise HTTPException(
            status_code=500,
            detail=f"Failed to save file: {str(e)}"
        )
