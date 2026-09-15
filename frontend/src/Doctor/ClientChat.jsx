import React, { useEffect, useRef, useState } from "react";
import api from "../services/api";

import { useParams } from "react-router-dom";
import ProfileAvatar from "../components/ProfileAvatar";
import DoctorSideBar from "../components/DoctorSideBar";
import DoctorHeader from "../components/DoctorHeader";
import "../DoctorStyle/ChatClient.css";

function ClientChat() {
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const shouldReconnectRef = useRef(true);

  const loggedUser = JSON.parse(
    localStorage.getItem("user")
  );

  const sender_id = loggedUser?.id;
  const receiver_id = id || 1;

  useEffect(() => {
    if (sender_id && receiver_id) {
      const loadChat = async () => {
        await markChatNotificationsRead();
        await markMessagesRead();
        await getMessages();
        await getUser();
        connectWebSocket();
      };

      loadChat();
    }

    return () => {
      shouldReconnectRef.current = false;

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [id, sender_id]);

  useEffect(() => {
    const chatBox = document.getElementById("chat-box");

    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages]);

  const getUser = async () => {
    try {
      const res = await api.get(`/user/${receiver_id}`);

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const markChatNotificationsRead = async () => {
    try {
      await api.put(`/notifications/chat/read/${sender_id}`);
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
      "Connecting Doctor Chat WebSocket:",
      socketUrl
    );

    const socket = new WebSocket(socketUrl);

    socketRef.current = socket;

    socket.onopen = () => {
      console.log(
        "Doctor Chat WebSocket connected"
      );
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        const isCurrentConversation =
          (
            Number(data.sender_id) === Number(sender_id) &&
            Number(data.receiver_id) === Number(receiver_id)
          ) ||
          (
            Number(data.sender_id) === Number(receiver_id) &&
            Number(data.receiver_id) === Number(sender_id)
          );

        if (!isCurrentConversation) {
          return;
        }

        setMessages((previousMessages) => {
          const alreadyExists = previousMessages.some(
            (msg) =>
              Number(msg.id) === Number(data.id)
          );

          if (alreadyExists) {
            return previousMessages;
          }

          return [
            ...previousMessages,
            data
          ];
        });

        if (
          Number(data.sender_id) === Number(receiver_id)
        ) {
          markMessagesRead();
        }

      } catch (error) {
        console.log(
          "WebSocket message error:",
          error
        );
      }
    };

    socket.onclose = () => {
      console.log(
        "Doctor Chat WebSocket disconnected"
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
        "Doctor Chat WebSocket error:",
        error
      );
    };
  };

  const handleSend = () => {
    if (!newMessage.trim()) {
      return;
    }

    if (
      !socketRef.current ||
      socketRef.current.readyState !== WebSocket.OPEN
    ) {
      console.log(
        "WebSocket is not connected"
      );

      return;
    }

    socketRef.current.send(
      JSON.stringify({
        receiver_id: Number(receiver_id),
        message: newMessage.trim()
      })
    );

    setNewMessage("");
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0 doctor-dashboard-main">

        {showSidebar && (
          <div
            className="doctor-sidebar-overlay"
            onClick={() => setShowSidebar(false)}
          />
        )}

        <DoctorSideBar
          showSidebar={showSidebar}
        />

        <div className="col-md-9 doctor-main-content">

          <DoctorHeader
            title="Dashboard"
            setShowSidebar={setShowSidebar}
          />

          <div className="main-c-inner">
            <div className="chat-wrapper">

              <div className="chat-title chat-header">

                <div className="chat-user">

                  <div className="chat-avatar">
                    <ProfileAvatar
                      profileImage={user?.profile_image}
                      size={45}
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









// import React, { useEffect, useState } from "react";
// import api from "../services/api";

// import { useParams } from "react-router-dom";
// import ProfileAvatar from "../components/ProfileAvatar";
// import DoctorSideBar from "../components/DoctorSideBar";
// import DoctorHeader from "../components/DoctorHeader";
// import "../DoctorStyle/ChatClient.css"
// function ClientChat() {
//   const { id } = useParams();

//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [user, setUser] = useState(null);
//   const [showSidebar, setShowSidebar] = useState(false);


//   const loggedUser =
//     JSON.parse(localStorage.getItem("user"));

//   const sender_id = loggedUser?.id;

//   const receiver_id = id || 1;

//   useEffect(() => {
//     if (sender_id && receiver_id) {
//       const loadChat = async () => {
//         await markChatNotificationsRead();
//         await markMessagesRead();
//         await getMessages();
//         await getUser();
//       };

//       loadChat();
//     }
//   }, [id, sender_id]);
//   const getUser = async () => {
//     try {

//       const res = await api.get(`/user/${receiver_id}`);

//       setUser(res.data);

//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const markChatNotificationsRead = async () => {
//     try {


//       await api.put(`/notifications/chat/read/${sender_id}`);


//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getMessages = async () => {
//     try {

//       const res = await api.get(`/messages/${sender_id}/${receiver_id}`);
//       setMessages(res.data);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSend = async () => {

//     if (!newMessage.trim()) return;

//     try {

//       await api.post("/send-message", {
//         sender_id,
//         receiver_id: Number(receiver_id),
//         message: newMessage,
//       });

//       getMessages();
//       setNewMessage("");

//     } catch (error) {
//       console.log(error);
//     }
//   };


//   const markMessagesRead = async () => {
//     try {

//       await api.put(`/messages/read/${receiver_id}/${sender_id}`);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (

//     <div className="container-fluid p-0">
//       <div className="row g-0 doctor-dashboard-main">
//         {showSidebar && (
//           <div
//             className="doctor-sidebar-overlay"
//             onClick={() => setShowSidebar(false)}
//           />
//         )}
//         <DoctorSideBar showSidebar={showSidebar} />
//         <div className="col-md-9 doctor-main-content">
//           <DoctorHeader
//             title="Dashboard"
//             setShowSidebar={setShowSidebar}
//           />
//           <div className="main-c-inner">
//             <div className="chat-wrapper">

//               <div className="chat-title chat-header">

//                 <div className="chat-user">

//                   <div className="chat-avatar">
//                     <ProfileAvatar
//                       profileImage={user?.profile_image}
//                       size={45}
//                     />
//                   </div>

//                   <div className="chat-user-info">
//                     <div className="chat-name">
//                       {user?.full_name || "Loading..."}
//                     </div>
//                   </div>

//                 </div>

//               </div>

//               <div id="chat-box">

//                 {messages.map((msg) => (

//                   <div
//                     key={msg.id}
//                     className={
//                       msg.sender_id === sender_id
//                         ? "msg me"
//                         : "msg them"
//                     }
//                   >

//                     {msg.message}

//                     <span className="meta">

//                       {new Date(
//                         msg.timestamp
//                       ).toLocaleString()}

//                       {msg.sender_id === sender_id && (
//                         <span className="status-tick">

//                           {msg.is_read
//                             ? " • Seen"
//                             : " • Sent"}

//                         </span>
//                       )}

//                     </span>

//                   </div>

//                 ))}

//               </div>

//               <div
//                 id="typing-indicator"
//                 aria-hidden="true"
//                 style={{ display: "none" }}
//               />

//               <div className="input-row">

//                 <input
//                   type="text"
//                   id="msg"
//                   placeholder="Type a message..."
//                   autoComplete="off"
//                   value={newMessage}
//                   onChange={(e) =>
//                     setNewMessage(e.target.value)
//                   }
//                   onKeyDown={(e) =>
//                     e.key === "Enter" &&
//                     handleSend()
//                   }
//                 />

//                 <button
//                   id="sendBtn"
//                   type="button"
//                   onClick={handleSend}
//                 >
//                   Send
//                 </button>

//               </div>

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>

//   );
// }

// export default ClientChat;
