import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/header.css";
import { FaBars } from "react-icons/fa";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const notificationRef =
    useRef(null);

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside =
      (event) => {
        if (
          notificationRef.current &&
          !notificationRef.current.contains(
            event.target
          )
        ) {
          setShowDropdown(false);
        }
      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);
  const fetchNotifications = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );
      console.log("Logged in user:", user);
      console.log("User ID:", user.id);


      let url = "";

      if (user?.role === "admin") {
        url = "http://127.0.0.1:8000/api/admin/notifications";
      } else {
        url = `http://127.0.0.1:8000/api/client/notifications/${user.id}`;
      }
      const response = await axios.get(url);
      console.log("API URL:", url);
      console.log("Notifications:", response.data);

      setNotifications(response.data);
    } catch (error) {
      console.log(
        "Notification Error:",
        error
      );
    }
  };

  const markAllRead = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/notifications/read-all/${user.id}`
      );
      setNotifications([]);

      setShowDropdown(false);
    } catch (error) {
      console.log(error);
    }
  };

  const unreadCount =
    notifications.filter(
      (item) => !item.is_read
    ).length;
  const handleBellClick = async () => {
    console.log("Bell clicked");

    await fetchNotifications();

    setShowDropdown((prev) => !prev);
  };
  const handleNotificationClick = async (item) => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/notifications/${item.id}/read`
      );

      // Refresh notifications after marking read
      await fetchNotifications();

      setShowDropdown(false);

      console.log(item);
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
        navigate("/chat");
        return;
      }

      // Case notifications
      if (
        user.role === "admin" &&
        item.case_id
      ) {
        navigate(
          `/admin/view-case/${item.case_id}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      ref={notificationRef}
      className="notification-wrapper position-relative"
    >
      <div id="notifToggle" className="notification-icon"
        style={{
          position: "relative",
          cursor: "pointer"
        }}
        onClick={
          handleBellClick
        }
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.02 20.53C9.68999 20.53 7.35999 20.16 5.14999 19.42C4.30999 19.13 3.66999 18.54 3.38999 17.77C3.09999 17 3.19999 16.15 3.65999 15.39L4.80999 13.48C5.04999 13.08 5.26999 12.28 5.26999 11.81V8.92C5.26999 5.2 8.29999 2.17 12.02 2.17C15.74 2.17 18.77 5.2 18.77 8.92V11.81C18.77 12.27 18.99 13.08 19.23 13.49L20.37 15.39C20.8 16.11 20.88 16.98 20.59 17.77C20.3 18.56 19.67 19.16 18.88 19.42C16.68 20.16 14.35 20.53 12.02 20.53Z"
            fill="#666666"
          />
          <path
            d="M13.88 3.94C13.81 3.94 13.74 3.93 13.67 3.91C13.38 3.83 13.1 3.77 12.83 3.73C11.98 3.62 11.16 3.68 10.39 3.91C10.11 4 9.80999 3.91 9.61999 3.7C9.42999 3.49 9.36999 3.19 9.47999 2.92C9.88999 1.87 10.89 1.18 12.03 1.18C13.17 1.18 14.17 1.86 14.58 2.92C14.68 3.19 14.63 3.49 14.44 3.7C14.29 3.86 14.08 3.94 13.88 3.94Z"
            fill="#666666"
          />
          <path
            d="M12.02 22.81C11.03 22.81 10.07 22.41 9.37002 21.71C8.67002 21.01 8.27002 20.05 8.27002 19.06H9.77002C9.77002 19.65 10.01 20.23 10.43 20.65C10.85 21.07 11.43 21.31 12.02 21.31C13.26 21.31 14.27 20.3 14.27 19.06H15.77C15.77 21.13 14.09 22.81 12.02 22.81Z"
            fill="#666666"
          />
        </svg>

        {unreadCount >
          0 && (
            <span
              id="notifCount"
              className="notif-badge position-absolute"
              style={{
                top: "-6px",
                right: "-6px",
                display: "inline-block",
                background: "rgb(217, 83, 79)",
                color: "#fff",
                padding: "2px 6px",
                borderRadius: "12px",
                fontSize: "12px"
              }}
            >
              {
                unreadCount
              }
            </span>
          )}
      </div>

      {
        showDropdown && (
          <div
            id="notifDropdownBox"
            className="notif-dropdown shadow"
          >
            <div className="p-2 border-bottom">
              <div className="d-flex justify-content-between align-items-center">
                <strong>Notifications</strong>
                <button
                  id="markAllReadBtn"
                  type="button"
                  className="btn btn-sm btn-link"
                  onClick={() => {
                    const confirmed =
                      window.confirm(
                        "Mark all notifications as read?"
                      );

                    if (
                      confirmed
                    ) {
                      markAllRead();
                    }
                  }}
                >
                  Mark all read
                </button>
              </div>
            </div>

            <div id="notifList" style={{
              minHeight: "360px",
              overflowY: "auto",

            }}>
              {notifications.length > 0 ? (

                notifications.map((item) => (
                  <div
                    key={item.id}
                    className="notif-item"
                    style={{
                      cursor: item.case_id
                        ? "pointer"
                        : "default"
                    }}
                    onClick={() =>
                      handleNotificationClick(item)
                    }
                  >
                    <div className="title p-2 border-bottom" style={{ fontWeight: "600" }}>

                      {!item.is_read && (
                        <span
                          style={{
                            background: "#0d6efd",
                            color: "white",
                            fontSize: "10px",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            marginRight: "8px"
                          }}
                        >
                          NEW
                        </span>
                      )}
                      {item.message}
                      <div
                        style={{
                          color: "#777",
                          fontSize: "14px",
                          marginTop: "5px"
                        }}
                      >
                        {item.created_at}
                      </div>
                    </div>
                  </div>
                ))
              ) : (

                <div className="text-center p-3">
                  No notifications found
                </div>

              )}
              <div className="p-2 border-top text-center">
                <Link
                  to="/notifications/all"
                  className="small"
                  style={{
                    textDecoration: "none"
                  }}
                >
                  View all
                </Link>
              </div>
            </div>
          </div>
        )
      }
    </div >
  )
}
export default Notification;


