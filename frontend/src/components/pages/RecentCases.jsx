
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
    FaEye,
    FaDownload,
    FaUpload,
    FaTrash
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import heroImage from "../../assets/hero.png";
import "../../styles/tables.css";
import "../../styles/header.css";
import "../../styles/sidebar.css";
import OrdersTable from "../OrdersTable";
function RecentCases() {
    const [statusFilter, setStatusFilter] = useState("");
    const [deadlineFilter, setDeadlineFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [cases, setCases] = useState([]);
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);


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
    const totalEntries = filteredCases.length;

    const startEntry =
        totalEntries === 0
            ? 0
            : (currentPage - 1) * entriesPerPage + 1;

    const endEntry = Math.min(
        currentPage * entriesPerPage,
        totalEntries
    );
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

                                    <div className="case-area">
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
                                            <div id="data-table_wrapper" className="dt-container dt-bootstrap5 dt-empty-footer">
                                                <div className=" row mt-2 justify-content-between">
                                                    <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <select
                                                                value={entriesPerPage}
                                                                style={{ width: "90px" }}
                                                                onChange={(e) =>
                                                                    setEntriesPerPage(Number(e.target.value))
                                                                }
                                                                className="form-select"
                                                            >
                                                                <option value="5">5</option>
                                                                <option value="10">10</option>
                                                                <option value="20">20</option>
                                                            </select>
                                                            <label htmlFor="dt-length-0"> entries per page</label>
                                                        </div>
                                                    </div>
                                                    <div className="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <label htmlFor="dt-search-0">Search:</label>
                                                            <input
                                                                type="search"
                                                                className="form-control form-control-sm"
                                                                id="dt-search-0"
                                                                placeholder=""
                                                                value={searchTerm}
                                                                onChange={(e) =>
                                                                    setSearchTerm(
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-2 justify-content-between dt-layout-table">
                                                    <div className="d-md-flex justify-content-between align-items-center col-12 dt-layout-full col-md " style={{ width: "100%" }}>
                                                        <table id="data-table" className="table table-striped custom-table dataTable">
                                                            <colgroup>
                                                                <col data-dt-column="0" style={{ width: "94px" }} />
                                                                <col data-dt-column="1" style={{ width: "73.0972px" }} />
                                                                <col data-dt-column="2" style={{ width: "100.944px" }} />
                                                                <col data-dt-column="3" style={{ width: "110.694px" }} />
                                                                <col data-dt-column="4" style={{ width: "102.306px" }} />
                                                                <col data-dt-column="5" style={{ width: "118.389px" }} />
                                                                <col data-dt-column="6" style={{ width: "150.847px" }} />
                                                                <col data-dt-column="7" style={{ width: "125.639px" }} />
                                                                <col data-dt-column="8" style={{ width: "189.347px" }} />
                                                                <col data-dt-column="9" style={{ width: "136px" }} />
                                                                <col data-dt-column="10" style={{ width: "93.3194px" }} />
                                                            </colgroup>
                                                            <thead>
                                                                <tr>
                                                                    <th data-dt-column="0" className="dt-orderable-none" rowSpan="1" colSpan="1">
                                                                        <div className="dt-column-header">
                                                                            <span className="dt-column-title">
                                                                                Profile
                                                                            </span>
                                                                        </div>
                                                                    </th>

                                                                    <th data-dt-column="1" className="dt-orderable-none dt-type-numeric" rowSpan="1" colSpan="1">
                                                                        <div className="dt-column-header">
                                                                            <span className="dt-column-title">
                                                                                Case Id
                                                                            </span>
                                                                        </div>
                                                                    </th>

                                                                    <th data-dt-column="2" className="dt-orderable-none" rowSpan="1" colSpan="1">
                                                                        <div className="dt-column-header">
                                                                            <span className="dt-column-title">
                                                                                Doctor Name
                                                                            </span>
                                                                        </div>
                                                                    </th>

                                                                    <th data-dt-column="3" className="dt-orderable-none dt-type-numeric" rowSpan="1" colSpan="1">
                                                                        <div className="dt-column-header">
                                                                            <span className="dt-column-title">
                                                                                Phone
                                                                            </span>
                                                                        </div>
                                                                    </th>

                                                                    <th data-dt-column="4" className="dt-orderable-none" rowSpan="1" colSpan="1">
                                                                        <div className="dt-column-header">
                                                                            <span className="dt-column-title">
                                                                                Patient Name
                                                                            </span>
                                                                        </div>
                                                                    </th>

                                                                    <th data-dt-column="5" className="dt-orderable-none" rowSpan="1" colSpan="1">
                                                                        <div className="dt-column-header">
                                                                            <span className="dt-column-title">
                                                                                Case Document
                                                                            </span>
                                                                        </div>
                                                                    </th>

                                                                    <th data-dt-column="6" className="dt-orderable-none" rowSpan="1" colSpan="1">
                                                                        <div className="dt-column-header">
                                                                            <span className="dt-column-title">
                                                                                Digital Files
                                                                            </span>
                                                                        </div>
                                                                    </th>

                                                                    <th data-dt-column="7" className="dt-orderable-none" rowSpan="1" colSpan="1">
                                                                        <div className="dt-column-header">
                                                                            <span className="dt-column-title">
                                                                                Delivery Deadline
                                                                            </span>
                                                                        </div>
                                                                    </th>

                                                                    <th data-dt-column="8" className="dt-orderable-none" rowSpan="1" colSpan="1">
                                                                        <div className="dt-column-header">
                                                                            <span className="dt-column-title">
                                                                                Preview Status
                                                                            </span>
                                                                        </div>
                                                                    </th>

                                                                    <th data-dt-column="9" className="dt-orderable-none" rowSpan="1" colSpan="1">
                                                                        <div className="dt-column-header">
                                                                            <span className="dt-column-title">
                                                                                Status
                                                                            </span>
                                                                        </div>
                                                                    </th>

                                                                    <th data-dt-column="10" className="dt-orderable-none" rowSpan="1" colSpan="1">
                                                                        <div className="dt-column-header">
                                                                            <span className="dt-column-title">
                                                                                Action
                                                                            </span>
                                                                        </div>
                                                                    </th>
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
                                                                        <td>{item.id}</td>

                                                                        <td>{item.doctor_name}</td>

                                                                        <td>{item.doctor_phone}</td>

                                                                        <td>{item.patient_name}</td>

                                                                        <td>
                                                                            {item.files?.length > 0 ? (
                                                                                <>
                                                                                    <Link
                                                                                        to={`http://127.0.0.1:8000/api/${item.files[0].file_path}`}
                                                                                        target="_blank"
                                                                                        rel="noreferrer"
                                                                                        style={{
                                                                                            color: "#0152a8",
                                                                                            marginRight: "12px",
                                                                                            textDecoration: "none"
                                                                                        }}
                                                                                    >
                                                                                        <FaEye />
                                                                                    </Link>

                                                                                    <Link
                                                                                        to={`http://127.0.0.1:8000/api/${item.files[0].file_path}`}
                                                                                        download
                                                                                        style={{
                                                                                            color: "#0152a8",
                                                                                            textDecoration: "none"
                                                                                        }}
                                                                                    >
                                                                                        <FaDownload />
                                                                                    </Link>
                                                                                </>
                                                                            ) : (
                                                                                <span>No File</span>
                                                                            )}
                                                                        </td>

                                                                        <td>
                                                                            {item.files?.length > 0 ? (
                                                                                item.files.map((file, index) => (
                                                                                    <div key={index}>
                                                                                        <Link
                                                                                            to={`http://127.0.0.1:8000/api/${file.file_path}`}
                                                                                            target="_blank"
                                                                                            rel="noreferrer"
                                                                                            style={{
                                                                                                textDecoration: "none",
                                                                                                marginRight: "12px",
                                                                                                color: "#0152a8"
                                                                                            }}
                                                                                        >
                                                                                            Preview File {index + 1}

                                                                                            {file.file_path?.endsWith(".png")
                                                                                                ? " (PNG)"
                                                                                                : file.file_path?.endsWith(".stl")
                                                                                                    ? " (STL)"
                                                                                                    : file.file_path?.endsWith(".jpg") ||
                                                                                                        file.file_path?.endsWith(".jpeg")
                                                                                                        ? " (JPG)"
                                                                                                        : ""}
                                                                                        </Link>

                                                                                        <Link
                                                                                            to={`http://127.0.0.1:8000/api/${file.file_path}`}
                                                                                            download
                                                                                            style={{
                                                                                                color: "#0152a8"
                                                                                            }}
                                                                                        >
                                                                                            <FaDownload />
                                                                                        </Link>
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                <span>No file available</span>
                                                                            )}
                                                                        </td>
                                                                        <td>
                                                                            {item.delivery_deadline ? (() => {

                                                                                const today = new Date();
                                                                                const deadline =
                                                                                    new Date(item.delivery_deadline);


                                                                                today.setHours(0, 0, 0, 0);
                                                                                deadline.setHours(0, 0, 0, 0);

                                                                                const diffTime =
                                                                                    deadline - today;

                                                                                const daysLeft =
                                                                                    Math.ceil(
                                                                                        diffTime /
                                                                                        (1000 * 60 * 60 * 24)
                                                                                    );

                                                                                const isPassed =
                                                                                    deadline < today;

                                                                                return (
                                                                                    <>
                                                                                        <div>
                                                                                            {deadline.toLocaleDateString(
                                                                                                "en-GB",
                                                                                                {
                                                                                                    day: "2-digit",
                                                                                                    month: "short",
                                                                                                    year: "numeric"
                                                                                                }
                                                                                            )}
                                                                                        </div>

                                                                                        <div
                                                                                            style={{
                                                                                                color: isPassed
                                                                                                    ? "red"
                                                                                                    : "#0152a8",
                                                                                                fontWeight: "600"
                                                                                            }}
                                                                                        >
                                                                                            {isPassed
                                                                                                ? "(Deadline passed)"
                                                                                                : `(${daysLeft} day${daysLeft > 1
                                                                                                    ? "s"
                                                                                                    : ""
                                                                                                } left)`
                                                                                            }
                                                                                        </div>
                                                                                    </>
                                                                                );
                                                                            })() : (
                                                                                <span>No deadline</span>
                                                                            )}
                                                                        </td>


                                                                        <td>
                                                                            <div
                                                                                style={{
                                                                                    fontWeight: "600",
                                                                                    color: "#0152a8"
                                                                                }}
                                                                            >
                                                                                {item.preview_status ===
                                                                                    "Preview Requested"
                                                                                    ? "Preview Requested"
                                                                                    : "No Preview Requested"}
                                                                            </div>

                                                                            {item.preview_status ===
                                                                                "Preview Requested" && (
                                                                                    <div
                                                                                        style={{
                                                                                            color: "#0152a8",
                                                                                            fontWeight: "600",
                                                                                            cursor: "pointer"
                                                                                        }}
                                                                                        onClick={() =>
                                                                                            navigate(
                                                                                                `/admin/upload-preview/${item.id}`
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        (Upload Now)
                                                                                    </div>
                                                                                )}

                                                                            <small
                                                                                style={{
                                                                                    color: "#6c757d"
                                                                                }}
                                                                            >
                                                                                No preview files uploaded.
                                                                            </small>
                                                                        </td>
                                                                        <td>
                                                                            <select
                                                                                value={item.status}
                                                                                onChange={(e) =>
                                                                                    handleStatusChange(
                                                                                        item.id,
                                                                                        e.target.value
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    border: "none",
                                                                                    background: "transparent",
                                                                                    color: "#0152a8",
                                                                                    fontWeight: "600",
                                                                                    cursor: "pointer",
                                                                                    outline: "none",
                                                                                    appearance: "none",
                                                                                    WebkitAppearance: "none",
                                                                                    MozAppearance: "none",
                                                                                    paddingRight: "20px"
                                                                                }}
                                                                            >
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

                                                                            <span
                                                                                style={{
                                                                                    marginLeft: "-15px",
                                                                                    color: "#0152a8",
                                                                                    pointerEvents: "none",
                                                                                    fontSize: "12px"
                                                                                }}
                                                                            >
                                                                                ▼
                                                                            </span>
                                                                        </td>

                                                                        <td className="action-icons">

                                                                            {/* View Case Details */}
                                                                            <button
                                                                                className="btn btn-link p-0 me-3"
                                                                                onClick={() =>
                                                                                    navigate(`/admin/view-case/${item.id}`)
                                                                                }
                                                                            >
                                                                                <FaEye
                                                                                    style={{
                                                                                        color: "#0152a8",
                                                                                        cursor: "pointer"
                                                                                    }}
                                                                                />
                                                                            </button>


                                                                            <button
                                                                                className="btn btn-link p-0 me-3"
                                                                                onClick={() =>
                                                                                    navigate(`/upload-preview/${item.id}`)
                                                                                }
                                                                            >
                                                                                <FaUpload
                                                                                    style={{
                                                                                        color: "#0152a8",
                                                                                        cursor: "pointer"
                                                                                    }}
                                                                                />
                                                                            </button>

                                                                            <button
                                                                                className="btn btn-link p-0"
                                                                                onClick={() => handleDelete(item.id)}
                                                                            >
                                                                                <FaTrash
                                                                                    style={{
                                                                                        color: "red",
                                                                                        cursor: "pointer"
                                                                                    }}
                                                                                />
                                                                            </button>

                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="row mt-2 justify-content-between">
                                                        <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto">
                                                            <div
                                                                className="dt-info"
                                                                aria-live="polite"
                                                                id="data-table_info"
                                                                role="status"
                                                            >
                                                                Showing {startEntry} to {endEntry} of {totalEntries} entries
                                                            </div>
                                                        </div>

                                                        <div className="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto">
                                                            <div className="dt-paging">
                                                                <nav aria-label="pagination">
                                                                    <ul className="pagination">

                                                                        <li className="dt-paging-button page-item disabled">
                                                                            <button
                                                                                className="page-link first"
                                                                                role="link"
                                                                                type="button"
                                                                                aria-controls="data-table"
                                                                                aria-disabled="true"
                                                                                aria-label="First"
                                                                                data-dt-idx="first"
                                                                                tabIndex={-1}
                                                                            >
                                                                                «
                                                                            </button>
                                                                        </li>

                                                                        <li className="dt-paging-button page-item disabled">
                                                                            <button
                                                                                className="page-link previous"
                                                                                role="link"
                                                                                type="button"
                                                                                aria-controls="data-table"
                                                                                aria-disabled="true"
                                                                                aria-label="Previous"
                                                                                data-dt-idx="previous"
                                                                                tabIndex={-1}
                                                                            >
                                                                                ‹
                                                                            </button>
                                                                        </li>

                                                                        <li className="dt-paging-button page-item active">
                                                                            <button
                                                                                className="page-link"
                                                                                role="link"
                                                                                type="button"
                                                                                aria-controls="data-table"
                                                                                aria-current="page"
                                                                                data-dt-idx="0"
                                                                            >
                                                                                1
                                                                            </button>
                                                                        </li>

                                                                        <li className="dt-paging-button page-item disabled">
                                                                            <button
                                                                                className="page-link next"
                                                                                role="link"
                                                                                type="button"
                                                                                aria-controls="data-table"
                                                                                aria-disabled="true"
                                                                                aria-label="Next"
                                                                                data-dt-idx="next"
                                                                                tabIndex={-1}
                                                                            >
                                                                                ›
                                                                            </button>
                                                                        </li>

                                                                        <li className="dt-paging-button page-item disabled">
                                                                            <button
                                                                                className="page-link last"
                                                                                role="link"
                                                                                type="button"
                                                                                aria-controls="data-table"
                                                                                aria-disabled="true"
                                                                                aria-label="Last"
                                                                                data-dt-idx="last"
                                                                                tabIndex={-1}
                                                                            >
                                                                                »
                                                                            </button>
                                                                        </li>
                                                                    </ul>
                                                                </nav>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default RecentCases;