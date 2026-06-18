import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Header from "../Header";

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    fetchNotifications();

    const interval =
      setInterval(() => {
        fetchNotifications();
      }, 5000);

    return () =>
      clearInterval(interval);

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



  const markAsRead = async (id) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/notifications/${id}/read`
      );

      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="container-fluid">
      <div className="dashboard-main">
        <div className="row g-0">
          <Sidebar />

          <div className="offset-2 col-12 col-md-9 col-lg-9 offset-lg-3 col-xl-9 col-xxl-10 offset-xl-3 offset-xxl-2 main-content">
            <Header />

            <div
              className="container"
              style={{
                marginTop: "60px",
                marginLeft: "70px"

              }}
            >
              <h4>All Notifications</h4>

              <div className="mt-4">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="border-bottom p-3"
                    onClick={() => markAsRead(item.id)}

                    style={{
                      backgroundColor:
                        item.is_read
                          ? "#fff"
                          : "#e8f4ff",
                      maxWidth: "1020px",
                      cursor: "pointer",
                      transition: "0.2s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "0.9";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
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