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


# --------------------------------------------------
# PROJECT ROOT
# --------------------------------------------------

# mobile_download.py
#     app/
#       api/
#         mobile_download.py
#
# parents[0] = api
# parents[1] = app
# parents[2] = project root

BASE_DIR = Path(__file__).resolve().parents[2]

UPLOAD_DIR = BASE_DIR / "uploads"


@router.get("/{file_id}")
def mobile_download_file(
    file_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    # --------------------------------------------------
    # 1. Find file
    # --------------------------------------------------

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


    # --------------------------------------------------
    # 2. Find related case
    # --------------------------------------------------

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


    # --------------------------------------------------
    # 3. Permission
    # --------------------------------------------------

    user_role = str(
        current_user.role
    ).lower()


    # Admin can download any file
    if user_role != "admin":

        # Doctor can only download his own case files
        if case.doctor_id != current_user.id:

            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=(
                    "You do not have permission "
                    "to download this file"
                ),
            )


    # --------------------------------------------------
    # 4. Validate database file path
    # --------------------------------------------------

    if not case_file.file_path:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File path not available",
        )


    # --------------------------------------------------
    # 5. Build physical file path
    # --------------------------------------------------

    stored_path = Path(
        case_file.file_path
    )


    # If database contains an absolute path,
    # use it directly.
    if stored_path.is_absolute():

        file_path = stored_path.resolve()

    else:

        # Remove "uploads/" if it already exists
        # because we are explicitly adding UPLOAD_DIR.
        relative_path = stored_path

        if relative_path.parts:
            if relative_path.parts[0].lower() == "uploads":
                relative_path = Path(
                    *relative_path.parts[1:]
                )

        file_path = (
            UPLOAD_DIR / relative_path
        ).resolve()


    # --------------------------------------------------
    # 6. Security check
    # --------------------------------------------------

    try:

        file_path.relative_to(
            UPLOAD_DIR.resolve()
        )

    except ValueError:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file path",
        )


    # --------------------------------------------------
    # 7. Debug logging
    # --------------------------------------------------

    print("========================================")
    print("MOBILE DOWNLOAD")
    print("File ID:", file_id)
    print("File name:", case_file.file_name)
    print("DB file path:", case_file.file_path)
    print("Base directory:", BASE_DIR)
    print("Upload directory:", UPLOAD_DIR)
    print("Final file path:", file_path)
    print("File exists:", file_path.exists())
    print("Is file:", file_path.is_file())
    print("========================================")


    # --------------------------------------------------
    # 8. Check physical file
    # --------------------------------------------------

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


    # --------------------------------------------------
    # 9. MIME type
    # --------------------------------------------------

    mime_type, _ = mimetypes.guess_type(
        case_file.file_name
    )

    if not mime_type:
        mime_type = "application/octet-stream"


    # --------------------------------------------------
    # 10. Return file
    # --------------------------------------------------

    return FileResponse(
        path=str(file_path),
        media_type=mime_type,
        filename=case_file.file_name,
        content_disposition_type="attachment",
    )