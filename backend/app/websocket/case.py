from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from .manager import manager

router = APIRouter()


@router.websocket("/ws/cases/{user_id}")
async def websocket_cases(
    websocket: WebSocket,
    user_id: int
):
    await manager.connect_case(
        user_id,
        websocket
    )

    print(
        f"Case WebSocket connected: User {user_id}"
    )

    try:
        while True:
            await websocket.receive_text()

    except WebSocketDisconnect:
        manager.disconnect_case(user_id)

    except Exception as error:
        print(
            f"Case WebSocket error for User {user_id}:",
            error
        )

        manager.disconnect_case(user_id)