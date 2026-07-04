import DoctorSideBar from "../components/DoctorSideBar";
import DoctorHeader from "../components/DoctorHeader";
import "../DoctorStyle/doctor-dashboard.css";
import "../DoctorStyle/Cases.css";
import {
    FaEye,
    FaUpload,
    FaDownload,
    FaTrash,
    FaEdit
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DoctorCases() {

    const [cases, setCases] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState("");
    const [deadlineFilter, setDeadlineFilter] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [showSidebar, setShowSidebar] = useState(false);
    const [debouncedSearch, setDebouncedSearch] =
        useState("");

    const [digitalFilesMap,
        setDigitalFilesMap
    ] = useState({});

    const [previewFilesMap,
        setPreviewFilesMap
    ] = useState({});

    const [caseDocumentMap,
        setCaseDocumentMap
    ] = useState({});

    const loadCaseDocuments = async (
        caseId
    ) => {
        try {
            const response =
                await axios.get(
                    `http://localhost:8000/api/case_files/${caseId}`
                );

            const files =
                response.data.filter(
                    file =>
                        file.file_category ===
                        "case_document"
                );

            setCaseDocumentMap(prev => ({
                ...prev,
                [caseId]: files
            }));

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
                    `http://localhost:8000/api/case_files/${caseId}`
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

    const loadPreviewFiles = async (
        caseId
    ) => {
        try {
            const response =
                await axios.get(
                    `http://localhost:8000/api/case_files/${caseId}`
                );

            const files =
                response.data.filter(
                    file =>
                        file.file_category ===
                        "preview_file"
                );

            setPreviewFilesMap(prev => ({
                ...prev,
                [caseId]: files
            }));

        } catch (error) {
            console.log(error);
        }
    };

    const fetchCases = async () => {
        try {
            const params = {
                page: currentPage,
                limit: entriesPerPage,
            };

            if (debouncedSearch.trim()) {
                params.search = debouncedSearch.trim();
            }

            if (statusFilter) {
                params.status = statusFilter;
            }

            if (deadlineFilter) {
                params.deadline = deadlineFilter;
            }

            const response = await axios.get(
                "http://localhost:8000/api/cases",
                {
                    params
                }
            );

            setCases(response.data.items);
            setTotalPages(response.data.pages);
            setTotalRecords(response.data.total);

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

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const handleReset = () => {
        setStatusFilter("");
        setDeadlineFilter("");
        setSearchTerm("");
        setCurrentPage(1);
    };

    const handleDelete = async (
        caseId
    ) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete?"
            );

        if (!confirmDelete)
            return;

        try {

            await axios.delete(
                `http://localhost:8000/api/cases/${caseId}`
            );
            if (cases.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            } else {
                fetchCases();
            }

        } catch (error) {

            console.log(error);

            alert(
                "Failed to delete case"
            );
        }
    };
    useEffect(() => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [
        debouncedSearch,
        statusFilter,
        deadlineFilter,
        entriesPerPage
    ]);
    useEffect(() => {
        fetchCases();
    }, [
        currentPage,
        entriesPerPage,
        debouncedSearch,
        statusFilter,
        deadlineFilter
    ]);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm.trim());
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        cases.forEach((item) => {
            if (
                item.has_preview_files &&
                !previewFilesMap[item.id]
            ) {
                loadPreviewFiles(item.id);
            }
        });
    }, [cases]);
    return (
        <div className="container-fluid p-0">
            <div className="row g-0 doctor-dashboard-main">
                {showSidebar && (
                    <div
                        className="doctor-sidebar-overlay"
                        onClick={() => setShowSidebar(false)}
                    />
                )}
                <DoctorSideBar showSidebar={showSidebar} />
                <div className="col-md-9 doctor-main-content">
                    <DoctorHeader
                        title="Dashboard"
                        setShowSidebar={setShowSidebar}
                    />
                    <div className="mc-btm-bxx">
                        <div className="case-heading">
                            <div className="section-heading">
                                <h4 className="sub-heading">
                                    All Cases
                                </h4>
                            </div>

                            <div className="case-btn">
                                <Link to="/client/new-cases" className="submit-link">
                                    <button className="submit-btn text-white">
                                        Submit a Case
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="row g-3 mb-3">
                            <div className="col-md-3 ">
                                <label className="form-label">
                                    Status
                                </label>

                                <select
                                    value={statusFilter}
                                    onChange={(e) => {
                                        setStatusFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
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

                            {/* Deadline */}
                            <div className="col-md-3">
                                <label className="form-label">
                                    Delivery Deadline
                                </label>

                                <input
                                    type="date"
                                    value={deadlineFilter}
                                    onChange={(e) => {
                                        setDeadlineFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="form-control"
                                />
                            </div>

                            <div className="col-md-3 mt-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary fltr-btn me-2 mt-3 ms-4"
                                    style={{
                                        textDecoration: "none",
                                        backgroundColor: "#0152a8",
                                        border: "none"
                                    }}
                                >
                                    Apply
                                </button>

                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="btn btn-secondary fltr-btn mt-3"
                                    style={{
                                        textDecoration: "none",
                                        backgroundColor: "#0152a8",
                                        border: "none"
                                    }}
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                        <div className="table-responsive">
                            <div id="data-table_wrapper" className="dt-container dt-bootstrap5 dt-empty-footer">
                                <div className=" row mt-2 justify-content-between">
                                    <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto">
                                        <div className="dt-length">
                                            <select
                                                value={entriesPerPage}
                                                onChange={(e) => {
                                                    setEntriesPerPage(
                                                        Number(e.target.value)
                                                    );
                                                    setCurrentPage(1);
                                                }}
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
                                        <div className="dt-search">
                                            <label htmlFor="dt-search-0">Search:</label>
                                            <input
                                                type="search"
                                                className="form-control form-control-sm"
                                                id="dt-search-0"
                                                placeholder=""
                                                value={searchTerm}
                                                onChange={(e) => {
                                                    setSearchTerm(e.target.value);
                                                    setCurrentPage(1);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2 justify-content-between dt-layout-table">
                                    <div className="d-md-flex justify-content-between align-items-center col-12 dt-layout-full col-md">
                                        <table id="data-table" className="table table-striped custom-table dataTable p-2">
                                            <colgroup>
                                                <col data-dt-column="0" style={{ width: "64.2625px" }} />
                                                <col data-dt-column="1" style={{ width: "142.625px" }} />
                                                <col data-dt-column="2" style={{ width: "155.5px" }} />
                                                <col data-dt-column="3" style={{ width: "51.65px" }} />
                                                <col data-dt-column="4" style={{ width: "73.825px" }} />
                                                <col data-dt-column="5" style={{ width: "153.2px" }} />
                                                <col data-dt-column="6" style={{ width: "124.812px" }} />
                                                <col data-dt-column="7" style={{ width: "106.8px" }} />
                                                <col data-dt-column="8" style={{ width: "79.7625px" }} />
                                                <col data-dt-column="9" style={{ width: "75.0625px" }} />
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>Case Id</th>
                                                    <th>Patient Name</th>
                                                    <th>Appointment Date</th>
                                                    <th>Age</th>
                                                    <th>Case PDF</th>
                                                    <th>Digital Files</th>
                                                    <th>Delivery Deadline</th>
                                                    <th>Preview Status</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cases.map((item) => {

                                                    const previewFiles =
                                                        previewFilesMap[item.id] || [];

                                                    return (
                                                        <tr key={item.id}>
                                                            <td className="text-center">
                                                                {item.id}
                                                            </td>
                                                            <td className="text-center">{item.patient_name}</td>
                                                            <td className="text-center">
                                                                {item.appointment_date
                                                                    ? new Date(item.appointment_date)
                                                                        .toLocaleString("en-GB", {
                                                                            day: "2-digit",
                                                                            month: "short",
                                                                            year: "numeric",
                                                                            hour: "2-digit",
                                                                            minute: "2-digit",
                                                                            hour12: true
                                                                        })
                                                                        .replace(",", "")
                                                                    : "-"}
                                                            </td>
                                                            <td className="text-center">{item.age}</td>
                                                            <td className="text-center">
                                                                {
                                                                    item.has_case_document ? (
                                                                        <FaEye
                                                                            style={{
                                                                                cursor: "pointer",
                                                                                color: "#0152a8"
                                                                            }}
                                                                            onClick={() =>
                                                                                handleViewCaseDocument(
                                                                                    item.id,
                                                                                    "case_document"
                                                                                )
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        "-"
                                                                    )
                                                                }
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

                                                            </td>                                                            <td className="text-center">
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
                                                                            <div className="text-center">
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
                                                                            )}s
                                                                        </>
                                                                    );
                                                                })() : (
                                                                    "-"
                                                                )}
                                                            </td>
                                                            <td className="text-center">
                                                                {
                                                                    previewFiles.map((file, index) => (

                                                                        <div
                                                                            key={file.id}
                                                                            className="text-center"
                                                                        >
                                                                            <a
                                                                                href={`http://127.0.0.1:8000/${file.file_path.replace(/\\/g, "/")}`}
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                            >
                                                                                Preview {index + 1}
                                                                                {" "}
                                                                                (
                                                                                {file.file_name
                                                                                    .split(".")
                                                                                    .pop()
                                                                                    .toUpperCase()}
                                                                                )
                                                                            </a>

                                                                            <br />

                                                                            <a
                                                                                href={`http://127.0.0.1:8000/api/download-file?file_path=${encodeURIComponent(
                                                                                    file.file_path
                                                                                )}`}
                                                                            >
                                                                                <FaDownload />
                                                                            </a>
                                                                        </div>
                                                                    ))
                                                                }

                                                                <div className="mt-2 text-center">

                                                                    {
                                                                        item.preview_status?.toLowerCase() ===
                                                                        "waiting user" && (
                                                                            <>
                                                                                <button
                                                                                    className="btn btn-sm btn-primary me-2"
                                                                                    onClick={() =>
                                                                                        handlePreviewStatus(
                                                                                            item.id,
                                                                                            "Approved"
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    ✓
                                                                                </button>

                                                                                <button
                                                                                    className="btn btn-sm btn-danger"
                                                                                    onClick={() =>
                                                                                        handlePreviewStatus(
                                                                                            item.id,
                                                                                            "Preview Rejected"
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    ✕
                                                                                </button>
                                                                            </>
                                                                        )
                                                                    }
                                                                    {
                                                                        item.preview_status?.toLowerCase() ===
                                                                        "approved" && (
                                                                            <span
                                                                                style={{
                                                                                    color: "green",
                                                                                    fontWeight: "600"
                                                                                }}
                                                                            >
                                                                                Approved
                                                                            </span>
                                                                        )
                                                                    }

                                                                    {
                                                                        item.preview_status?.toLowerCase() ===
                                                                        "preview rejected" && (
                                                                            <span
                                                                                style={{
                                                                                    color: "red",
                                                                                    fontWeight: "600"
                                                                                }}
                                                                            >
                                                                                Rejected
                                                                            </span>
                                                                        )
                                                                    }

                                                                </div>

                                                                {
                                                                    !item.has_preview_files &&
                                                                    item.preview_status !==
                                                                    "Waiting User" &&
                                                                    item.preview_status !==
                                                                    "Approved" &&
                                                                    item.preview_status !==
                                                                    "Preview Rejected" &&
                                                                    "-"
                                                                }

                                                            </td>
                                                            <td className="text-center">
                                                                <span
                                                                    style={{
                                                                        fontWeight: "600",
                                                                        color:
                                                                            item.status === "Submitted"
                                                                                ? "#6c757d"
                                                                                : item.status === "InProduction"
                                                                                    ? "#0d6efd"
                                                                                    : item.status === "QualityCheck"
                                                                                        ? "#fd7e14"
                                                                                        : item.status === "Shipped"
                                                                                            ? "#198754"
                                                                                            : item.status === "Delivered"
                                                                                                ? "#0dcaf0"
                                                                                                : "black"
                                                                    }}
                                                                >
                                                                    {item.status}
                                                                </span>
                                                            </td>
                                                            <td className="text-center">
                                                                <Link
                                                                    to={`/client/update-case/${item.id}`}
                                                                >
                                                                    <FaEdit className="me-2" />
                                                                </Link>

                                                                <FaTrash
                                                                    className="text-danger"
                                                                    style={{ cursor: "pointer" }}
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            item.id
                                                                        )
                                                                    }
                                                                />
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
                                                role="status"
                                            >
                                                Showing{" "}
                                                {
                                                    totalRecords === 0
                                                        ? 0
                                                        : ((currentPage - 1) * entriesPerPage) + 1
                                                }
                                                {" "}to{" "}
                                                {
                                                    Math.min(
                                                        currentPage * entriesPerPage,
                                                        totalRecords
                                                    )
                                                }
                                                {" "}of{" "}
                                                {totalRecords} entries
                                            </div>
                                        </div>

                                        <div className="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto">
                                            <div className="dt-paging">
                                                <nav aria-label="pagination">
                                                    <ul className="pagination">
                                                        <li className={`page-item ${currentPage === 1
                                                            ? "disabled"
                                                            : ""
                                                            }`}>
                                                            <button
                                                                className="page-link"
                                                                onClick={() =>
                                                                    setCurrentPage(1)
                                                                }
                                                            >
                                                                «
                                                            </button>
                                                        </li>

                                                        <li className={`page-item ${currentPage <= 1
                                                            ? "disabled"
                                                            : ""
                                                            }`}>
                                                            <button
                                                                className="page-link"
                                                                onClick={() =>
                                                                    setCurrentPage(
                                                                        currentPage - 1
                                                                    )
                                                                }
                                                            >
                                                                ‹
                                                            </button>
                                                        </li>
                                                        {[...Array(totalPages)].map(
                                                            (_, index) => (
                                                                <li
                                                                    key={index}
                                                                    className={`page-item ${currentPage ===
                                                                        index + 1
                                                                        ? "active"
                                                                        : ""
                                                                        }`}
                                                                >
                                                                    <button
                                                                        className="page-link"
                                                                        onClick={() =>
                                                                            setCurrentPage(
                                                                                index + 1
                                                                            )
                                                                        }
                                                                    >
                                                                        {index + 1}
                                                                    </button>
                                                                </li>
                                                            )
                                                        )}

                                                        <li className={`page-item ${totalPages === 0 ||
                                                            currentPage === totalPages
                                                            ? "disabled"
                                                            : ""
                                                            }`}>
                                                            <button
                                                                className="page-link"
                                                                onClick={() =>
                                                                    setCurrentPage(
                                                                        currentPage + 1
                                                                    )
                                                                }
                                                            >
                                                                ›
                                                            </button>
                                                        </li>
                                                        <li className={`page-item ${totalPages === 0 ||
                                                            currentPage === totalPages
                                                            ? "disabled"
                                                            : ""
                                                            }`}>
                                                            <button
                                                                className="page-link"
                                                                onClick={() =>
                                                                    setCurrentPage(
                                                                        totalPages
                                                                    )
                                                                }
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
    )
}
export default DoctorCases;
