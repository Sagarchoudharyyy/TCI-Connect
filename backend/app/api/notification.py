from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.notification_model import Notification
from app.schemas.notification_schema import NotificationResponse
from datetime import datetime, timedelta
from app.models.case_model import Case


def create_deadline_notifications(db):
    today = datetime.now().date()

    cases = (
    db.query(Case)
    .filter(
        Case.delivery_deadline >= today,
        Case.delivery_deadline <=
        today + timedelta(days=3)
    )
    .all()
)

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
                    .filter(
                        Notification.message == message,
                        Notification.receiver_id == case.doctor_id
                    )
                    .first()
            )

            if not exists:
                notification = Notification(
                    message=message,
                    case_id=case.id,
                    is_read=False,
                    receiver_id=case.doctor_id,
                    notification_type="deadline"
                )

                db.add(notification)

    db.commit()

router = APIRouter()


@router.get("/notifications/all")
def get_all_notifications(
    page: int = 1,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    notifications = (
        db.query(Notification)
        .order_by(
            Notification.created_at.desc()
        )
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return notifications

@router.get("/notifications/all/{user_id}")
def get_all_notifications(
    user_id: int,
    page: int = 1,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    notifications = (
        db.query(Notification)
        .filter(
            Notification.receiver_id == user_id
        )
        .order_by(
            Notification.created_at.desc()
        )
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return notifications

@router.put("/notifications/read-all/{user_id}")
def mark_all_read(
    user_id: int,
    db: Session = Depends(get_db)
):
    (
        db.query(Notification)
        .filter(
            (Notification.receiver_id == user_id) |
            (Notification.receiver_id.is_(None))
            
            
        )
        .update(
            {Notification.is_read: True},
             synchronize_session=False
        )
    )

    db.commit()

    return {
        "message": "All notifications marked as read"
    }

@router.put("/notifications/{notification_id}/read")
def mark_notification_read(
    notification_id: int,
    db: Session = Depends(get_db)
):
    print("Notification ID:", notification_id)

    notification = (
        db.query(Notification)
        .filter(Notification.id == notification_id)
        .first()
    )

    print("Notification:", notification)

    if not notification:
        return {"message": "Notification not found"}

    print("Before:", notification.is_read)

    notification.is_read = True

    db.add(notification)
    db.commit()
    db.refresh(notification)

    print("After:", notification.is_read)

    return {
        "message": "Notifications marked as read"
    }


@router.get(
    "/admin/notifications",
    response_model=list[NotificationResponse]
)
def get_admin_notifications(
    db: Session = Depends(get_db)
):
    create_deadline_notifications(db)

    notifications = (
        db.query(Notification)
        .filter(
            Notification.is_read == False,
            (Notification.receiver_id==1) 
            |
            (Notification.receiver_id.is_(None))
        )
        .order_by(Notification.created_at.desc())
        .all()
    )

    return notifications


@router.get(
    "/client/notifications/{user_id}",
    response_model=list[NotificationResponse]
)
def get_client_notifications(
    user_id: int,
    db: Session = Depends(get_db)
):
    notifications = (
        db.query(Notification)
        .filter(
            Notification.is_read == False,
            Notification.receiver_id == user_id
        )
        .order_by(Notification.created_at.desc())
        .all()
    )

    return notifications


@router.get("/notifications/all/{user_id}")
def get_all_notifications(
    user_id: int,
    db: Session = Depends(get_db)
):
    notifications = (
        db.query(Notification)
        .filter(
            Notification.receiver_id == user_id
        )
        .order_by(Notification.created_at.desc())
        .all()
    )

    return notifications

@router.put("/notifications/chat/read/{user_id}")
def mark_chat_notifications_read(
    user_id: int,
    db: Session = Depends(get_db)
):
    (
        db.query(Notification)
        .filter(
            Notification.receiver_id == user_id,
            Notification.notification_type == "chat",
            Notification.is_read == False
        )
        .update(
            {Notification.is_read: True},
            synchronize_session=False
        )
    )

    db.commit()

    return {
        "message": "Chat notifications marked as read"
    }


@router.put("/messages/read/{sender_id}/{receiver_id}")
def mark_messages_read(
    sender_id: int,
    receiver_id: int,
    db: Session = Depends(get_db)
):
    (
        db.query(ChatMessage)
        .filter(
            ChatMessage.sender_id == sender_id,
            ChatMessage.receiver_id == receiver_id,
            ChatMessage.is_read == False
        )
        .update(
            {ChatMessage.is_read: True},
            synchronize_session=False
        )
    )

    db.commit()

    return {
        "message": "Messages marked as read"
    }