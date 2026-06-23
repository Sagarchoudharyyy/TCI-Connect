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
import { getCases } from "../services/caseService";
import { Link } from "react-router-dom";
import axios from "axios";

function DoctorCases() {

    const [cases, setCases] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [deadlineFilter, setDeadlineFilter] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const fetchCases = async () => {
        try {
            const response = await getCases();
            console.log("API Response:", response.data);
            setCases(response.data);
        } catch (error) {
            console.log(error);
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

            // Refresh table instantly
            fetchCases();

        } catch (error) {

            console.log(error);

            alert(
                "Failed to delete case"
            );
        }
    };
    const totalPages = Math.ceil(
        filteredCases.length / entriesPerPage
    );

    const startIndex =
        (currentPage - 1) * entriesPerPage;

    const visibleCases =
        filteredCases.slice(
            startIndex,
            startIndex + entriesPerPage
        );

    useEffect(() => {
        fetchCases();
    }, []);
    return (
        <div className="container-fluid p-0">
            <div className="row g-0 doctor-dashboard-main">
                <DoctorSideBar />
                <div className="col-md-9 doctor-main-content">
                    <DoctorHeader title="Dashboard" />
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

                            {/* Deadline */}
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
                                                {visibleCases.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            {item.id}
                                                        </td>
                                                        <td>{item.patient_name}</td>
                                                        <td>
                                                            {item.appointment_date
                                                                ? new Date(
                                                                    item.appointment_date
                                                                )
                                                                    .toLocaleString("en-GB", {
                                                                        day: "2-digit",
                                                                        month: "2-digit",
                                                                        year: "numeric",
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                        hour12: true
                                                                    })
                                                                    .replace(",", "")
                                                                : "N/A"}
                                                        </td>
                                                        <td>{item.age}</td>
                                                        {/* <td>
                                                            {
                                                                item.files
                                                                    ?.filter(
                                                                        file =>
                                                                            file.file_category === "case_document"
                                                                    )
                                                                    .map((file, index) => (
                                                                        <a
                                                                            key={index}
                                                                            href={`http://127.0.0.1:8000/${file.file_path}`}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            style={{
                                                                                color: "#0152a8",
                                                                                textDecoration: "none"
                                                                            }}
                                                                        >
                                                                            <FaEye />
                                                                        </a>
                                                                    ))
                                                            }

                                                            {
                                                                !item.files?.some(
                                                                    file =>
                                                                        file.file_category === "case_document"
                                                                ) && <span>-</span>
                                                            }
                                                        </td> */}


                                                        <td>
                                                            {
                                                                item.files
                                                                    ?.filter(
                                                                        file =>
                                                                            file.file_category === "case_document"
                                                                    )
                                                                    .map((file, index) => {

                                                                        const fileUrl =
                                                                            `http://127.0.0.1:8000/${file.file_path.replace(/\\/g, "/")}`;

                                                                        if (
                                                                            file.file_type?.startsWith("image/")
                                                                        ) {
                                                                            return (
                                                                                <a
                                                                                    key={index}
                                                                                    href={fileUrl}
                                                                                    target="_blank"
                                                                                    rel="noreferrer"
                                                                                >
                                                                                    <img
                                                                                        src={fileUrl}
                                                                                        alt="preview"
                                                                                        style={{
                                                                                            width: "60px",
                                                                                            height: "60px",
                                                                                            objectFit: "cover",
                                                                                            borderRadius: "4px"
                                                                                        }}
                                                                                    />
                                                                                </a>
                                                                            );
                                                                        }
                                                                        if (
                                                                            file.file_type ===
                                                                            "application/pdf"
                                                                        ) {
                                                                            return (
                                                                                <a
                                                                                    key={index}
                                                                                    href={fileUrl}
                                                                                    target="_blank"
                                                                                    rel="noreferrer"
                                                                                    style={{
                                                                                        textDecoration: "none",
                                                                                        color: "#0152a8"
                                                                                    }}
                                                                                >
                                                                                    📄 PDF
                                                                                </a>
                                                                            );
                                                                        }
                                                                        return (
                                                                            <a
                                                                                key={index}
                                                                                href={fileUrl}
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                                style={{
                                                                                    textDecoration: "none",
                                                                                    color: "#0047AB",   // slightly darker blue

                                                                                }}
                                                                            >
                                                                                📦 FILE
                                                                            </a>
                                                                        );
                                                                    })
                                                            }

                                                            {
                                                                !item.files?.some(
                                                                    file =>
                                                                        file.file_category ===
                                                                        "case_document"
                                                                ) && <span>-</span>
                                                            }
                                                        </td>
                                                        <td>

                                                            {
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

                                                        {/* <td>
                                                            {item.delivery_deadline
                                                                ? new Date(
                                                                    item.delivery_deadline
                                                                ).toLocaleDateString("en-GB")
                                                                : "N/A"}
                                                        </td> */}
                                                        <td>
                                                            {item.delivery_deadline ? (() => {

                                                                const today = new Date();
                                                                const deadline = new Date(item.delivery_deadline);

                                                                today.setHours(0, 0, 0, 0);
                                                                deadline.setHours(0, 0, 0, 0);

                                                                const diffTime = deadline - today;

                                                                const daysLeft = Math.ceil(
                                                                    diffTime / (1000 * 60 * 60 * 24)
                                                                );

                                                                const isPassed = deadline < today;

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
                                                                                : `(${daysLeft} day${daysLeft > 1 ? "s" : ""
                                                                                } left)`
                                                                            }
                                                                        </div>
                                                                    </>
                                                                );
                                                            })() : (
                                                                "-"
                                                            )}
                                                        </td>

                                                        <td>

                                                            {item.files
                                                                ?.filter(
                                                                    file =>
                                                                        file.file_category === "preview_file"
                                                                )
                                                                .map((file, index) => (

                                                                    <div key={index}>

                                                                        <a
                                                                            href={`http://127.0.0.1:8000/${file.file_path.replace(/\\/g, "/")}`}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            style={{
                                                                                textDecoration: "none",
                                                                                color: "#0152a8"
                                                                            }}
                                                                        >
                                                                            Preview {index + 1}
                                                                        </a>

                                                                        <div
                                                                            style={{
                                                                                color: "#0152a8",
                                                                                fontSize: "14px"
                                                                            }}
                                                                        >
                                                                            (
                                                                            {file.file_name
                                                                                ?.split(".")
                                                                                .pop()
                                                                                ?.toUpperCase()}
                                                                            )
                                                                        </div>

                                                                        <a
                                                                            href={`http://127.0.0.1:8000/api/download-file?file_path=${encodeURIComponent(file.file_path)}`}
                                                                            style={{
                                                                                color: "#0152a8"
                                                                            }}
                                                                        >
                                                                            <FaDownload />
                                                                        </a>

                                                                    </div>
                                                                ))}


                                                            <div className="mt-2">

                                                                {item.preview_status?.toLowerCase() === "waiting user" && (
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
                                                                )}

                                                                {item.preview_status?.toLowerCase() === "approved" && (
                                                                    <span
                                                                        style={{
                                                                            color: "green",
                                                                            fontWeight: "600"
                                                                        }}
                                                                    >
                                                                        Approved
                                                                    </span>
                                                                )}

                                                                {item.preview_status?.toLowerCase() === "preview rejected" && (
                                                                    <span
                                                                        style={{
                                                                            color: "red",
                                                                            fontWeight: "600"
                                                                        }}
                                                                    >
                                                                        Rejected
                                                                    </span>
                                                                )}

                                                                {item.preview_status?.toLowerCase() === "pending" && (
                                                                    <span
                                                                        style={{
                                                                            color: "#0152a8",
                                                                            fontWeight: "600"
                                                                        }}
                                                                    >
                                                                        Pending
                                                                    </span>
                                                                )}

                                                            </div>
                                                        </td>


                                                        {/* <td>{item.status}</td> */}
                                                        <td>
                                                            <span
                                                                style={{
                                                                    fontWeight: "600",
                                                                    color:
                                                                        item.status === "Submitted"
                                                                            ? "#6c757d"
                                                                            : item.status === "InProduction"
                                                                                ? "#0152a8"
                                                                                : item.status === "QualityCheck"
                                                                                    ? "#0152a8"
                                                                                    : item.status === "Shipped"
                                                                                        ? "#0152a8"
                                                                                        : item.status === "Delivered"
                                                                                            ? "#0152a8"
                                                                                            : "black"
                                                                }}
                                                            >
                                                                {item.status}
                                                            </span>
                                                        </td>
                                                        <td>
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
                                                )
                                                )
                                                }
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
                </div>
            </div>
        </div>
    )
}
export default DoctorCases;
