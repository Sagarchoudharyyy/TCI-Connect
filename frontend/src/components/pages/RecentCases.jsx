
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
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const [cases, setCases] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCases, setTotalCases] = useState(0);
    const [digitalFilesMap, setDigitalFilesMap] =
        useState({});
    const [previewFilesMap, setPreviewFilesMap] =
        useState({});


    useEffect(() => {
        fetchCases();
    }, [
        currentPage,
        entriesPerPage,
        searchTerm,
        statusFilter,
        deadlineFilter
    ]);

    const loadPreviewFiles = async (
        caseId
    ) => {
        try {
            console.log(
                "Loading preview files for:",
                caseId
            );
            const response =
                await axios.get(
                    `http://127.0.0.1:8000/api/case_files/${caseId}`
                );
            console.log(
                "All files:",
                response.data
            );


            const files =
                response.data.filter(
                    file =>
                        file.file_category ===
                        "preview_file"
                );

            console.log(
                "Preview files:",
                files
            );


            setPreviewFilesMap(prev => ({
                ...prev,
                [caseId]: files
            }));

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        cases.forEach(item => {

            if (!previewFilesMap[item.id]) {
                loadPreviewFiles(item.id);
            }
        });
    }, [cases]);

    const handleDownloadCaseDocument = async (caseId) => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/case_files/${caseId}`
            );

            const caseDocument = response.data.find(
                file => file.file_category === "case_document"
            );

            if (!caseDocument) {
                alert("No case document found");
                return;
            }

            window.open(
                `http://127.0.0.1:8000/api/download-file?file_path=${encodeURIComponent(
                    caseDocument.file_path
                )}`,
                "_blank"
            );
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCases = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/cases",
                {
                    params: {
                        page: currentPage,
                        limit: entriesPerPage,
                        search: searchTerm || undefined,
                        status: statusFilter || undefined,
                        deadline: deadlineFilter || undefined,
                    },
                }
            );

            setCases(response.data.items);
            setTotalPages(response.data.pages);
            setTotalCases(response.data.total);
        } catch (error) {
            console.log(error);
        }
    };
    const handleViewCaseDocument =
        async (caseId) => {
            try {
                const response =
                    await axios.get(
                        `http://localhost:8000/api/case_files/${caseId}`
                    );

                const caseDocument =
                    response.data.find(
                        file =>
                            file.file_category ===
                            "case_document"
                    );

                if (!caseDocument) {
                    alert(
                        "No case document found."
                    );
                    return;
                }

                const url =
                    `http://127.0.0.1:8000/${caseDocument.file_path.replace(
                        /\\/g,
                        "/"
                    )}`;

                // Open in same tab
                window.location.href = url;

            } catch (error) {
                console.log(error);
            }
        };

    const loadDigitalFiles = async (
        caseId
    ) => {
        try {
            const response =
                await axios.get(
                    `http://127.0.0.1:8000/api/case_files/${caseId}`
                );

            const files =
                response.data.filter(
                    file =>
                        file.file_category ===
                        "digital_file"
                );

            setDigitalFilesMap(prev => ({
                ...prev,
                [caseId]: files
            }));

        } catch (error) {
            console.log(error);
        }
    };
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


    const handleStatusChange =
        async (caseId, newStatus) => {

            try {

                await axios.put(
                    `http://127.0.0.1:8000/api/cases/${caseId}/status`,
                    {
                        status: newStatus
                    }
                );

                setCases(prev =>
                    prev.map(item =>
                        item.id === caseId
                            ? {
                                ...item,
                                status: newStatus
                            }
                            : item
                    )
                );

            } catch (error) {
                console.error(
                    "Status update failed",
                    error
                );
                console.log(
                    error.response?.data
                )
            }
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
                                                                {cases.map((item) => {
                                                                    const previewFiles =
                                                                        previewFilesMap[item.id] || [];
                                                                    return (
                                                                        <tr key={item.id} >
                                                                            <td className="text-center">
                                                                                <img
                                                                                    alt="profile"
                                                                                    width="40"
                                                                                />
                                                                            </td>
                                                                            <td>{item.id}</td>

                                                                            <td>{item.doctor_name}</td>

                                                                            <td>{item.doctor_phone}</td>

                                                                            <td>{item.patient_name}</td>
                                                                            <td className="text-center">
                                                                                {item.has_case_document ? (
                                                                                    <>
                                                                                        <FaEye
                                                                                            style={{
                                                                                                cursor: "pointer",
                                                                                                color: "#0152a8",
                                                                                                marginRight: "12px"
                                                                                            }}
                                                                                            onClick={() =>
                                                                                                handleViewCaseDocument(item.id)
                                                                                            }
                                                                                        />

                                                                                        <FaDownload
                                                                                            style={{
                                                                                                cursor: "pointer",
                                                                                                color: "#0152a8"
                                                                                            }}
                                                                                            onClick={() =>
                                                                                                handleDownloadCaseDocument(item.id)
                                                                                            }
                                                                                        />
                                                                                    </>
                                                                                ) : (
                                                                                    "-"
                                                                                )}
                                                                            </td>
                                                                            <td className="text-center">

                                                                                {
                                                                                    digitalFilesMap[item.id]
                                                                                        ?.map((file, index) => (
                                                                                            <div key={file.id}>

                                                                                                <a
                                                                                                    href={`http://127.0.0.1:8000/${file.file_path}`}
                                                                                                    target="_blank"
                                                                                                    rel="noreferrer"
                                                                                                    style={{
                                                                                                        textDecoration: "none",
                                                                                                        marginRight: "12px",
                                                                                                        color: "#0152a8"
                                                                                                    }}
                                                                                                >
                                                                                                    Preview File {index + 1}
                                                                                                    {" "}
                                                                                                    (
                                                                                                    {file.file_name
                                                                                                        .split(".")
                                                                                                        .pop()
                                                                                                        .toUpperCase()}
                                                                                                    )
                                                                                                </a>

                                                                                                <a
                                                                                                    href={`http://127.0.0.1:8000/api/download-file?file_path=${encodeURIComponent(
                                                                                                        file.file_path
                                                                                                    )}`}
                                                                                                    style={{
                                                                                                        color: "#0152a8"
                                                                                                    }}
                                                                                                >
                                                                                                    <FaDownload />
                                                                                                </a>

                                                                                            </div>
                                                                                        ))
                                                                                }

                                                                                {
                                                                                    item.has_digital_files &&
                                                                                    !digitalFilesMap[item.id] && (
                                                                                        <button
                                                                                            className="btn btn-link p-0"
                                                                                            onClick={() =>
                                                                                                loadDigitalFiles(
                                                                                                    item.id
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            View Files
                                                                                        </button>
                                                                                    )
                                                                                }

                                                                                {
                                                                                    !item.has_digital_files &&
                                                                                    (
                                                                                        <span>
                                                                                            No File
                                                                                        </span>
                                                                                    )
                                                                                }

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

                                                                                            {(isPassed || daysLeft <= 3) && (
                                                                                                <div
                                                                                                    className="text-center"
                                                                                                    style={{
                                                                                                        color: isPassed ? "red" : "#0152a8",
                                                                                                        fontWeight: "600"
                                                                                                    }}
                                                                                                >
                                                                                                    {isPassed
                                                                                                        ? "(Deadline passed)"
                                                                                                        : daysLeft === 0
                                                                                                            ? "(Deadline is today)"
                                                                                                            : `(${daysLeft} day${daysLeft > 1 ? "s" : ""} left)`
                                                                                                    }
                                                                                                </div>
                                                                                            )}
                                                                                        </>
                                                                                    );
                                                                                })() : (
                                                                                    <span>No deadline</span>
                                                                                )}
                                                                            </td>

                                                                            <td>
                                                                                <div
                                                                                    style={{
                                                                                        fontWeight: "600"
                                                                                    }}
                                                                                >
                                                                                    {item.preview_status === "-" ? (
                                                                                        <>
                                                                                            <div
                                                                                                style={{
                                                                                                    color: "#0152a8"
                                                                                                }}
                                                                                            >
                                                                                                No Preview Requested
                                                                                            </div>

                                                                                            <div
                                                                                                style={{
                                                                                                    color: "#0152a8",
                                                                                                    fontWeight: "600",
                                                                                                    cursor: "pointer"
                                                                                                }}
                                                                                            >
                                                                                                (Upload Now)
                                                                                            </div>

                                                                                            <small
                                                                                                style={{
                                                                                                    color: "#6c757d"
                                                                                                }}
                                                                                            >
                                                                                                No preview files uploaded.
                                                                                            </small>
                                                                                        </>
                                                                                    ) : item.preview_status ===
                                                                                        "Waiting User" ? (
                                                                                        <>
                                                                                            <span
                                                                                                style={{
                                                                                                    color: "#0152a8"
                                                                                                }}
                                                                                            >
                                                                                                Preview Uploaded
                                                                                            </span>

                                                                                            <br />

                                                                                            <span
                                                                                                style={{
                                                                                                    color: "#0152a8"
                                                                                                }}
                                                                                            >
                                                                                                (Waiting User)
                                                                                            </span>
                                                                                        </>
                                                                                    ) : item.preview_status ===
                                                                                        "Approved" ? (
                                                                                        <>
                                                                                            <span
                                                                                                style={{
                                                                                                    color: "green"
                                                                                                }}
                                                                                            >
                                                                                                Preview Approved
                                                                                            </span>

                                                                                            {previewFiles.length > 0 && (
                                                                                                <>
                                                                                                    <br />

                                                                                                    <small
                                                                                                        style={{
                                                                                                            color: "#6c757d"
                                                                                                        }}
                                                                                                    >
                                                                                                        (
                                                                                                        {previewFiles.length}
                                                                                                        {" "}
                                                                                                        file
                                                                                                        {previewFiles.length > 1
                                                                                                            ? "s"
                                                                                                            : ""}
                                                                                                        )
                                                                                                    </small>

                                                                                                    {previewFiles.map(
                                                                                                        (file, index) => (
                                                                                                            <div
                                                                                                                key={file.id}
                                                                                                            >
                                                                                                                <a
                                                                                                                    href={`http://127.0.0.1:8000/${file.file_path.replace(
                                                                                                                        /\\/g,
                                                                                                                        "/"
                                                                                                                    )}`}
                                                                                                                    target="_blank"
                                                                                                                    rel="noreferrer"
                                                                                                                    style={{
                                                                                                                        textDecoration:
                                                                                                                            "none",
                                                                                                                        color:
                                                                                                                            "#0152a8"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    Preview{" "}
                                                                                                                    {index + 1}
                                                                                                                </a>

                                                                                                                <br />

                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        color:
                                                                                                                            "#0152a8"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    (
                                                                                                                    {file.file_name
                                                                                                                        .split(".")
                                                                                                                        .pop()
                                                                                                                        .toUpperCase()}
                                                                                                                    )
                                                                                                                </span>
                                                                                                            </div>
                                                                                                        )
                                                                                                    )}
                                                                                                </>
                                                                                            )}
                                                                                        </>
                                                                                    ) : item.preview_status ===
                                                                                        "Preview Rejected" ? (
                                                                                        <span
                                                                                            style={{
                                                                                                color: "red"
                                                                                            }}
                                                                                        >
                                                                                            Preview Rejected
                                                                                        </span>
                                                                                    ) : null}
                                                                                </div>
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


                                                                                {previewFiles.length === 0 && (

                                                                                    <button
                                                                                        className="btn btn-link p-0 me-3"
                                                                                        onClick={() =>
                                                                                            navigate(
                                                                                                `/admin/upload-preview/${item.id}`
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <FaUpload
                                                                                            style={{
                                                                                                color: "#0152a8",
                                                                                                cursor: "pointer"
                                                                                            }}
                                                                                        />
                                                                                    </button>

                                                                                )}

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
                                                                    );
                                                                })}
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
                                                                Showing{" "}
                                                                {totalCases === 0
                                                                    ? 0
                                                                    : (currentPage - 1) * entriesPerPage + 1}
                                                                {" "}to{" "}
                                                                {Math.min(
                                                                    currentPage * entriesPerPage,
                                                                    totalCases
                                                                )}
                                                                {" "}of{" "}
                                                                {totalCases} entries
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
                                                                                disabled={currentPage === 1}
                                                                                onClick={() =>
                                                                                    setCurrentPage(prev => prev - 1)
                                                                                }
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
                                                                                disabled={
                                                                                    currentPage === totalPages
                                                                                }
                                                                                onClick={() =>
                                                                                    setCurrentPage(prev => prev + 1)
                                                                                }
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