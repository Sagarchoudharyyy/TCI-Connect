
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../Sidebar";
import Header from "../Header";
import DashboardCard from "../DashboardCard";
import OrdersTable from "../OrdersTable";
import "../../styles/sidebar.css";
import "../../styles/header.css";
import "../../styles/tables.css";
import "../../styles/dashboardcard.css";
import { FaEdit, FaTrash, FaEye, FaDownload, FaUpload } from "react-icons/fa";

function Dashboard() {
    console.log("Dashboard Rendered");
    const [cases, setCases] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [deadlineFilter, setDeadlineFilter] = useState("");
    const [doctorCount, setDoctorCount] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {

            console.log("API Called");

            const response = await axios.get(
                "http://127.0.0.1:8000/api/cases"
            );

            setCases(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const filteredCases = cases.filter((item) => {
        const matchesSearch =
            String(item.case_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.doctor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "" || item.status === statusFilter;
        const matchesDeadline = deadlineFilter === "" || item.delivery_deadline === deadlineFilter;

        return matchesSearch && matchesStatus && matchesDeadline;
    });

    const visibleCases = filteredCases.slice(0, entriesPerPage);

    const uploadFile = async (caseId, file) => {
        const formData = new FormData();
        formData.append("file", file);
        try {
            await axios.post(`http://127.0.0.1:8000/api/cases/${caseId}/upload`, formData);
            alert("File uploaded successfully");
            fetchDashboardData();
        } catch (error) {
            console.log("Upload error", error);
        }
    };

    const isDeadlinePassed = (deadline) => {
        if (!deadline) return false;
        return new Date(deadline) < new Date();
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    };

    return (
        <div className="container-fluid">
            <div className="dashboard-main">
                <div className="row g-0">

                    <Sidebar />

                    <div className="offset-2 col-12 col-md-9 col-lg-9 
                    offset-lg-3 col-xl-9 col-xxl-10 offset-xl-3 offset-xxl-2 
                    main-content">

                        <Header title="Dashboard" />
                        <DashboardCard
                            cases={cases}
                        />

                        <OrdersTable />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
