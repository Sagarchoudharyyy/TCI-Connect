
import axios from "axios";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "../../styles/chat.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const sender_id = 1;

  const getMessages = async (user) => {

    setSelectedUser(user);

    try {

      const res = await axios.get(
        `http://127.0.0.1:8000/api/messages/${sender_id}/${user.id}`
      );

      setMessages(res.data);

    } catch (error) {
      console.log(error);
    }
  };
  const getActiveUsers = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/active-users"
      )
      setUsers(res.data);

    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    markChatNotificationsRead();
    getActiveUsers();
  }, []);

  const markChatNotificationsRead = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      console.log("Marking chat notifications for:", user.id);

      const res = await axios.put(
        `http://127.0.0.1:8000/api/notifications/chat/read/${user.id}`
      );


    } catch (error) {
      console.log(error);
    }
  };


  const sendMessage = async () => {

    if (!message.trim() || !selectedUser)
      return;

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/send-message",
        {
          sender_id,
          receiver_id: selectedUser.id,
          message,
        }
      );

      // Refresh messages after send
      getMessages(selectedUser);

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
                    onClick={() => navigate(`/chat/${user.id}`)}
                  >

                    <div className="user-left">

                      <div className="user-image">
                        <img
                          src="/src/assets/react.svg"
                          alt="user"
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
                          <h5 style={{ margin: 0 }}>
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
                      {new Date(
                        user.timestamp
                      ).toLocaleString()}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat;