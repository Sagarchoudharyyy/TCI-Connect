from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.notification_model import Notification
from app.schemas.notification_schema import NotificationResponse
from datetime import datetime, timedelta
from app.models.case_model import Case


def create_deadline_notifications(db):
    today = datetime.now().date()

    cases = db.query(Case).all()

    for case in cases:
        if not case.delivery_deadline:
            continue

        days_left = (
            case.delivery_deadline - today
        ).days

        if days_left in [0, 1, 2, 3]:

            if days_left == 0:
                message = (
                    f"Deadline is today for {case.patient_name}"
                )
            else:
                message = (
                    f"Deadline in {days_left} day(s) "
                    f"for {case.patient_name}"
                )

            exists = (
                db.query(Notification)
                .filter(Notification.message == message)
                .first()
            )

            if not exists:
                notification = Notification(
                    message=message,
                    case_id=case.id,
                    is_read=False
                )

                db.add(notification)

    db.commit()

router = APIRouter()



@router.get(
    "/notifications",
    response_model=list[NotificationResponse]
)
def get_notifications(
    db: Session = Depends(get_db)
):
    create_deadline_notifications(db)

    notifications = (
        db.query(Notification)
        .filter(Notification.is_read == False)
        .order_by(Notification.created_at.desc())
        .all()
    )

    return notifications



@router.put("/notifications/read-all")
def mark_all_read(
    db:Session=Depends(get_db)
):
    db.query(Notification).update({
        Notification.is_read:True
    }
    )
    db.commit()
    return{
        "message": "All notifications marked as read"
    }

@router.put("/notifications/{notification_id}/read")
def mark_notification_read(
    notification_id:int,
    db:Session=Depends(get_db)
):
    notification=(
        db.query(Notification).filter(Notification.id==notification_id).first()
    )

    if not notification:
        return {"message":"Notification not found"}

    notification.is_read=True
    db.commit()
    return{
        "message": "Notifications marked as read"
    }
    
@router.get("/notifications/all")
def get_all_notifications(
    db:Session=Depends(get_db)
):
    notifications=(
        db.query(Notification)
        .order_by(Notification.created_at.desc()).all()
    )        
    return notifications