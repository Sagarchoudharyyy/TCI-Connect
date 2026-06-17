
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
    getActiveUsers();
  }, []);

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
    <div className="container-fluid">
      <div className="dashboard-main">
        <div className="row g-0">

          <Sidebar />

          <div className="offset-2 col-12 col-md-9 col-lg-9 
                    offset-lg-3 col-xl-9 col-xxl-10 offset-xl-3 offset-xxl-2 
                    main-content">

            <Header title="Dashboard" />
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
                          <h5>{user.name}</h5>
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
    </div>
  )
}

export default Chat;