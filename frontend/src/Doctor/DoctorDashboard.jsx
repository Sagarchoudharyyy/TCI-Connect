import DoctorSideBar from "../components/DoctorSideBar";
import DoctorHeader from "../components/DoctorHeader";
import "../DoctorStyle/doctor-dashboard.css";
import "../styles/tables.css";

import DoctorOrderTable from "./DoctorOrderTable/DoctorOrderTable";
import "../DoctorStyle/DoctorHeader.css";
import api from "../services/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DoctorDashboardCards from "./DoctorDashboardCard";

function DoctorDashboard() {
    const [cases, setCases] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const [totalPatients,
        setTotalPatients
    ] = useState(0);

    const fetchCases =
        async () => {

            try {

                const response = await api.get("/cases", {
                    params: {
                        page: 1,
                        limit: 10,
                    },
                });

                setCases(
                    response.data.items
                );

                setTotalPatients(
                    response.data.total
                );

            } catch (error) {

                console.log(error);
            }
        };

    useEffect(() => {

        fetchCases();

    }, []);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            return;
        }

        let user;

        try {
            user = JSON.parse(storedUser);
        } catch (error) {
            console.log("Invalid user data:", error);
            return;
        }

        const userId = user?.id;

        if (!userId) {
            console.log("Doctor user ID not found");
            return;
        }

        const apiUrl = import.meta.env.VITE_API_URL;

        if (!apiUrl) {
            console.log("VITE_API_URL is not configured");
            return;
        }

        let wsUrl;

        try {

            const parsedUrl = new URL(apiUrl);

            const wsProtocol =
                parsedUrl.protocol === "https:"
                    ? "wss:"
                    : "ws:";

            const basePath =
                parsedUrl.pathname.replace(
                    /\/api\/?$/,
                    ""
                );

            wsUrl =
                `${wsProtocol}//${parsedUrl.host}` +
                `${basePath}/ws/cases/${userId}`;

        } catch (error) {

            console.log("WebSocket URL error:", error);
            return;
        }

        let websocket;
        let reconnectTimer;
        let isUnmounted = false;

        const connectWebSocket = () => {

            if (isUnmounted) {
                return;
            }

            console.log(
                "DOCTOR DASHBOARD CASE WEBSOCKET CONNECTING..."
            );

            console.log(
                "DASHBOARD WEBSOCKET URL:",
                wsUrl
            );

            websocket = new WebSocket(wsUrl);

            websocket.onopen = () => {

                console.log(
                    "DOCTOR DASHBOARD CASE WEBSOCKET CONNECTED"
                );

            };

            websocket.onmessage = async (event) => {

                try {

                    const data = JSON.parse(
                        event.data
                    );

                    console.log(
                        "DOCTOR DASHBOARD CASE WEBSOCKET MESSAGE:",
                        data
                    );

                    if (
                        data.type ===
                        "new_case"
                    ) {

                        await fetchCases();

                    }

                    if (
                        data.type ===
                        "case_status_updated"
                    ) {

                        await fetchCases();

                    }

                    if (
                        data.type ===
                        "preview_uploaded"
                    ) {

                        await fetchCases();

                    }

                    if (
                        data.type ===
                        "preview_status_updated"
                    ) {

                        await fetchCases();

                    }

                } catch (error) {

                    console.log(
                        "DOCTOR DASHBOARD WEBSOCKET MESSAGE ERROR:",
                        error
                    );

                }

            };

            websocket.onerror = (error) => {

                console.log(
                    "DOCTOR DASHBOARD CASE WEBSOCKET ERROR:",
                    error
                );

            };

            websocket.onclose = () => {

                console.log(
                    "DOCTOR DASHBOARD CASE WEBSOCKET DISCONNECTED"
                );

                if (!isUnmounted) {

                    reconnectTimer =
                        setTimeout(() => {

                            connectWebSocket();

                        }, 3000);

                }

            };

        };

        connectWebSocket();

        return () => {

            isUnmounted = true;

            if (reconnectTimer) {

                clearTimeout(
                    reconnectTimer
                );

            }

            if (
                websocket &&
                websocket.readyState ===
                WebSocket.OPEN
            ) {

                websocket.close();

            }

        };

    }, []);

    return (

        <div className="doctor-dashboard-main">

            {showSidebar && (
                <div
                    className="doctor-sidebar-overlay"
                    onClick={() => setShowSidebar(false)}
                />
            )}

            <DoctorSideBar showSidebar={showSidebar} />

            <div className="doctor-main-content">

                <DoctorHeader
                    title="Dashboard"
                    setShowSidebar={setShowSidebar}
                />

                <div className="doctor-main-content-inner">

                    <DoctorDashboardCards
                        totalPatients={totalPatients}
                    />

                    <div className="doctor-table-container">

                        <DoctorOrderTable
                            cases={cases}
                            title="Latest Patient"
                            showSubmitButton={false}
                        />

                    </div>

                </div>

            </div>

        </div>

    );
}

export default DoctorDashboard;