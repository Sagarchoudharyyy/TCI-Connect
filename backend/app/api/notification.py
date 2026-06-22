from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.notification_model import Notification
from app.schemas.notification_schema import NotificationResponse
router = APIRouter()
@router.get(
    "/notifications",
    response_model=list[NotificationResponse]
)
def get_notifications(
    db: Session = Depends(get_db)
):
    notifications = db.query(
    Notification
).filter(
    Notification.is_read == False
).order_by(
    Notification.created_at.desc()
).all()
    print("Fetch Notification: ",notifications)

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