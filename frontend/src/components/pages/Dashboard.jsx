import { useEffect, useRef, useState } from "react";
import api from "../../services/api";
import "../../styles/dashboard.css";
import "../../styles/sidebar.css";
import "../../styles/header.css";
import "../../styles/dashboardcard.css";

import Sidebar from "../Sidebar";
import Header from "../Header";
import DashboardCard from "../DashboardCard";
import OrdersTable from "../../components/OrderTable/OrdersTable";

function Dashboard() {

    const [cases, setCases] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);

    const websocketRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);
    const shouldReconnectRef = useRef(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {

            const response = await api.get(
                "/cases"
            );
            setCases(response.data.items);

        } catch (error) {
            console.log("Dashboard Error:", error);
        }
    };

    useEffect(() => {

        const connectWebSocket = () => {

            if (!shouldReconnectRef.current) {
                return;
            }

            if (
                websocketRef.current &&
                (
                    websocketRef.current.readyState === WebSocket.OPEN ||
                    websocketRef.current.readyState === WebSocket.CONNECTING
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

            const wsUrl =
                `${wsBaseUrl}/ws/admin/cases`;

            console.log(
                "Connecting Admin Dashboard Case WebSocket:",
                wsUrl
            );

            const ws = new WebSocket(wsUrl);

            websocketRef.current = ws;

            ws.onopen = () => {

                console.log(
                    "Admin Dashboard Case WebSocket connected"
                );

            };

            ws.onmessage = async (event) => {

                try {

                    const data =
                        JSON.parse(event.data);

                    console.log(
                        "Admin Dashboard Case WebSocket message:",
                        data
                    );

                    if (
                        data.type === "new_case" ||
                        data.type === "case_updated" ||
                        data.type === "case_status_updated" ||
                        data.type === "preview_status_updated" ||
                        data.type === "case_deleted"
                    ) {

                        await fetchDashboardData();

                    }

                } catch (error) {

                    console.log(
                        "Admin Dashboard WebSocket message error:",
                        error
                    );

                }

            };

            ws.onclose = () => {

                console.log(
                    "Admin Dashboard Case WebSocket disconnected"
                );

                websocketRef.current = null;

                if (!shouldReconnectRef.current) {
                    return;
                }

                reconnectTimeoutRef.current =
                    setTimeout(() => {
                        connectWebSocket();
                    }, 3000);

            };

            ws.onerror = (error) => {

                console.log(
                    "Admin Dashboard Case WebSocket error:",
                    error
                );

            };

        };

        connectWebSocket();

        return () => {

            shouldReconnectRef.current = false;

            if (reconnectTimeoutRef.current) {

                clearTimeout(
                    reconnectTimeoutRef.current
                );

            }

            if (websocketRef.current) {

                websocketRef.current.close();

                websocketRef.current = null;

            }

        };

    }, []);

    return (
        <>
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

                            <div className="row g-3">
                                <DashboardCard cases={cases} />
                            </div>

                            <OrdersTable cases={cases} />

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Dashboard;