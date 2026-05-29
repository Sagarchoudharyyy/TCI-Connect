from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.models.chat_model import ChatMessage
from app.schemas.chat_schema import ChatCreate
from app.models.user_model import User

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/send-message")
def send_message(chat: ChatCreate, db: Session = Depends(get_db)):

    new_message = ChatMessage(
        sender_id=chat.sender_id,
        receiver_id=chat.receiver_id,
        message=chat.message
    )

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return {
        "message": "Message sent successfully",
        "data": new_message
    }

@router.get("/messages/{sender_id}/{receiver_id}")
def get_messages(sender_id: int, receiver_id: int, db: Session = Depends(get_db)):

    messages = db.query(ChatMessage).filter(
        ((ChatMessage.sender_id == sender_id) &
         (ChatMessage.receiver_id == receiver_id))
         
        |

        ((ChatMessage.sender_id == receiver_id) &
         (ChatMessage.receiver_id == sender_id))
    ).order_by(ChatMessage.timestamp.asc()).all()

    return messages

@router.get("/active-users")
def get_active_users(
    db: Session = Depends(get_db)
):

    users = db.query(User).filter(
        User.id != 1
    ).all()

    result = []

    for user in users:

        last_message = (
            db.query(ChatMessage)
            .filter(
                (
                    (ChatMessage.sender_id == user.id)
                    & (ChatMessage.receiver_id == 1)
                )
                |
                (
                    (ChatMessage.sender_id == 1)
                    & (ChatMessage.receiver_id == user.id)
                )
            )
            .order_by(ChatMessage.timestamp.desc())
            .first()
        )

        result.append({
            "id": user.id,
            "name": user.full_name,
            "timestamp":
                last_message.timestamp
                if last_message
                else None
        })

    return result

    
@router.get("/user/{user_id}")
def get_user(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        return {
            "message": "User not found"
        }

    return user