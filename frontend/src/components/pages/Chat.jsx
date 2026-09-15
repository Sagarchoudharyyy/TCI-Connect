import api from "../../services/api";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "../../styles/chat.css";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileAvatar from "../../components/ProfileAvatar";

const Chat = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const shouldReconnectRef = useRef(true);

  const sender_id = 1;

  const getMessages = async (user) => {
    setSelectedUser(user);

    try {
      const res = await api.get(
        `/messages/${sender_id}/${user.id}`
      );

      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getActiveUsers = async () => {
    try {
      const res = await api.get("/active-users");

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const markChatNotificationsRead = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      console.log(
        "Marking chat notifications for:",
        user.id
      );

      await api.put(
        `/notifications/chat/read/${user.id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const connectWebSocket = () => {
    if (!sender_id) {
      return;
    }

    if (
      socketRef.current &&
      (
        socketRef.current.readyState === WebSocket.OPEN ||
        socketRef.current.readyState === WebSocket.CONNECTING
      )
    ) {
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL;

    const wsBaseUrl = apiUrl
      .replace(/^http:/, "ws:")
      .replace(/^https:/, "wss:")
      .replace(/\/api\/?$/, "")
      .replace(/\/$/, "");

    const socketUrl =
      `${wsBaseUrl}/ws/chat/${sender_id}`;

    console.log(
      "Connecting Admin Chat WebSocket:",
      socketUrl
    );

    const socket = new WebSocket(socketUrl);

    socketRef.current = socket;

    socket.onopen = () => {
      console.log(
        "Admin Chat WebSocket connected"
      );
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        const doctorId =
          Number(data.sender_id) === Number(sender_id)
            ? Number(data.receiver_id)
            : Number(data.sender_id);

        setUsers((previousUsers) => {
          const existingUser = previousUsers.find(
            (user) =>
              Number(user.id) === Number(doctorId)
          );

          if (!existingUser) {
            return previousUsers;
          }

          const updatedUser = {
            ...existingUser,
            timestamp: data.timestamp,
            last_message: data.message,
            unread_count:
              Number(data.sender_id) !== Number(sender_id)
                ? Number(existingUser.unread_count || 0) + 1
                : existingUser.unread_count
          };

          const remainingUsers =
            previousUsers.filter(
              (user) =>
                Number(user.id) !== Number(doctorId)
            );

          return [
            updatedUser,
            ...remainingUsers
          ];
        });

      } catch (error) {
        console.log(
          "Admin Chat WebSocket message error:",
          error
        );
      }
    };

    socket.onclose = () => {
      console.log(
        "Admin Chat WebSocket disconnected"
      );

      socketRef.current = null;

      if (!shouldReconnectRef.current) {
        return;
      }

      reconnectTimeoutRef.current = setTimeout(() => {
        connectWebSocket();
      }, 3000);
    };

    socket.onerror = (error) => {
      console.log(
        "Admin Chat WebSocket error:",
        error
      );
    };
  };

  useEffect(() => {
    markChatNotificationsRead();
    getActiveUsers();
    connectWebSocket();

    return () => {
      shouldReconnectRef.current = false;

      if (reconnectTimeoutRef.current) {
        clearTimeout(
          reconnectTimeoutRef.current
        );
      }

      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getActiveUsers();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const sendMessage = async () => {
    if (!message.trim() || !selectedUser) {
      return;
    }

    if (
      !socketRef.current ||
      socketRef.current.readyState !== WebSocket.OPEN
    ) {
      console.log(
        "Admin Chat WebSocket is not connected"
      );

      return;
    }

    try {
      socketRef.current.send(
        JSON.stringify({
          receiver_id: Number(selectedUser.id),
          message: message.trim()
        })
      );

      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-main">

      {showSidebar && (
        <div
          className="sidebar-overlay"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <Sidebar showSidebar={showSidebar} />

      <div className="main-wrapper">

        <Header
          title="Dashboard"
          setShowSidebar={setShowSidebar}
        />

        <div className="main-content">

          <div className="main-c-inner">

            <div className="chat-container">

              <div className="chat-wrapper">

                <h2>Active Users</h2>

                <hr />

                {users.map((user) => (

                  <div
                    key={user.id}
                    className="user-row"
                    onClick={() =>
                      navigate(`/chat/${user.id}`)
                    }
                  >

                    <div className="user-left">

                      <div className="user-image">

                        <ProfileAvatar
                          profileImage={
                            user.profile_image
                          }
                          size={40}
                        />

                      </div>

                      <div className="user-details">

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                          }}
                        >

                          <h5
                            style={{
                              margin: 0
                            }}
                          >
                            {user.name}
                          </h5>

                          {user.unread_count > 0 && (
                            <span
                              style={{
                                background: "#dc3545",
                                color: "#fff",
                                borderRadius: "50%",
                                minWidth: "22px",
                                height: "22px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                                padding: "0 6px"
                              }}
                            >
                              {user.unread_count}
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                    <div className="user-time">

                      {user.timestamp
                        ? new Date(
                          user.timestamp
                        ).toLocaleString()
                        : ""}

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Chat;


