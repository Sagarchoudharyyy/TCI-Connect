from fastapi import WebSocket


class ConnectionManager:

    def __init__(self):

        self.active_connections: dict[int, WebSocket] = {}

        self.case_connections: dict[int, WebSocket] = {}

        self.pricing_connections: dict[int, WebSocket] = {}

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
                    f"CASE UPDATE SENT TO USER {user_id}:",
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
                f"NO CASE WEBSOCKET CONNECTED FOR USER {user_id}"
            )

    async def connect_pricing(
        self,
        user_id: int,
        websocket: WebSocket
    ):
        await websocket.accept()

        self.pricing_connections[user_id] = websocket

        print(
            f"Pricing WebSocket connected: User {user_id}"
        )

    def disconnect_pricing(
        self,
        user_id: int
    ):
        if user_id in self.pricing_connections:
            del self.pricing_connections[user_id]

        print(
            f"Pricing WebSocket disconnected: User {user_id}"
        )

    async def send_pricing_update(
        self,
        data: dict
    ):

        disconnected_users = []

        for user_id, websocket in self.pricing_connections.items():

            try:

                await websocket.send_json(data)

                print(
                    f"PRICING UPDATE SENT TO USER {user_id}:",
                    data
                )

            except Exception as error:

                print(
                    f"Pricing WebSocket send failed for User {user_id}:",
                    error
                )

                disconnected_users.append(user_id)

        for user_id in disconnected_users:
            self.disconnect_pricing(user_id)


manager = ConnectionManager()










# from fastapi import WebSocket


# class ConnectionManager:

#     def __init__(self):

#         # Chat WebSockets
#         self.active_connections: dict[int, WebSocket] = {}

#         # Case WebSockets
#         self.case_connections: dict[int, WebSocket] = {}

#     # =====================================================
#     # CHAT
#     # =====================================================

#     async def connect(
#         self,
#         user_id: int,
#         websocket: WebSocket
#     ):
#         await websocket.accept()

#         self.active_connections[user_id] = websocket

#         print(
#             f"Chat WebSocket connected: User {user_id}"
#         )

#     def disconnect(
#         self,
#         user_id: int
#     ):
#         if user_id in self.active_connections:
#             del self.active_connections[user_id]

#         print(
#             f"Chat WebSocket disconnected: User {user_id}"
#         )

#     async def send_to_user(
#         self,
#         user_id: int,
#         data: dict
#     ):

#         websocket = self.active_connections.get(user_id)

#         if websocket:
#             try:
#                 await websocket.send_json(data)

#             except Exception as error:
#                 print(
#                     f"Chat WebSocket send failed for User {user_id}:",
#                     error
#                 )

#                 self.disconnect(user_id)

#     # =====================================================
#     # CASE WEBSOCKET
#     # =====================================================

#     async def connect_case(
#         self,
#         user_id: int,
#         websocket: WebSocket
#     ):
#         await websocket.accept()

#         self.case_connections[user_id] = websocket

#         print(
#             f"Case WebSocket connected: User {user_id}"
#         )

#     def disconnect_case(
#         self,
#         user_id: int
#     ):
#         if user_id in self.case_connections:
#             del self.case_connections[user_id]

#         print(
#             f"Case WebSocket disconnected: User {user_id}"
#         )

#     async def send_case_update(
#         self,
#         user_id: int,
#         data: dict
#     ):

#         websocket = self.case_connections.get(user_id)

#         if websocket:

#             try:
#                 await websocket.send_json(data)

#                 print(
#                     f"CASE UPDATE SENT TO USER {user_id}:",
#                     data
#                 )

#             except Exception as error:

#                 print(
#                     f"Case WebSocket send failed for User {user_id}:",
#                     error
#                 )

#                 self.disconnect_case(user_id)

#         else:

#             print(
#                 f"NO CASE WEBSOCKET CONNECTED FOR USER {user_id}"
#             )


# manager = ConnectionManager()