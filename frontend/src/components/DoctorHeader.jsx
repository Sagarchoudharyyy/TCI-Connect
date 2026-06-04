import { Link } from "react-router-dom";

function DoctorHeader({ title = "Dashboard" }) {
    return (
        <div className="col-md-9 main-content">
            <div className="mani-content-inner">
                <div className="row g-0 h-100">
                    <div className="col-lg-12">

                        <div className="header d-flex justify-content-between align-items-center">
                            <h2>{title}</h2>

                            {/* Right Side */}
                            <div className="d-flex align-items-center gap-3">

                                {/* Notification Icon */}
                                <button className="btn border rounded-circle">
                                    <i className="bi bi-bell"></i>
                                </button>

                                {/* Profile Dropdown */}
                                <div className="dropdown">

                                    <a
                                        href="/#"
                                        className="d-flex align-items-center text-decoration-none dropdown-toggle"
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
                                            Nikhil Patidar
                                        </span>
                                    </a>

                                    <ul
                                        className="dropdown-menu dropdown-menu-end shadow"
                                        aria-labelledby="profileDropdown"
                                    >
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="/doctor/setting"
                                            >
                                                <i className="bi bi-person-circle me-2"></i>
                                                Profile / Account Settings
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="/doctor/change-password"
                                            >
                                                <i className="bi bi-lock-fill me-2"></i>
                                                Change Password
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="/doctor/help-faq"
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
                </div>
            </div>
        </div>
    );
}

export default DoctorHeader;