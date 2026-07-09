import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useParams } from "react-router-dom";
import "../../styles/chatWindow.css";

function ChatWindow() {
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const loggedUser =
    JSON.parse(localStorage.getItem("user"));

  const sender_id = loggedUser?.id;

  const receiver_id =
    loggedUser?.role === "admin"
      ? Number(id)
      : 1;
  useEffect(() => {
    if (sender_id && receiver_id) {
      getMessages();
      getUser();
      markMessagesRead();
    }
  }, [id, sender_id]);

  const getUser = async () => {
    try {

      const res = await api.get(
        `/user/${receiver_id}`
      );
      setUser(res.data);

    } catch (error) {
      console.log(error);
    }
  };


  const getMessages = async () => {
    try {
      const res = await api.get(
        `/messages/${sender_id}/${receiver_id}`
      );

      setMessages(res.data);

    } catch (error) {
      console.log(error);
    }
  };
  const markMessagesRead = async () => {
    try {
      await api.put(
        `/messages/read/${receiver_id}/${sender_id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async () => {

    if (!newMessage.trim()) return;

    try {

      await api.post(
        "/send-message",
        {
          sender_id,
          receiver_id: Number(receiver_id),
          message: newMessage,
        }
      );

      getMessages();
      setNewMessage("");

    } catch (error) {
      console.log(error);
    }
  };

  console.log("User:", user);
  console.log("Profile Image:", user?.profile_image);
  console.log("VITE_FILE_URL:", import.meta.env.VITE_FILE_URL);
  console.log(
    "Final URL:",
    user?.profile_image
      ? `${import.meta.env.VITE_FILE_URL}/uploads/profile/${encodeURIComponent(user.profile_image)}`
      : "No image"
  );
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
            <div className="chat-wrapper">

              <div className="chat-title chat-header">

                <div className="chat-user">

                  <div className="chat-avatar">
                    <img
                      src={
                        user?.profile_image
                          ? `${import.meta.env.VITE_FILE_URL}/${encodeURIComponent(user.profile_image)}`
                          : "/default-profile.png"
                      }
                      alt="user"
                      onLoad={() => console.log("Image Loaded")}
                      onError={(e) => {
                        console.log("Image Failed:", e.target.src);
                      }}
                    />
                  </div>

                  <div className="chat-user-info">
                    <div className="chat-name">
                      {user?.full_name || "Loading..."}
                    </div>
                  </div>

                </div>

              </div>

              <div id="chat-box">

                {messages.map((msg) => (

                  <div
                    key={msg.id}
                    className={
                      msg.sender_id === sender_id
                        ? "msg me"
                        : "msg them"
                    }
                  >

                    {msg.message}

                    <span className="meta">

                      {new Date(
                        msg.timestamp
                      ).toLocaleString()}

                      {msg.sender_id === sender_id && (
                        <span className="status-tick">

                          {msg.is_read
                            ? " • Seen"
                            : " • Sent"}

                        </span>
                      )}

                    </span>

                  </div>

                ))}

              </div>

              <div
                id="typing-indicator"
                aria-hidden="true"
                style={{ display: "none" }}
              />

              <div className="input-row">

                <input
                  type="text"
                  id="msg"
                  placeholder="Type a message..."
                  autoComplete="off"
                  value={newMessage}
                  onChange={(e) =>
                    setNewMessage(e.target.value)
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    handleSend()
                  }
                />

                <button
                  id="sendBtn"
                  type="button"
                  onClick={handleSend}
                >
                  Send
                </button>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ChatWindow;