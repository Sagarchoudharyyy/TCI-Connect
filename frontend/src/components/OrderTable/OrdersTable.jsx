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
import OrdersFilters from "./OrdersFilter";
import OrdersToolbar from "./OrdersToolBar";
import OrderTableContent from "./OrderTableContent";
import OrderTablePagination from "./OrderTablePagination";
function OrdersTable() {
    const [cases, setCases] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const [totalCases, setTotalCases] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [deadlineFilter, setDeadlineFilter] = useState("");
    const [showWelcome, setShowWelcome] = useState(true);
    const [selectedFiles, setSelectedFiles] =
        useState([]);
    const [showFilesModal, setShowFilesModal] =
        useState(false);
    const [previewFilesMap, setPreviewFilesMap] =
        useState({});
    const [digitalFilesMap, setDigitalFilesMap] =
        useState({});

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        fetchCases();
    },
        [
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

            const response =
                await axios.get(
                    `http://127.0.0.1:8000/api/case_files/${caseId}`
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

    useEffect(() => {
        cases.forEach(item => {

            if (!previewFilesMap[item.id]) {
                loadPreviewFiles(item.id);
            }
        });
    }, [cases]);
    const fetchCases = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/cases",
                {
                    params:
                    {
                        page: currentPage, limit: entriesPerPage,
                        search: searchTerm || undefined,
                        status: statusFilter || undefined,
                        deadline: deadlineFilter || undefined
                    }
                });
            setCases(response.data.items);
            setTotalPages(response.data.pages);
            setTotalCases(response.data.total);
        } catch (error) {
            console.error("Failed to fetch cases:", error);
        }
    };
    const handleReset = () => {
        setStatusFilter("");
        setDeadlineFilter("");
        setSearchTerm("");
        setCurrentPage(1);
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
    const handleViewPreviewFile =
        async (caseId) => {
            try {
                const response =
                    await axios.get(
                        `http://127.0.0.1:8000/api/case_files/${caseId}`
                    );

                const previewFile =
                    response.data.find(
                        file =>
                            file.file_category ===
                            "preview_file"
                    );

                if (!previewFile) {
                    alert(
                        "No preview file found."
                    );
                    return;
                }

                const url =
                    `http://127.0.0.1:8000/${previewFile.file_path.replace(
                        /\\/g,
                        "/"
                    )}`;

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
    };


    const formatDate = (date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString();
    };

    const isDeadlinePassed = (date) => {
        return new Date(date) < new Date();
    };


    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this case?");
        if (!confirmDelete)
            return;
        try {
            await axios.delete(`http://127.0.0.1:8000/api/cases/${id}`);

            fetchCases();
            alert("Case deleted successfully");
        }
        catch (error) {
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
                fetchCases();

            } catch (error) {

                console.log(
                    error.response?.data
                )
            }
        };
    const handleViewFiles = async (
        caseId
    ) => {
        try {
            const response =
                await axios.get(
                    `http://127.0.0.1:8000/api/case_files/${caseId}`
                );

            const digitalFiles =
                response.data.filter(
                    file =>
                        file.file_category ===
                        "digital_file"
                );

            setSelectedFiles(
                digitalFiles
            );

            setShowFilesModal(true);

        } catch (error) {
            console.log(error);
        }
    };

    const startEntry = totalCases === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1;
    const endEntry = Math.min(currentPage * entriesPerPage, totalCases);

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
            <OrdersFilters
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                deadlineFilter={deadlineFilter}
                setDeadlineFilter={setDeadlineFilter}
                handleSubmit={handleSubmit}
                handleReset={handleReset}
            />
            <OrdersToolbar
                entriesPerPage={entriesPerPage}
                setEntriesPerPage={setEntriesPerPage}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <OrderTableContent
                cases={cases}
                previewFilesMap={previewFilesMap}
                digitalFilesMap={digitalFilesMap}
                loadDigitalFiles={loadDigitalFiles}
                handleStatusChange={handleStatusChange}
                handleDelete={handleDelete}
                navigate={navigate}
            />
            <OrderTablePagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                totalCases={totalCases}
                startEntry={startEntry}
                endEntry={endEntry}
            />
        </div>

    );
}

export default OrdersTable;