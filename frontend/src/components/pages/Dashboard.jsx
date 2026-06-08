import { useEffect, useState } from "react";
import axios from "axios";

import "../../styles/dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/sidebar.css";
import "../../styles/header.css";

import "../../styles/dashboardcard.css";

import Sidebar from "../Sidebar";
import Header from "../Header";
import DashboardCard from "../DashboardCard";
import OrdersTable from "../OrdersTable";

function Dashboard() {

    const [cases, setCases] = useState([]);

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
        <div className="container-fluid">
            <div className="dashboard-main">
                <div className="row g-0">

                    <Sidebar />

                    <div
                        className="
                        offset-2
                        col-12
                        col-md-9
                        col-lg-9
                        offset-lg-3
                        col-xl-9
                        col-xxl-10
                        offset-xl-3
                        offset-xxl-2
                        main-content
                    "
                    >

                        <Header title="Dashboard" />

                        <DashboardCard
                            cases={cases}
                        />

                        <OrdersTable
                            cases={cases}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;