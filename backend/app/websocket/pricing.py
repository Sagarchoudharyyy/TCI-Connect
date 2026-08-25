from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.websocket.manager import manager


router = APIRouter()


@router.websocket("/ws/pricing/{user_id}")
async def pricing_websocket(
    websocket: WebSocket,
    user_id: int
):

    await manager.connect_pricing(
        user_id,
        websocket
    )

    try:

        while True:

            await websocket.receive_text()

    except WebSocketDisconnect:

        manager.disconnect_pricing(user_id)

    except Exception as error:

        print(
            f"Pricing WebSocket error for User {user_id}:",
            error
        )

        manager.disconnect_pricing(user_id)