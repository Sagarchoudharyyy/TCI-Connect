
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
    FaEye,
    FaDownload,
    FaUpload,
    FaTrash
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import heroImage from "../../assets/hero.png";
import "../../styles/tables.css";
import "../../styles/header.css";
import "../../styles/sidebar.css";
function RecentCases() {
    const [statusFilter, setStatusFilter] = useState("");
    const [deadlineFilter, setDeadlineFilter] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [cases, setCases] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCases();
    }, []);

    const fetchCases = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/cases"
            );

            setCases(response.data);
        } catch (error) {
            console.log(
                "Error fetching cases:",
                error
            );
        }
    };

    const filteredCases = cases.filter((item) => {

        const statusMatch =
            !statusFilter ||
            item.status === statusFilter;

        const deadlineMatch =
            !deadlineFilter ||
            item.delivery_deadline === deadlineFilter;

        return (
            statusMatch &&
            deadlineMatch
        );
    });

    const visibleCases =
        filteredCases.slice(
            0,
            entriesPerPage
        );
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            statusFilter,
            deadlineFilter
        });
    };
    const handleReset = () => {
        setStatusFilter("");
        setDeadlineFilter("");
    };


    const uploadFile = (id, file) => {
        console.log("Uploading file for case:", id, file);
    };


    const formatDate = (date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString();
    };

    const isDeadlinePassed = (date) => {
        return new Date(date) < new Date();
    };

    const fetchDashboardData = () => {
        console.log("Fetching dashboard data...");
    };


    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this case?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `http://127.0.0.1:8000/api/cases/${id}`
            );

            alert("Case deleted successfully");

            fetchCases();

        } catch (error) {

            console.log(error);

            alert("Delete failed");
        }
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


                        <div className="case-area p-4">
                            <div className="section-heading">
                                <h4 className="sub-heading">
                                    All Cases
                                </h4>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="row g-3 mb-3"
                            >
                                <div className="col-md-3">
                                    <label className="form-label">
                                        Status
                                    </label>

                                    <select
                                        value={statusFilter}
                                        onChange={(e) =>
                                            setStatusFilter(e.target.value)
                                        }
                                        className="form-control"
                                    >
                                        <option value="">
                                            All
                                        </option>

                                        <option value="Submitted">
                                            Submitted
                                        </option>

                                        <option value="InProduction">
                                            InProduction
                                        </option>

                                        <option value="QualityCheck">
                                            QualityCheck
                                        </option>

                                        <option value="Shipped">
                                            Shipped
                                        </option>

                                        <option value="Delivered">
                                            Delivered
                                        </option>
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label">
                                        Delivery Deadline
                                    </label>

                                    <input
                                        type="date"
                                        value={deadlineFilter}
                                        onChange={(e) =>
                                            setDeadlineFilter(e.target.value)
                                        }
                                        className="form-control"
                                    />
                                </div>

                                <div className="col-md-3 mt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary me-2 mt-3"
                                    >
                                        Apply
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="btn btn-secondary mt-3"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </form>

                            <div className="table-responsive">
                                <table className="table table-striped custom-table">
                                    <thead>
                                        <tr>
                                            <th>Profile</th>
                                            <th>Case Id</th>
                                            <th>Doctor Name</th>
                                            <th>Phone</th>
                                            <th>Patient Name</th>
                                            <th>Case Document</th>
                                            <th>Digital Files</th>
                                            <th>Delivery Deadline</th>
                                            <th>Preview Status</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {visibleCases.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <img
                                                        src={heroImage}
                                                        alt="profile"
                                                        width="40"
                                                    />
                                                </td>

                                                <td>{item.case_id}</td>
                                                <td>{item.doctor_name}</td>
                                                <td>{item.patient_phone}</td>
                                                <td>{item.patient_name}</td>

                                                <td>
                                                    {item.files?.length > 0 ? (
                                                        <>
                                                            <a
                                                                href={`http://127.0.0.1:8000/${item.files[0].file_path}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                <FaEye />
                                                            </a>

                                                            <a
                                                                href={`http://127.0.0.1:8000/${item.files[0].file_path}`}
                                                                download
                                                                className="ms-2"
                                                            >
                                                                <FaDownload />
                                                            </a>
                                                        </>
                                                    ) : (
                                                        <span>No File</span>
                                                    )}
                                                </td>

                                                <td>
                                                    {item.files?.length > 0 ? (
                                                        item.files.map(
                                                            (file, index) => (
                                                                <div key={index}>
                                                                    <a
                                                                        href={`http://127.0.0.1:8000/${file.file_path}`}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                    >
                                                                        File {index + 1}
                                                                    </a>
                                                                </div>
                                                            )
                                                        )
                                                    ) : (
                                                        <span>No File</span>
                                                    )}
                                                </td>

                                                <td>
                                                    {item.delivery_deadline}
                                                </td>

                                                <td>
                                                    {item.preview_status}
                                                </td>

                                                <td>{item.status}</td>

                                                <td>
                                                    <button
                                                        className="btn btn-link p-0 me-2"
                                                        onClick={() =>
                                                            navigate(
                                                                `/view-case/${item.id}`
                                                            )
                                                        }
                                                    >
                                                        <FaEye />
                                                    </button>

                                                    <button
                                                        className="btn btn-link p-0 me-2"
                                                        onClick={() =>
                                                            navigate(
                                                                `/upload-preview/${item.id}`
                                                            )
                                                        }
                                                    >
                                                        <FaUpload />
                                                    </button>

                                                    <button
                                                        className="btn btn-link p-0"
                                                        onClick={() =>
                                                            handleDelete(item.id)
                                                        }
                                                    >
                                                        <FaTrash color="red" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div></div>
    );
};
export default RecentCases;