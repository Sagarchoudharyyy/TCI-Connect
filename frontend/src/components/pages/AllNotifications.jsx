import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Header from "../Header";

import { useNavigate } from "react-router-dom";

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/notifications/all"
      );

      setNotifications(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const markAsRead = async (item) => {


    try {
      await axios.put(
        `http://127.0.0.1:8000/api/notifications/${item.id}/read`
      );

      await fetchNotifications();

      // Doctor registration notification
      if (
        item.notification_type ===
        "doctor_registration"
      ) {
        navigate(
          `/admin/user-details/${item.sender_id}`
        );
        return;
      }

      // Chat notification
      if (
        item.notification_type ===
        "chat"
      ) {
        navigate("/admin/chats");
        return;
      }

      // Case notifications
      if (item.case_id) {
        navigate(
          `/admin/view-case/${item.case_id}`
        );
        return;
      }
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

            <div className="container my-4">
              <h4>All Notifications</h4>

              <div className="mt-4">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="border-bottom p-3"
                    onClick={() => markAsRead(item)}

                    style={{
                      backgroundColor:
                        item.is_read
                          ? "#fff"
                          : "#e8f4ff",
                      maxWidth: "100%",
                      cursor: "pointer",
                      transition: "0.2s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#e8f4ff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = item.is_read
                        ? "#fff"
                        : "#e8f4ff";
                    }}
                  >
                    <div>
                      {!item.is_read && (
                        <span
                          style={{
                            backgroundColor: "#0d6efd",
                            color: "#fff",
                            fontSize: "11px",
                            padding: "4px 10px",
                            borderRadius: "20px",
                            display: "inline-block",
                            marginBottom: "10px"
                          }}
                        >
                          NEW
                        </span>
                      )}

                      <div
                        style={{
                          fontWeight: "600"
                        }}
                      >
                        {item.message}
                      </div>
                    </div>

                    <div
                      style={{
                        fontSize: "13px",
                        color: "#777",
                        marginTop: "5px"
                      }}
                    >
                      {new Date(
                        item.created_at
                      ).toLocaleString()}
                    </div>
                  </div>

                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default AllNotifications;