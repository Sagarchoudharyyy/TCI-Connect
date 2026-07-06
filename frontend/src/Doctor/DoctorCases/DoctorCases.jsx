import DoctorSideBar from "../../components/DoctorSideBar";
import DoctorHeader from "../../components/DoctorHeader";
import "../../DoctorStyle/Cases.css";

import DoctorCaseFilter from "./DoctorCaseFilter";
import DoctorCaseTopBar from "./DoctorCaseTopBar";
import DoctorCasePagination from "./DoctorCasePagination";
import DoctorCaseTable from "./DoctorCaseTable";
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
    const [successMessage, setSuccessMessage] = useState("");

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

    const updatePreviewStatus = async (caseId, status) => {
        return await axios.put(
            `http://localhost:8000/api/cases/${caseId}/preview-status`,
            {
                preview_status: status,
            }
        );
    };

    const handlePreviewStatus = async (
        caseId,
        status
    ) => {

        try {

            await updatePreviewStatus(
                caseId,
                status
            );

            fetchCases();

            setSuccessMessage(
                `Preview ${status} successfully`
            );

            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);

        } catch (error) {

            console.log(error);

            setSuccessMessage(
                "Failed to update preview status"
            );

            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        }
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
                    <DoctorCaseFilter
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        deadlineFilter={deadlineFilter}
                        setDeadlineFilter={setDeadlineFilter}
                        handleSubmit={handleSubmit}
                        handleReset={handleReset}
                        setCurrentPage={setCurrentPage}
                    />
                    <DoctorCaseTopBar
                        entriesPerPage={entriesPerPage}
                        setEntriesPerPage={setEntriesPerPage}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        setCurrentPage={setCurrentPage}
                    />
                    <DoctorCaseTable
                        cases={cases}
                        previewFilesMap={previewFilesMap}
                        digitalFilesMap={digitalFilesMap}
                        loadDigitalFiles={loadDigitalFiles}
                        handleViewCaseDocument={handleViewCaseDocument}
                        handlePreviewStatus={handlePreviewStatus}
                        handleDelete={handleDelete}
                    />

                    <DoctorCasePagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        totalRecords={totalRecords}
                        entriesPerPage={entriesPerPage}
                    />
                </div>
            </div>
        </div>
    )
}
export default DoctorCases;
