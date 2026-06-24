import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
    FaEye,
    FaUpload,
    FaDownload,
    FaTrash,
    FaEdit
} from "react-icons/fa";
import "../styles/tables.css";
import heroImage from "../assets/hero.png";
function OrdersTable() {

    const [statusFilter, setStatusFilter] = useState("");
    const [deadlineFilter, setDeadlineFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [cases, setCases] = useState([]);
    const navigate = useNavigate();
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {

        fetchCases();

    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const fetchCases = async () => {

        try {

            const response =
                await axios.get(
                    "http://127.0.0.1:8000/api/cases"
                );

            console.log(
                "Cases API:",
                response.data
            );

            setCases(
                response.data
            );

        } catch (error) {

            console.error(
                "Failed to fetch cases:",
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

        const searchMatch =
            !searchTerm ||
            item.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.doctor_name?.toLowerCase().includes(searchTerm.toLowerCase());

        return (
            statusMatch &&
            deadlineMatch &&
            searchMatch
        );
    });

    const totalEntries = filteredCases.length;

    const startEntry =
        totalEntries === 0
            ? 0
            : (currentPage - 1) * entriesPerPage + 1;

    const endEntry = Math.min(
        currentPage * entriesPerPage,
        totalEntries
    );

    const totalPages = Math.ceil(
        totalEntries / entriesPerPage
    );

    const indexOfLastCase =
        currentPage * entriesPerPage;

    const indexOfFirstCase =
        indexOfLastCase - entriesPerPage;

    const visibleCases = filteredCases.slice(
        indexOfFirstCase,
        indexOfLastCase
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
        console.log("reset clicked");
        setDeadlineFilter("");
    };


    const formatDate = (date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString();
    };

    const isDeadlinePassed = (date) => {
        return new Date(date) < new Date();
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
            window.location.reload();

        } catch (error) {

            console.log(error);

            alert("Delete failed");
        }
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

    const handleViewHistory =
        async (caseId) => {

            try {

                const response =
                    await axios.get(
                        `http://127.0.0.1:8000/api/cases/${caseId}/history`
                    );

                console.log(
                    "History:",
                    response.data
                );

            } catch (error) {

                console.error(error);
            }
        };


    const startIndex =
        (currentPage - 1) * entriesPerPage;

    return (
        <div className="table-section">
            <div className="order-header d-flex justify-content-between align-items-center mb-3">
                <h5>Latest Orders</h5>
                <svg width="20" height="6" viewBox="0 0 20 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 0.25C18.52 0.25 19.75 1.48 19.75 3C19.75 4.52 18.52 5.75 17 5.75C15.48 5.75 14.25 4.52 14.25 3C14.25 1.48 15.48 0.25 17 0.25ZM17 4.25C17.69 4.25 18.25 3.69 18.25 3C18.25 2.31 17.69 1.75 17 1.75C16.31 1.75 15.75 2.31 15.75 3C15.75 3.69 16.31 4.25 17 4.25Z" fill="#666666"></path>
                    <path d="M3 0.25C4.52 0.25 5.75 1.48 5.75 3C5.75 4.52 4.52 5.75 3 5.75C1.48 5.75 0.25 4.52 0.25 3C0.25 1.48 1.48 0.25 3 0.25ZM3 4.25C3.69 4.25 4.25 3.69 4.25 3C4.25 2.31 3.69 1.75 3 1.75C2.31 1.75 1.75 2.31 1.75 3C1.75 3.69 2.31 4.25 3 4.25Z" fill="#666666"></path>
                    <path d="M10 0.25C11.52 0.25 12.75 1.48 12.75 3C12.75 4.52 11.52 5.75 10 5.75C8.48 5.75 7.25 4.52 7.25 3C7.25 1.48 8.48 0.25 10 0.25ZM10 4.25C10.69 4.25 11.25 3.69 11.25 3C11.25 2.31 10.69 1.75 10 1.75C9.31 1.75 8.75 2.31 8.75 3C8.75 3.69 9.31 4.25 10 4.25Z" fill="#666666"></path>
                </svg>

            </div>
            {showWelcome && (
                <div className="">
                    Welcome Admin!
                </div>
            )}
            {/* Filters */}
            <form
                onSubmit={handleSubmit}
                className="row g-3 mb-3">
                {/* Status */}
                <div className="col-md-3 ">
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
                                <thead >
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
                                    {visibleCases.map((item) => {
                                        console.log(item);
                                        const previewFiles =
                                            item.files?.filter(
                                                file =>
                                                    file.file_category ===
                                                    "preview_file"
                                            ) || [];
                                        return (
                                            < tr key={item.id} >
                                                <td className="text-center">
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

                                                <td >
                                                    {
                                                        item.files
                                                            ?.filter(
                                                                file =>
                                                                    file.file_category === "case_document"
                                                            )
                                                            .map((file, index) => (
                                                                <div key={index}>
                                                                    <a
                                                                        href={`http://127.0.0.1:8000/${file.file_path}`}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        style={{
                                                                            color: "#0152a8",
                                                                            textDecoration: "none",
                                                                            marginRight: "10px"
                                                                        }}
                                                                    >
                                                                        <FaEye />
                                                                    </a>

                                                                    <a
                                                                        href={`http://127.0.0.1:8000/api/download-file?file_path=${encodeURIComponent(file.file_path)}`}
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
                                                        !item.files?.some(
                                                            file =>
                                                                file.file_category === "case_document"
                                                        ) && <span>No File</span>
                                                    }
                                                </td>
                                                <td >

                                                    {
                                                        console.log(
                                                            "DIGITAL FILES",
                                                            item.files
                                                        ),
                                                        item.files
                                                            ?.filter(
                                                                file =>
                                                                    file.file_category === "digital_file"
                                                            )
                                                            .map((file, index) => (
                                                                <div key={index}>


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
                                                                    </a>


                                                                    <a
                                                                        href={`http://127.0.0.1:8000/api/download-file?file_path=${encodeURIComponent(file.file_path)}`}
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
                                                        !item.files?.some(
                                                            file =>
                                                                file.file_category === "digital_file"
                                                        ) && <span>No File</span>
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
                                                            <span
                                                                style={{
                                                                    color: "green"
                                                                }}
                                                            >
                                                                Preview Approved
                                                            </span>
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

                                                    {previewFiles.length > 0 && (
                                                        <>
                                                            <small
                                                                style={{
                                                                    color: "#6c757d"
                                                                }}
                                                            >
                                                                ({previewFiles.length} file
                                                                {previewFiles.length > 1
                                                                    ? "s"
                                                                    : ""}
                                                                )
                                                            </small>

                                                            {previewFiles.map(
                                                                (file, index) => (
                                                                    <div key={file.id}>
                                                                        <a
                                                                            href={`http://127.0.0.1:8000/${file.file_path.replace(
                                                                                /\\/g,
                                                                                "/"
                                                                            )}`}
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
                                                                    </div>
                                                                )
                                                            )}
                                                        </>
                                                    )}
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
                                    role="status"
                                >
                                    Showing{" "}
                                    {filteredCases.length === 0
                                        ? 0
                                        : startIndex + 1}
                                    {" "}to{" "}
                                    {Math.min(
                                        startIndex + entriesPerPage,
                                        filteredCases.length
                                    )}
                                    {" "}of{" "}
                                    {filteredCases.length} entries
                                </div>
                            </div>

                            <div className="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto">
                                <div className="dt-paging">
                                    <nav aria-label="pagination">
                                        <ul className="pagination">

                                            {/* First */}
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

                                            {/* Previous */}
                                            <li className={`page-item ${currentPage === 1
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

                                            {/* Page Numbers */}
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

                                            {/* Next */}
                                            <li className={`page-item ${currentPage === totalPages
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

                                            {/* Last */}
                                            <li className={`page-item ${currentPage === totalPages
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
    );
}

export default OrdersTable;