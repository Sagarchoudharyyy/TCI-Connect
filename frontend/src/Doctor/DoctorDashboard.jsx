import DoctorSideBar from "../components/DoctorSideBar";
import DoctorHeader from "../components/DoctorHeader";
import "../DoctorStyle/doctor-dashboard.css";
import "../styles/tables.css";

import DoctorOrderTable from "./DoctorOrderTable/DoctorOrderTable";
import "../DoctorStyle/DoctorHeader.css";
import axios from "axios";
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

                const response =
                    await axios.get(
                        "http://localhost:8000/api/cases",
                        {
                            params: {
                                page: 1,
                                limit: 10
                            }
                        }
                    );

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
