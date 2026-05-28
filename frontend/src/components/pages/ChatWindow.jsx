import React, { useState } from "react";
import axios from "axios";

function ChatWindow({ selectedUser, goBack }) {

  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = async () => {

    if (newMessage.trim() === "") return;

    // CREATE NEW MESSAGE OBJECT
    const newMsg = {
      id: Date.now(),
      text: newMessage,
      time: new Date().toLocaleTimeString(),
    };

    try {

      // SAVE TO DATABASE
      await axios.post(
        "http://127.0.0.1:8000/send-message",
        {
          sender_id: 1,
          receiver_id: selectedUser.id,
          message: newMessage,
        }
      );

      // UPDATE SCREEN
      setMessages((prev) => [...prev, newMsg]);

      // CLEAR INPUT
      setNewMessage("");

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div
      style={{
        padding: "30px",
        background: "#f5f6fa",
        minHeight: "100vh",
      }}
    >

      {/* TOP BAR */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "20px",
        }}
      >

        <button
          onClick={goBack}
          style={{
            padding: "10px 15px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Back
        </button>

        <div
          style={{
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            background: "#e9eef5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "22px",
          }}
        >
          {selectedUser.name.charAt(0)}
        </div>

        <h1>{selectedUser.name}</h1>

      </div>

      {/* MESSAGE AREA */}

      <div
        style={{
          background: "#fff",
          height: "500px",
          borderRadius: "15px",
          padding: "20px",
          overflowY: "auto",
          marginBottom: "20px",
        }}
      >

        {messages.length === 0 ? (

          <p style={{ color: "#999" }}>
            No messages yet
          </p>

        ) : (

          messages.map((msg) => (

            <div
              key={msg.id}
              style={{
                background: "#dcf8c6",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "10px",
                width: "fit-content",
                maxWidth: "300px",
              }}
            >

              <div>{msg.text}</div>

              <small
                style={{
                  fontSize: "11px",
                  color: "#666",
                }}
              >
                {msg.time}
              </small>

            </div>

          ))

        )}

      </div>

      {/* INPUT AREA */}

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >

        <input
          type="text"
          placeholder="Type message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{
            flex: 1,
            padding: "15px",
            borderRadius: "30px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />

        <button
          onClick={handleSend}
          style={{
            background: "#28a745",
            color: "#fff",
            border: "none",
            padding: "0 30px",
            borderRadius: "30px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatWindow;