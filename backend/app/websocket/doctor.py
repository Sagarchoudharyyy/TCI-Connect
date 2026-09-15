from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from .manager import manager


router = APIRouter()


@router.websocket("/ws/admin/doctors")
async def websocket_doctors(
    websocket: WebSocket
):

    await manager.connect_doctor(
        websocket
    )

    try:

        while True:

            await websocket.receive_text()

    except WebSocketDisconnect:

        manager.disconnect_doctor(
            websocket
        )

    except Exception as error:

        print(
            "Doctor WebSocket error:",
            error
        )

        manager.disconnect_doctor(
            websocket
        )