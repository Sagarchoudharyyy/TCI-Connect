import { useEffect, useState } from "react";
import axios from "axios";

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

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/cases"
            );

            setCases(response.data.items);

        } catch (error) {
            console.log("Dashboard Error:", error);
        }
    };

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

                            <div className="row g-0">
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