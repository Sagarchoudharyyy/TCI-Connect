from pathlib import Path
import mimetypes

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.case_file_model import CaseFile
from app.models.case_model import Case
from app.models.user_model import User
from app.api.auth import get_current_user


router = APIRouter(
    prefix="/mobile-download",
    tags=["Mobile Download"],
)


@router.get("/{file_id}")
def mobile_download_file(
    file_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # -----------------------------------------
    # 1. Find file
    # -----------------------------------------
    case_file = (
        db.query(CaseFile)
        .filter(CaseFile.id == file_id)
        .first()
    )

    if not case_file:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found",
        )

    # -----------------------------------------
    # 2. Find related case
    # -----------------------------------------
    case = (
        db.query(Case)
        .filter(Case.id == case_file.case_id)
        .first()
    )

    if not case:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found",
        )

    # -----------------------------------------
    # 3. Check permission
    # -----------------------------------------
    user_role = str(
        current_user.role
    ).lower()

    # Admin can download any case file
    if user_role != "admin":

        # Doctor can download files
        # belonging only to his own cases
        if case.doctor_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=(
                    "You do not have permission "
                    "to download this file"
                ),
            )

    # -----------------------------------------
    # 4. Check file path
    # -----------------------------------------
    if not case_file.file_path:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File path not available",
        )

    file_path = Path(
        case_file.file_path
    ).resolve()

    # -----------------------------------------
    # 5. Check physical file
    # -----------------------------------------
    if not file_path.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Physical file not found",
        )

    if not file_path.is_file():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file",
        )

    # -----------------------------------------
    # 6. MIME type
    # -----------------------------------------
    mime_type, _ = mimetypes.guess_type(
        case_file.file_name
    )

    if not mime_type:
        mime_type = "application/octet-stream"

    # -----------------------------------------
    # 7. Return file
    # -----------------------------------------
    return FileResponse(
        path=str(file_path),
        media_type=mime_type,
        filename=case_file.file_name,
        content_disposition_type="attachment",
    )