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
from fastapi import Form

from app.database.database import get_db
from app.models.case_model import Case
from app.models.case_file_model import CaseFile
from app.models.user_model import User
from app.models.notification_model import Notification
from pydantic import BaseModel
from fastapi.responses import FileResponse
from sqlalchemy.orm import joinedload
from app.models.case_detail_model import CaseDetail
from app.models.implant_detail_model import ImplantDetail

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

        shade_guide_color=
        case.details.shade_guide_color
        if case.details else None,

        material_type=",".join(
            case.details.material_type or []
        ) if case.details else None,

        crown_bridge=",".join(
            case.details.crown_bridge or []
        ) if case.details else None,

        additional_restorations=",".join(
            case.details.additional_restorations or []
        ) if case.details else None,

        design_preview=
        case.details.design_preview
        if case.details else None,

        additional_instructions=
        case.details.additional_instructions
        if case.details else None
    )

    db.add(case_detail)
    db.flush()


    if case.details and case.details.implant_details:

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

    db.commit()
    db.refresh(case_detail)

    doctor = db.query(User).filter(
        User.id == new_case.doctor_id
    ).first()

    if doctor:
        notification = Notification(
            message=f"New case submitted by Dr. {doctor.full_name}",case_id=new_case.id,is_read=False
        )

        db.add(notification)
        db.commit()

    uploaded_files = (
    db.query(CaseFile)
    .filter(CaseFile.case_id == new_case.id)
    .all()
)

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
                    if case_detail.case_stage
                    else [],

                "surface_texture":
                    case_detail.surface_texture.split(",")
                    if case_detail.surface_texture
                    else [],

                "glazed_polish":
                    case_detail.glazed_polish.split(",")
                    if case_detail.glazed_polish
                    else [],

                "incisal_translucency":
                    case_detail.incisal_translucency.split(",")
                    if case_detail.incisal_translucency
                    else [],

                "prepared_tooth_shade":
                    case_detail.prepared_tooth_shade.split(",")
                    if case_detail.prepared_tooth_shade
                    else [],

                "shade_guide_color":
                    case_detail
                    .shade_guide_color,

                "material_type":
                    case_detail
                    .material_type
                    .split(",")
                    if case_detail
                    .material_type
                    else [],

                "crown_bridge":
                    case_detail
                    .crown_bridge
                    .split(",")
                    if case_detail
                    .crown_bridge
                    else [],

                "additional_restorations":
                    case_detail
                    .additional_restorations
                    .split(",")
                    if case_detail
                    .additional_restorations
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
                for implant in case_detail.implant_details
            ],

        },
    "files": [
        {
            "id": file.id,
            "file_name": file.file_name,
            "file_type": file.file_type,
            "file_path": file.file_path,
            "file_category": file.file_category
        }
        for file in uploaded_files
    ]
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

        case_detail = (
            db.query(CaseDetail)
            .filter(
                CaseDetail.case_id == case.id
            )
            .first()
        )

        result.append({
            "id": case.id,
            "doctor_id": case.doctor_id,
            "doctor_name":
                case.doctor.full_name
                if case.doctor else None,

            "doctor_phone":
                case.doctor.phone
                if case.doctor else None,
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


                 "additional_restorations":
                    case.details.additional_restorations.split(",")
                    if case.details
                    and case.details.additional_restorations
                    else [],

                "additional_instructions":
                    case.details.additional_instructions
                    if case.details else None,

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
        },

        "files": [
                {
                    "id": file.id,
                    "file_name": file.file_name,
                    "file_path": file.file_path,
                    "file_type": file.file_type,
                    "file_category": file.file_category
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
        .options(joinedload(Case.details))
        .filter(Case.id == case_id)
        .first()
        )

        print("CASE:", case.id)
        print("DETAILS:", case.details)


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
            case_detail.case_stage = ",".join(
                updated_case.details.case_stage
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
                updated_case.details.material_type
            )

            case_detail.crown_bridge = ",".join(
                updated_case.details.crown_bridge
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
            ImplantDetail.case_detail_id == case_detail.id).delete()

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
            db.refresh(case_detail)

            uploaded_files = (
            db.query(CaseFile)
            .filter(CaseFile.case_id == case.id)
            .all()
        )

        return {
            "id": case.id,
            "doctor_id": case.doctor_id,

            "doctor_name":
                case.doctor.full_name
                if case.doctor else None,

            "patient_name":
                case.patient_name,

            "patient_phone":
                case.patient_phone,

            "gender":
                case.gender,

            "age":
                case.age,

            "appointment_date":
                case.appointment_date,

            "appointment_time":
                case.appointment_time,

            "delivery_deadline":
                case.delivery_deadline,

            "preview_status":
                case.preview_status,

            "status":
                case.status,

            "created_at":
                case.created_at,

            "details": {
                "case_stage":
                    case_detail.case_stage.split(",")
                    if case_detail.case_stage
                    else [],

                "surface_texture":
                    case_detail.surface_texture.split(",")
                    if case_detail.surface_texture
                    else [],

                "glazed_polish":
                    case_detail.glazed_polish.split(",")
                    if case_detail.glazed_polish
                    else [],

                "incisal_translucency":
                    case_detail.incisal_translucency.split(",")
                    if case_detail.incisal_translucency
                    else [],

                "prepared_tooth_shade":
                    case_detail.prepared_tooth_shade.split(",")
                    if case_detail.prepared_tooth_shade
                    else [],

                "shade_guide_color":
                    case_detail
                    .shade_guide_color,

                "material_type":
                    case_detail
                    .material_type
                    .split(",")
                    if case_detail
                    .material_type
                    else [],

                "crown_bridge":
                    case_detail
                    .crown_bridge
                    .split(",")
                    if case_detail
                    .crown_bridge
                    else [],

                "additional_restorations":
                    case_detail
                    .additional_restorations
                    .split(",")
                    if case_detail
                    .additional_restorations
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
                            "attachment_type": implant.attachment_type
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
                for file in uploaded_files
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
        is_read=False
        )

        db.add(notification)

        
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

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    new_file = CaseFile(
        case_id=case.id,
        file_type=file.content_type,
        file_name=file.filename,
        file_path=file_path,
        file_category=category,
        is_confirmed=False
    )

    db.add(new_file)
    db.commit()
    db.refresh(new_file)

    print("CATEGORY:", category)
    print("FILE:", file.filename)

    return {
        "message": "File uploaded successfully",
        "file_id": new_file.id,
        "file_name": file.filename
    }

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

    return files

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

@router.post("/temp-upload")
async def temp_upload(file: UploadFile = File(...)):

    upload_dir = "temp_uploads"
    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(
        upload_dir,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    return {
        "file_name": file.filename,
        "file_path": file_path
    }


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

    files = (
        db.query(CaseFile)
        .filter(
            CaseFile.case_id == case_id,
            CaseFile.file_category == "preview_file",
            CaseFile.is_confirmed == False
        )
        .all()
    )

    if not files:
        raise HTTPException(
        status_code=404,
        detail="No preview files found"
    )

    for file in files:
        file.is_confirmed = True

    case.preview_status = "Waiting User"

    db.commit()
    db.refresh(case)

    return {
        "message": "Preview files confirmed",
        "preview_status": case.preview_status
    }


@router.put("/cases/{case_id}/reject-preview")
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
    db.refresh(case)

    return {
        "message": "Preview rejected successfully",
        "preview_status": case.preview_status
    }

@router.put("/cases/{case_id}/approve-preview")
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
    db.refresh(case)

    return {
        "message": "Preview approved successfully",
        "preview_status": case.preview_status
    }