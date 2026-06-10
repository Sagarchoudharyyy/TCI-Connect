import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

import DoctorSideBar from "../components/DoctorSideBar";
import DoctorHeader from "../components/DoctorHeader";
import "../DoctorStyle/ChatClient.css"
function ClientChat() {
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);

  // Logged in user id
  const loggedUser =
    JSON.parse(localStorage.getItem("user"));

  const sender_id = loggedUser?.id;

  // If no id in URL → open admin chat
  const receiver_id = id || 1;

  useEffect(() => {

    if (sender_id && receiver_id) {
      getMessages();
      getUser();
    }

  }, [id, sender_id]);

  const getUser = async () => {
    try {

      const res = await axios.get(
        `http://127.0.0.1:8000/user/${receiver_id}`
      );

      setUser(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {

      const res = await axios.get(
        `http://127.0.0.1:8000/messages/${sender_id}/${receiver_id}`
      );

      setMessages(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async () => {

    if (!newMessage.trim()) return;

    try {

      await axios.post(
        "http://127.0.0.1:8000/send-message",
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

  return (
    // <div className="container-fluid">
    //   <div className="dashboard-main">
    //     <div className="row g-0">

    //       <DoctorSideBar />

    //       <div
    //         className="offset-2 col-12 col-md-9 col-lg-9
    //         offset-lg-3 col-xl-9 col-xxl-10
    //         offset-xl-3 offset-xxl-2 main-content"
    //       >

    //         <DoctorHeader title="Chat" />
    <div className="container-fluid p-0">
      <div className="row g-0 doctor-dashboard-main">
        <DoctorSideBar />
        <div className="col-md-9 doctor-main-content">
          <DoctorHeader title="Dashboard" />
          <div className="main-c-inner">
            <div className="chat-wrapper">

              <div className="chat-title chat-header">

                <div className="chat-user">

                  <div className="chat-avatar">
                    <img
                      src="/src/assets/react.svg"
                      alt={user?.full_name || "User"}
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

export default ClientChat;