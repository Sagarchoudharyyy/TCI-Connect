from fastapi import WebSocket


class ConnectionManager:

    def __init__(self):

        # Chat WebSockets
        self.active_connections: dict[int, WebSocket] = {}

        # Case status WebSockets
        self.case_connections: dict[int, WebSocket] = {}

    # =====================================================
    # CHAT
    # =====================================================

    async def connect(
        self,
        user_id: int,
        websocket: WebSocket
    ):
        await websocket.accept()

        self.active_connections[user_id] = websocket

        print(
            f"Chat WebSocket connected: User {user_id}"
        )

    def disconnect(
        self,
        user_id: int
    ):
        if user_id in self.active_connections:
            del self.active_connections[user_id]

        print(
            f"Chat WebSocket disconnected: User {user_id}"
        )

    async def send_to_user(
        self,
        user_id: int,
        data: dict
    ):

        websocket = self.active_connections.get(user_id)

        if websocket:
            try:
                await websocket.send_json(data)

            except Exception as error:
                print(
                    f"Chat WebSocket send failed for User {user_id}:",
                    error
                )

                self.disconnect(user_id)

    # =====================================================
    # CASE STATUS
    # =====================================================

    async def connect_case(
        self,
        user_id: int,
        websocket: WebSocket
    ):
        await websocket.accept()

        self.case_connections[user_id] = websocket

        print(
            f"Case WebSocket connected: User {user_id}"
        )

    def disconnect_case(
        self,
        user_id: int
    ):
        if user_id in self.case_connections:
            del self.case_connections[user_id]

        print(
            f"Case WebSocket disconnected: User {user_id}"
        )

    async def send_case_update(
        self,
        user_id: int,
        data: dict
    ):

        websocket = self.case_connections.get(user_id)

        if websocket:

            try:

                await websocket.send_json(data)

                print(
                    f"Case update sent to User {user_id}:",
                    data
                )

            except Exception as error:

                print(
                    f"Case WebSocket send failed for User {user_id}:",
                    error
                )

                self.disconnect_case(user_id)

        else:

            print(
                f"No Case WebSocket connected for User {user_id}"
            )

    def is_connected(
        self,
        user_id: int
    ) -> bool:

        return user_id in self.active_connections


manager = ConnectionManager()