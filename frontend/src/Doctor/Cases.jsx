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
            item.case_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                                                            {item.case_id}
                                                        </td>
                                                        <td>{item.patient_name}</td>
                                                        <td>
                                                            {item.appointment_date
                                                                ? new Date(
                                                                    item.appointment_date
                                                                ).toLocaleDateString("en-GB")
                                                                : "N/A"}
                                                        </td>
                                                        <td>{item.age}</td>
                                                        <td>
                                                            {item.files?.length > 0 ? (
                                                                <>
                                                                    <Link
                                                                        to={`http://127.0.0.1:8000/${item.files[0].file_path}`}
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
                                                                        to={`http://127.0.0.1:8000/${item.files[0].file_path}`}
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
                                                                            to={`http://127.0.0.1:8000/${file.file_path}`}
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
                                                                            to={`http://127.0.0.1:8000/${file.file_path}`}
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
                                                                <span>No File</span>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {item.delivery_deadline
                                                                ? new Date(
                                                                    item.delivery_deadline
                                                                ).toLocaleDateString("en-GB")
                                                                : "N/A"}
                                                        </td>
                                                        <td>{item.preview_status}</td>
                                                        <td>{item.status}</td>
                                                        <td>
                                                            <Link
                                                                to={`/client/update-case/${item.case_id}`}
                                                            >
                                                                <FaEdit className="me-2" />
                                                            </Link>

                                                            <FaTrash
                                                                className="text-danger"
                                                                style={{ cursor: "pointer" }}
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        item.case_id
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
