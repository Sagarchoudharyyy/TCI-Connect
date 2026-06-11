import DoctorSideBar from "../components/DoctorSideBar";
import DoctorHeader from "../components/DoctorHeader";
import "../DoctorStyle/doctor-dashboard.css";
import { FaFileAlt } from "react-icons/fa";
import "../styles/tables.css";
import OrdersTable from "../components/OrdersTable";
import DoctorOrderTable from "../components/DoctorOrderTable";
import "../DoctorStyle/DoctorHeader.css";
import axios from "axios";
import { useState, useEffect } from "react";

function DoctorDashboard() {
    const [cases, setCases] = useState([]);
    const [totalPatients,
        setTotalPatients
    ] = useState(0);

    const fetchCases =
        async () => {

            try {

                const response =
                    await axios.get("http://localhost:8000/api/cases");

                const cases =
                    response.data;

                setCases(cases);
                setTotalPatients(
                    cases.length
                );

            } catch (error) {

                console.log(error);
            }
        };

    useEffect(() => {

        fetchCases();

    }, []);
    return (
        <div className="container-fluid p-0">
            <div className="row g-0 doctor-dashboard-main">
                <DoctorSideBar />
                <div className="col-md-9 doctor-main-content">
                    <div className="doctor-main-content-inner">
                        <div className="row g-5 h-100">
                            <div className="col-lg-12">
                                <DoctorHeader title="Dashboard" />
                                <div className="mm-cards mt-4 p-4">
                                    <div className="row stats_Cards">
                                        <div className="col-md-6">
                                            <div className="stat-card">
                                                <div className="d-flex  w-100 ">
                                                    <div>
                                                        <div className="stat-icon bg-light-blue">
                                                            <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15.6899 3.75545C16.8921 4.5092 17.735 5.7847 17.8885 7.26527C18.3926 7.50241 18.9427 7.6256 19.4998 7.62608C21.606 7.62608 23.313 5.91903 23.313 3.8132C23.313 1.70705 21.606 0 19.4998 0C17.4138 0.000648945 15.7217 1.6772 15.6899 3.75545ZM13.1918 11.5629C15.2979 11.5629 17.005 9.85553 17.005 7.74971C17.005 5.64388 15.2976 3.93683 13.1918 3.93683C11.0859 3.93683 9.37791 5.6442 9.37791 7.75003C9.37791 9.85586 11.0859 11.5629 13.1918 11.5629ZM14.8093 11.8228H11.5736C8.88147 11.8228 6.69128 14.0133 6.69128 16.7055V20.6624L6.70134 20.7244L6.97389 20.8097C9.54307 21.6125 11.7751 21.8802 13.6123 21.8802C17.2006 21.8802 19.2805 20.8571 19.4087 20.7919L19.6634 20.6631H19.6906V16.7055C19.6916 14.0133 17.5014 11.8228 14.8093 11.8228ZM21.118 7.88631H17.9073C17.8747 9.12604 17.3534 10.3026 16.4569 11.1596C18.8499 11.8712 20.6008 14.0902 20.6008 16.7113V17.9307C23.7709 17.8145 25.5977 16.9161 25.718 16.8557L25.9727 16.7266H26V12.7683C26 10.0765 23.8098 7.88631 21.118 7.88631ZM6.50081 7.62673C7.24677 7.62673 7.94082 7.40901 8.52877 7.03814C8.71325 5.84488 9.34809 4.76772 10.3027 4.02833C10.3066 3.95695 10.3134 3.88621 10.3134 3.81418C10.3134 1.70802 8.60599 0.000973348 6.50081 0.000973348C4.39433 0.000973348 2.68761 1.70802 2.68761 3.81418C2.68761 5.91936 4.39433 7.62673 6.50081 7.62673ZM9.9253 11.1596C9.03384 10.3067 8.51329 9.13764 8.47588 7.90448C8.3568 7.89572 8.23901 7.88631 8.11766 7.88631H4.88234C2.19019 7.88631 0 10.0765 0 12.7683V16.7259L0.0100587 16.7869L0.282616 16.8729C2.34367 17.5163 4.1831 17.8129 5.78081 17.9064V16.7113C5.78146 14.0902 7.53166 11.8718 9.9253 11.1596Z" fill="#00A987"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="text-start ms-2">
                                                        <small className="text-muted">Total Patient</small>
                                                        <div className="statcard-btm">
                                                            <h3 className="mb-0">{totalPatients}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <a href="https://mediumseagreen-herring-541085.hostingersite.com/client/submit-case" className="text-decoration-none w-100">
                                                <div className="stat-card">
                                                    <div className="d-flex w-100">
                                                        <div className="stat-icon bg-light-blue">
                                                            <FaFileAlt className="text-primary fs-4" />
                                                        </div>

                                                        <div className="text-start ms-3">
                                                            <h5 className="mb-0 text-dark">Submit a Case</h5>
                                                            <small className="text-muted">Create a new request</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <DoctorOrderTable
                                        cases={cases}
                                        title="Latest Patient"
                                        showSubmitButton={false}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DoctorDashboard;