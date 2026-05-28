import React, { useState } from "react";
import axios from "axios";

const Chat = () => {

  // USERS
  const [users] = useState([
    {
      id: 1,
      name: "Dev Lachheta",
      latest: "hyy admin",
      time: "2026-02-09 07:20:10",
    },
    {
      id: 2,
      name: "Sagar",
      latest: "hyy",
      time: "2025-11-14 13:19:59",
    },
    {
      id: 3,
      name: "Abhi",
      latest: "No messages yet",
      time: "",
    },
  ]);

  // STATES
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const sender_id = 1;

  // GET MESSAGES
  const getMessages = async (receiver_id) => {

    try {

      const res = await axios.get(
        `http://127.0.0.1:8000/messages/${sender_id}/${receiver_id}`
      );

      setMessages(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  // SEND MESSAGE
  const sendMessage = async () => {

    if (!message) return;

    try {

      await axios.post(
        "http://127.0.0.1:8000/send-message",
        {
          sender_id,
          receiver_id: selectedUser.id,
          message,
        }
      );

      setMessage("");

      getMessages(selectedUser.id);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: window.innerWidth < 768 ? "10px" : "30px",
        background: "#f5f6fa",
        minHeight: "100vh",
      }}
    >

      {/* USER LIST SCREEN */}
      {!selectedUser ? (

        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "25px",
            width: "100%",
            maxWidth: "900px",
            margin: "auto",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >

          <h2
            style={{
              marginBottom: "20px",
              borderBottom: "1px solid #eee",
              paddingBottom: "10px",
            }}
          >
            Active Users
          </h2>

          {users.map((user) => (

            <div
              key={user.id}
              onClick={() => {
                setSelectedUser(user);
                getMessages(user.id);
              }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 10px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >

              {/* LEFT */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >

                {/* AVATAR */}
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "#e9eef5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    color: "#555",
                    fontSize: "18px",
                  }}
                >
                  {user.name.charAt(0)}
                </div>

                {/* USER INFO */}
                <div>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "17px",
                      color: "#1e293b",
                    }}
                  >
                    {user.name}
                  </h4>

                  <p
                    style={{
                      margin: "5px 0 0 0",
                      color: "#666",
                      fontSize: "14px",
                    }}
                  >
                    {user.latest}
                  </p>
                </div>
              </div>

              {/* TIME */}
              <div
                style={{
                  color: "#999",
                  fontSize: "13px",
                }}
              >
                {user.time}
              </div>

            </div>

          ))}

        </div>

      ) : (

        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            margin: "auto",
          }}
        >

          {/* HEADER */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >

            <button
              onClick={() => setSelectedUser(null)}
              style={{
                border: "none",
                background: "#ddd",
                padding: "8px 14px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Back
            </button>

            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "#e9eef5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              {selectedUser.name.charAt(0)}
            </div>

            <h3>{selectedUser.name}</h3>

          </div>

          {/* CHAT BOX */}
          <div
            style={{
              height: window.innerWidth < 768 ? "400px" : "500px",
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              overflowY: "auto",
              border: "1px solid #eee",
            }}
          >

            {messages.map((msg) => (

              <div
                key={msg.id}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.sender_id === sender_id
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: "15px",
                }}
              >

                <div
                  style={{
                    background:
                      msg.sender_id === sender_id
                        ? "#dcf8c6"
                        : "#f1f1f1",
                    padding: "12px",
                    borderRadius: "12px",
                    maxWidth: window.innerWidth < 768
                      ? "90%"
                      : "300px",
                    wordBreak: "break-word",
                  }}
                >

                  <div>{msg.message}</div>

                  <div
                    style={{
                      fontSize: "11px",
                      color: "#777",
                      marginTop: "5px",
                    }}
                  >
                    {msg.timestamp}
                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* INPUT */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "15px",
              flexDirection:
                window.innerWidth < 768
                  ? "column"
                  : "row",
            }}
          >

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Type message..."
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "25px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                background: "#28a745",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                borderRadius: "25px",
                cursor: "pointer",
                width:
                  window.innerWidth < 768
                    ? "100%"
                    : "auto",
              }}
            >
              Send
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default Chat;