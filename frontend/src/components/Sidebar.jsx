import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div
            style={{
                width: "250px",
                height: "100vh",
                background: "#fff",
                padding: "20px",
                borderRight: "1px solid #ddd",
            }}
        >
            <h2
                style={{
                    marginBottom: "40px",
                    color: "#1565c0",
                }}
            >
                TCI Online
            </h2>

            {/* DASHBOARD */}
            <div style={{ marginBottom: "20px" }}>
                <Link
                    to="/dashboard"
                    style={{
                        textDecoration: "none",
                        color: "#000",
                        fontSize: "18px",
                    }}
                >
                    Dashboard
                </Link>
            </div>

            {/* CHAT */}
            <div style={{ marginBottom: "20px" }}>
                <Link
                    to="/chat"
                    style={{
                        textDecoration: "none",
                        color: "#000",
                        fontSize: "18px",
                    }}
                >
                    Chat
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;