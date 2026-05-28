from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.models.chat_model import ChatMessage
from app.schemas.chat_schema import ChatCreate

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
         (ChatMessage.receiver_id == receiver_id)) |

        ((ChatMessage.sender_id == receiver_id) &
         (ChatMessage.receiver_id == sender_id))
    ).all()

    return message