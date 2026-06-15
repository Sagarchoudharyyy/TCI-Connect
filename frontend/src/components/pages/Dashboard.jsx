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
            <div className=" row g-0 dashboard-main">
                <Sidebar />
                <div className="col-md-9 main-content">
                    <div className="main-content-inner">
                        <div className="row g-5 h-100">
                            <div className="col-lg-12">
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
            </div>
        </div>
    );
}

export default Dashboard;