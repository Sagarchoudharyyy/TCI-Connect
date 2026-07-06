import { Link } from "react-router-dom";
import {
    useState,
    useEffect,
    useRef
} from "react";
import axios from "axios";
import "../DoctorStyle/DoctorHeader.css";
import { FaBars } from "react-icons/fa";

function DoctorHeader({ title = "Dashboard", setShowSidebar }) {
    const [notifications, setNotifications] = useState([]);
    const notificationRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const fetchNotifications = async () => {
        try {
            const user = JSON.parse(
                localStorage.getItem("user")
            );
            if (!user) return;
            const response = await axios.get(
                `http://127.0.0.1:8000/api/client/notifications/${user.id}`
            );

            setNotifications(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
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
    const markAsRead = async (id) => {
        try {

            await axios.put(
                `http://127.0.0.1:8000/api/notifications/${id}/read`
            );

            setNotifications((prev) =>
                prev.filter((item) => item.id !== id)
            );
        } catch (error) {
            console.log(error);
        }
    };

    const unreadCount = notifications.filter(
        (item) => !item.is_read
    ).length;

    const user = JSON.parse(
        localStorage.getItem("user")
    );
    return (
        <div className="mc-ibxx">
            <div className="doctor-header" >
                <div className="d-flex align-items-center min-w-0">
                    {setShowSidebar && (
                        <div
                            className="doctor-mobile-menu me-3"
                            onClick={() => setShowSidebar((prev) => !prev)}
                        >
                            <FaBars size={22} />
                        </div>
                    )}
                    <h2>{title}</h2>
                </div>
                <div className="header-right">
                    <div
                        ref={notificationRef}
                        className="notification-wrapper position-relative">
                        <div
                            id="clientNotifToggle"
                            style={{
                                cursor: "pointer",
                                width: "48px",
                                height: "48px",
                                border: "1px solid #e5e5e5",
                                borderRadius: "12px",
                                background: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative"
                            }}
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.02 20.53C9.68999 20.53 7.35999 20.16 5.14999 19.42C4.30999 19.13 3.66999 18.54 3.38999 17.77C3.09999 17 3.19999 16.15 3.65999 15.39L4.80999 13.48C5.04999 13.08 5.26999 12.28 5.26999 11.81V8.92C5.26999 5.2 8.29999 2.17 12.02 2.17C15.74 2.17 18.77 5.2 18.77 8.92V11.81C18.77 12.27 18.99 13.08 19.23 13.49L20.37 15.39C20.8 16.11 20.88 16.98 20.59 17.77C20.3 18.56 19.67 19.16 18.88 19.42C16.68 20.16 14.35 20.53 12.02 20.53ZM12.02 3.67C9.12999 3.67 6.76999 6.02 6.76999 8.92V11.81C6.76999 12.54 6.46999 13.62 6.09999 14.25L4.94999 16.16C4.72999 16.53 4.66999 16.92 4.79999 17.25C4.91999 17.59 5.21999 17.85 5.62999 17.99C9.80999 19.39 14.24 19.39 18.42 17.99C18.78 17.87 19.06 17.6 19.19 17.24C19.32 16.88 19.29 16.49 19.09 16.16L17.94 14.25C17.56 13.6 17.27 12.53 17.27 11.8V8.92C17.27 6.02 14.92 3.67 12.02 3.67Z" fill="#666666"></path>
                                <path d="M13.88 3.94C13.81 3.94 13.74 3.93 13.67 3.91C13.38 3.83 13.1 3.77 12.83 3.73C11.98 3.62 11.16 3.68 10.39 3.91C10.11 4 9.80999 3.91 9.61999 3.7C9.42999 3.49 9.36999 3.19 9.47999 2.92C9.88999 1.87 10.89 1.18 12.03 1.18C13.17 1.18 14.17 1.86 14.58 2.92C14.68 3.19 14.63 3.49 14.44 3.7C14.29 3.86 14.08 3.94 13.88 3.94Z" fill="#666666"></path>
                                <path d="M12.02 22.81C11.03 22.81 10.07 22.41 9.37002 21.71C8.67002 21.01 8.27002 20.05 8.27002 19.06H9.77002C9.77002 19.65 10.01 20.23 10.43 20.65C10.85 21.07 11.43 21.31 12.02 21.31C13.26 21.31 14.27 20.3 14.27 19.06H15.77C15.77 21.13 14.09 22.81 12.02 22.81Z" fill="#666666"></path>
                            </svg>
                            {unreadCount > 0 && (
                                <span
                                    id="clientNotifCount"
                                    style={{
                                        position: "absolute",
                                        top: "-8px",
                                        right: "-8px",
                                        background: "#ff0000",
                                        color: "#fff",
                                        minWidth: "20px",
                                        height: "20px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "50%",
                                        fontSize: "11px",
                                        fontWeight: "600"
                                    }}
                                >
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <div
                            id="clientNotifDropdown"
                            style={{
                                display: showDropdown ? "block" : "none",
                                position: "absolute",
                                right: 0,
                                top: "40px",
                                width: "420px",
                                maxHeight: "420px",
                                overflow: "auto",
                                background: "#fff",
                                zIndex: 9999,
                                borderRadius: "6px",
                                boxShadow: "0 4px 12px rgba(0,0,0,.15)",
                            }}
                        >
                            <div className="p-2 border-bottom">

                                <strong>Notifications</strong>
                            </div>

                            <div id="clientNotifList">
                                {notifications.length > 0 ? (
                                    notifications.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-2 border-bottom"
                                            onClick={() => markAsRead(item.id)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <strong>{item.message}</strong>

                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    color: "#777"
                                                }}
                                            >
                                                {item.created_at}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-3 text-center">
                                        No notifications found
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="dropdown">

                        <a
                            href="#"
                            className=" d-flex align-items-center text-decoration-none dropdown-toggle"
                            id="profileDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            onClick={(e) => e.preventDefault()}
 
                        >
                            <img
                                src="https://mediumseagreen-herring-541085.hostingersite.com/uploads/profile/1763620087_489949f1a5c1780dbb22.jpg"
                                alt="Profile"
                                className="rounded-circle me-2"
                                width="40"
                                height="40"
                            />

                            <span className="fw-bold text-primary">
                                {user?.full_name}
                            </span>
                        </a>

                        <ul
                            className="dropdown-menu dropdown-menu-end shadow"
                            aria-labelledby="profileDropdown"
                        >
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="/client/setting"
                                >
                                    <i className="bi bi-person-circle me-2"></i>
                                    Profile / Account Settings
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="/change-password"
                                >
                                    <i className="bi bi-lock-fill me-2"></i>
                                    Change Password
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="/client/help-faq"
                                >
                                    <i className="bi bi-question-circle-fill me-2"></i>
                                    Help / FAQ
                                </Link>
                            </li>

                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            <li>
                                <Link
                                    className="dropdown-item text-danger"
                                    to="/login"
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default DoctorHeader;
