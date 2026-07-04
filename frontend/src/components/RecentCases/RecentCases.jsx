
import Header from "../Header";
import Sidebar from "../Sidebar";

import {
    fetchCases,
    getPreviewFiles,
    getDigitalFiles,
    downloadCaseDocument,
    viewCaseDocument,
    updateCaseStatus,
    deleteCase,
} from "./recentCasesApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/header.css";
import "../../styles/sidebar.css";
import RecentCasesFilter from "./RecentCasesFilter";
import RecentCasesTopBar from "./RecentCasesTopBar";
import RecentCasesTable from "./RecentCasesTable";
import RecentCasesPagination from "./RecentCasesPagination";
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
        loadCases();
    }, [
        currentPage,
        entriesPerPage,
        searchTerm,
        statusFilter,
        deadlineFilter,
    ]);
    useEffect(() => {
        cases.forEach((item) => {
            if (!previewFilesMap[item.id]) {
                loadPreviewFiles(item.id);
            }
        });
    }, [cases]);
    const loadPreviewFiles = async (caseId) => {
        try {
            const files = await getPreviewFiles(caseId);

            setPreviewFilesMap((prev) => ({
                ...prev,
                [caseId]: files,
            }));
        } catch (error) {
            console.log(error);
        }
    };
    const handleDownloadCaseDocument = async (caseId) => {
        try {
            await downloadCaseDocument(caseId);
        } catch (error) {
            alert(error.message);
        }
    };

    const loadCases = async () => {
        try {
            const data = await fetchCases({
                page: currentPage,
                limit: entriesPerPage,
                search: searchTerm || undefined,
                status: statusFilter || undefined,
                deadline: deadlineFilter || undefined,
            });

            setCases(data.items);
            setTotalPages(data.pages);
            setTotalCases(data.total);
        } catch (error) {
            console.log(error);
        }
    };
    const handleViewCaseDocument = async (caseId) => {
        try {
            await viewCaseDocument(caseId);
        } catch (error) {
            alert(error.message);
        }
    };

    const loadDigitalFiles = async (caseId) => {
        try {
            const files = await getDigitalFiles(caseId);

            setDigitalFilesMap((prev) => ({
                ...prev,
                [caseId]: files,
            }));
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
    };

    const formatDate = (date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString();
    };

    const isDeadlinePassed = (date) => {
        return new Date(date) < new Date();
    };

    const handleStatusChange = async (caseId, status) => {
        try {
            await updateCaseStatus(caseId, status);

            setCases((prev) =>
                prev.map((item) =>
                    item.id === caseId
                        ? { ...item, status }
                        : item
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this case?")) {
            return;
        }

        try {
            await deleteCase(id);
            alert("Case deleted successfully");
            loadCases();
        } catch (error) {
            alert("Delete failed");
        }
    };
    return (
        <>

            <div className="dashboard-main">

                {showSidebar && (
                    <div
                        className="sidebar-overlay"
                        onClick={() => setShowSidebar(false)}
                    />
                )}

                <Sidebar showSidebar={showSidebar} />

                <div className="main-wrapper">

                    <Header
                        title="Dashboard"
                        setShowSidebar={setShowSidebar}
                    />

                    <div className="main-content">

                        <div className="main-c-inner">
                            <div className="row g-5">

                                <div className="case-area">
                                    <div className="section-heading">
                                        <h4 className="sub-heading">
                                            All Cases
                                        </h4>
                                    </div>
                                    <RecentCasesFilter
                                        statusFilter={statusFilter}
                                        setStatusFilter={setStatusFilter}
                                        deadlineFilter={deadlineFilter}
                                        setDeadlineFilter={setDeadlineFilter}
                                        handleSubmit={handleSubmit}
                                        handleReset={handleReset}
                                    />
                                    <div id="data-table_wrapper" className="dt-container dt-bootstrap5 dt-empty-footer">
                                        <RecentCasesTopBar
                                            entriesPerPage={entriesPerPage}
                                            setEntriesPerPage={setEntriesPerPage}
                                            searchTerm={searchTerm}
                                            setSearchTerm={setSearchTerm}
                                        />

                                        <RecentCasesTable
                                            cases={cases}
                                            previewFilesMap={previewFilesMap}
                                            digitalFilesMap={digitalFilesMap}
                                            loadDigitalFiles={loadDigitalFiles}
                                            handleViewCaseDocument={handleViewCaseDocument}
                                            handleDownloadCaseDocument={handleDownloadCaseDocument}
                                            handleStatusChange={handleStatusChange}
                                            handleDelete={handleDelete}
                                            navigate={navigate}
                                        />
                                        <RecentCasesPagination
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            totalPages={totalPages}
                                            totalCases={totalCases}
                                            entriesPerPage={entriesPerPage}
                                        />
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