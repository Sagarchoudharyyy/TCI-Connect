from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from .manager import manager

router = APIRouter()


# =====================================================
# DOCTOR CASE WEBSOCKET
# =====================================================

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
        f"CASE WEBSOCKET CONNECTED: User {user_id}"
    )

    try:
        while True:
            await websocket.receive_text()

    except WebSocketDisconnect:
        manager.disconnect_case(user_id)

        print(
            f"CASE WEBSOCKET DISCONNECTED: User {user_id}"
        )

    except Exception as error:
        print(
            f"CASE WEBSOCKET ERROR User {user_id}:",
            error
        )

        manager.disconnect_case(user_id)


# =====================================================
# ADMIN CASE WEBSOCKET
# =====================================================

@router.websocket("/ws/admin/cases")
async def websocket_admin_cases(
    websocket: WebSocket
):
    # Your admin user ID
    admin_id = 1

    await manager.connect_case(
        admin_id,
        websocket
    )

    print(
        "===================================="
    )
    print(
        "ADMIN CASE WEBSOCKET CONNECTED"
    )
    print(
        "ADMIN ID:",
        admin_id
    )
    print(
        "CONNECTED CASE USERS:",
        list(manager.case_connections.keys())
    )
    print(
        "===================================="
    )

    try:
        while True:
            await websocket.receive_text()

    except WebSocketDisconnect:
        manager.disconnect_case(admin_id)

        print(
            "ADMIN CASE WEBSOCKET DISCONNECTED"
        )

    except Exception as error:
        print(
            "ADMIN CASE WEBSOCKET ERROR:",
            error
        )

        manager.disconnect_case(admin_id)