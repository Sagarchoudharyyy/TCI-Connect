import { useEffect, useState } from "react";
import axios from "axios";

import "../../styles/dashboard.css";
import "../../styles/sidebar.css";
import "../../styles/header.css";
import "../../styles/dashboardcard.css";

import Sidebar from "../Sidebar";
import Header from "../Header";
import DashboardCard from "../DashboardCard";
import OrdersTable from "../OrdersTable";

function Dashboard() {

    const [cases, setCases] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/cases"
            );

            setCases(response.data);

        } catch (error) {
            console.log("Dashboard Error:", error);
        }
    };

    return (
        <>
            <div className="container-fluid p-0">
                <div className="dashboard-main">
                    <div className="row g-0">
                        <>
                            {showSidebar && (
                                <div
                                    className="sidebar-overlay"
                                    onClick={() => setShowSidebar(false)}
                                />
                            )}

                            <Sidebar
                                showSidebar={showSidebar}
                            />
                        </>

                        <div className=" main-content">
                            <Header
                                title="Dashboard"
                                setShowSidebar={setShowSidebar}
                            />
                            <div className="main-c-inner">
                                <div className="row g-5">
                                    <DashboardCard
                                        cases={cases}
                                    />
                                </div>

                                <OrdersTable
                                    cases={cases}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;