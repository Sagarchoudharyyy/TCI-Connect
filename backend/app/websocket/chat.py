from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.chat_model import ChatMessage
from app.models.user_model import User
from app.models.notification_model import Notification

from .manager import manager


router = APIRouter()



@router.websocket("/ws/chat/{user_id}")
async def websocket_chat(
    websocket: WebSocket,
    user_id: int
):

    await manager.connect(
        user_id,
        websocket
    )

    db: Session = SessionLocal()

    try:

        while True:

            data = await websocket.receive_json()

            receiver_id = data.get("receiver_id")
            message_text = data.get("message")

            if not receiver_id or not message_text:
                continue

            # ==========================================
            # SAVE MESSAGE
            # ==========================================

            new_message = ChatMessage(
                sender_id=user_id,
                receiver_id=receiver_id,
                message=message_text,
                is_read=False
            )

            db.add(new_message)
            db.commit()
            db.refresh(new_message)

            # ==========================================
            # CREATE NOTIFICATION
            # ==========================================

            sender = db.query(User).filter(
                User.id == user_id
            ).first()

            receiver = db.query(User).filter(
                User.id == receiver_id
            ).first()

            if sender and receiver:

                notification = Notification(
                    message=f"{sender.full_name} sent you a message",
                    is_read=False,
                    notification_type="chat",
                    sender_id=sender.id,
                    receiver_id=receiver.id
                )

                db.add(notification)
                db.commit()

            # ==========================================
            # MESSAGE RESPONSE
            # ==========================================

            message_data = {
                "id": new_message.id,
                "sender_id": new_message.sender_id,
                "receiver_id": new_message.receiver_id,
                "message": new_message.message,
                "is_read": new_message.is_read,
                "timestamp": (
                    new_message.timestamp.isoformat()
                    if new_message.timestamp
                    else None
                )
            }

            # ==========================================
            # SEND TO RECEIVER
            # ==========================================

            await manager.send_to_user(
                receiver_id,
                message_data
            )

            # ==========================================
            # SEND BACK TO SENDER
            # ==========================================

            await manager.send_to_user(
                user_id,
                message_data
            )

    except WebSocketDisconnect:

        manager.disconnect(user_id)

    except Exception as error:

        print(
            f"WebSocket error for user {user_id}:",
            error
        )

        manager.disconnect(user_id)

    finally:

        db.close()