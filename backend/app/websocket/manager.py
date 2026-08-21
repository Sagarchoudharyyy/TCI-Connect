from fastapi import WebSocket


class ConnectionManager:

    def __init__(self):
        self.active_connections: dict[int, WebSocket] = {}

    async def connect(
        self,
        user_id: int,
        websocket: WebSocket
    ):
        await websocket.accept()

        self.active_connections[user_id] = websocket

        print(
            f"WebSocket connected: User {user_id}"
        )

    def disconnect(self, user_id: int):

        if user_id in self.active_connections:
            del self.active_connections[user_id]

        print(
            f"WebSocket disconnected: User {user_id}"
        )

    async def send_to_user(
        self,
        user_id: int,
        data: dict
    ):

        websocket = self.active_connections.get(user_id)

        if websocket:

            await websocket.send_json(data)

    def is_connected(
        self,
        user_id: int
    ) -> bool:

        return user_id in self.active_connections