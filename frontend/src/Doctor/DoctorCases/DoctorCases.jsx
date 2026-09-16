import DoctorSideBar from "../../components/DoctorSideBar";
import DoctorHeader from "../../components/DoctorHeader";
import "../../DoctorStyle/Cases.css";

import DoctorCaseFilter from "./DoctorCaseFilter";
import DoctorCaseTopBar from "./DoctorCaseTopBar";
import DoctorCasePagination from "./DoctorCasePagination";
import DoctorCaseTable from "./DoctorCaseTable";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

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
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [digitalFilesMap, setDigitalFilesMap] = useState({});
    const [previewFilesMap, setPreviewFilesMap] = useState({});
    const [caseDocumentMap, setCaseDocumentMap] = useState({});

    const fetchCasesRef = useRef(null);

    const loadCaseDocuments = async (caseId) => {
        try {
            const response = await api.get(`/case_files/${caseId}`);

            const files = response.data.filter(
                file => file.file_category === "case_document"
            );

            setCaseDocumentMap(prev => ({
                ...prev,
                [caseId]: files
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const loadDigitalFiles = async (caseId) => {
        try {
            const response = await api.get(`/case_files/${caseId}`);

            const files = response.data.filter(
                file => file.file_category === "digital_file"
            );

            setDigitalFilesMap(prev => ({
                ...prev,
                [caseId]: files
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const loadPreviewFiles = async (caseId) => {
        try {
            const response = await api.get(`/case_files/${caseId}`);

            const files = response.data.filter(
                file => file.file_category === "preview_file"
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
                limit: entriesPerPage
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

            const response = await api.get("/cases", {
                params
            });

            setCases(response.data.items);
            setTotalPages(response.data.pages);
            setTotalRecords(response.data.total);
        } catch (error) {
            console.log(error);
        }
    };

    fetchCasesRef.current = fetchCases;

    const handleViewCaseDocument = async (caseId) => {
        try {
            const response = await api.get(`/case_files/${caseId}`);

            const caseDocument = response.data.find(
                file => file.file_category === "case_document"
            );

            if (!caseDocument) {
                alert("No case document found.");
                return;
            }

            const url = `${import.meta.env.VITE_FILE_URL}/${caseDocument.file_path.replace(/\\/g, "/")}`;

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
        return await api.put(
            `/cases/${caseId}/preview-status`,
            {
                preview_status: status
            }
        );
    };

    const handlePreviewStatus = async (caseId, status) => {
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

    const handleDelete = async (caseId) => {
        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete?"
            );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/cases/${caseId}`);

            if (
                cases.length === 1 &&
                currentPage > 1
            ) {
                setCurrentPage(
                    currentPage - 1
                );
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
            setDebouncedSearch(
                searchTerm.trim()
            );
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

    useEffect(() => {
        const storedUser =
            localStorage.getItem("user");

        if (!storedUser) {
            return;
        }

        let user;

        try {
            user = JSON.parse(storedUser);
        } catch (error) {
            console.log(
                "Invalid user data:",
                error
            );
            return;
        }

        const userId = user?.id;

        if (!userId) {
            console.log(
                "Doctor user ID not found"
            );
            return;
        }

        const apiUrl =
            import.meta.env.VITE_API_URL;

        if (!apiUrl) {
            console.log(
                "VITE_API_URL is not configured"
            );
            return;
        }

        let wsUrl;

        try {
            const parsedUrl =
                new URL(apiUrl);

            const wsProtocol =
                parsedUrl.protocol === "https:"
                    ? "wss:"
                    : "ws:";

            const basePath =
                parsedUrl.pathname.replace(
                    /\/api\/?$/,
                    ""
                );

            wsUrl =
                `${wsProtocol}//${parsedUrl.host}` +
                `${basePath}/ws/cases/${userId}`;
        } catch (error) {
            console.log(
                "WebSocket URL error:",
                error
            );
            return;
        }

        let websocket;
        let reconnectTimer;
        let isUnmounted = false;

        const connectWebSocket = () => {
            if (isUnmounted) {
                return;
            }

            console.log(
                "DOCTOR CASES WEBSOCKET CONNECTING..."
            );

            console.log(
                "WEBSOCKET URL:",
                wsUrl
            );

            websocket =
                new WebSocket(wsUrl);

            websocket.onopen = () => {
                console.log(
                    "DOCTOR CASES WEBSOCKET CONNECTED"
                );
            };

            websocket.onmessage =
                async (event) => {
                    try {
                        const data =
                            JSON.parse(
                                event.data
                            );

                        console.log(
                            "DOCTOR CASES WEBSOCKET MESSAGE:",
                            data
                        );

                        if (
                            data.type ===
                            "new_case"
                        ) {
                            if (
                                fetchCasesRef.current
                            ) {
                                await fetchCasesRef.current();
                            }
                        }

                        if (
                            data.type ===
                            "preview_uploaded"
                        ) {
                            const caseId =
                                data.case_id;

                            setCases(prev =>
                                prev.map(
                                    item =>
                                        item.id ===
                                            caseId
                                            ? {
                                                ...item,
                                                has_preview_files: true,
                                                preview_status:
                                                    data.preview_status ||
                                                    item.preview_status
                                            }
                                            : item
                                )
                            );

                            if (
                                data.file_id
                            ) {
                                const previewFile = {
                                    id: data.file_id,
                                    file_name: data.file_name,
                                    file_path: data.file_path,
                                    file_type: data.file_type,
                                    file_category:
                                        data.file_category
                                };

                                setPreviewFilesMap(
                                    prev => {
                                        const existingFiles =
                                            prev[
                                            caseId
                                            ] || [];

                                        const alreadyExists =
                                            existingFiles.some(
                                                file =>
                                                    file.id ===
                                                    data.file_id
                                            );

                                        if (
                                            alreadyExists
                                        ) {
                                            return prev;
                                        }

                                        return {
                                            ...prev,
                                            [caseId]: [
                                                ...existingFiles,
                                                previewFile
                                            ]
                                        };
                                    }
                                );
                            } else {
                                loadPreviewFiles(
                                    caseId
                                );
                            }
                        }

                        if (
                            data.type ===
                            "preview_status_updated"
                        ) {
                            setCases(prev =>
                                prev.map(
                                    item =>
                                        item.id ===
                                            data.case_id
                                            ? {
                                                ...item,
                                                preview_status:
                                                    data.preview_status
                                            }
                                            : item
                                )
                            );
                        }

                        if (
                            data.type ===
                            "case_status_updated"
                        ) {
                            setCases(prev =>
                                prev.map(
                                    item =>
                                        item.id ===
                                            data.case_id
                                            ? {
                                                ...item,
                                                status:
                                                    data.status
                                            }
                                            : item
                                )
                            );
                        }
                    } catch (error) {
                        console.log(
                            "DOCTOR CASES WEBSOCKET MESSAGE ERROR:",
                            error
                        );
                    }
                };

            websocket.onerror = (
                error
            ) => {
                console.log(
                    "DOCTOR CASES WEBSOCKET ERROR:",
                    error
                );
            };

            websocket.onclose = () => {
                console.log(
                    "DOCTOR CASES WEBSOCKET DISCONNECTED"
                );

                if (!isUnmounted) {
                    reconnectTimer =
                        setTimeout(() => {
                            connectWebSocket();
                        }, 3000);
                }
            };
        };

        connectWebSocket();

        return () => {
            isUnmounted = true;

            if (reconnectTimer) {
                clearTimeout(
                    reconnectTimer
                );
            }

            if (
                websocket &&
                websocket.readyState ===
                WebSocket.OPEN
            ) {
                websocket.close();
            }
        };
    }, []);

    return (
        <div className="doctor-dashboard-main">

            {showSidebar && (
                <div
                    className="doctor-sidebar-overlay"
                    onClick={() =>
                        setShowSidebar(false)
                    }
                />
            )}

            <DoctorSideBar
                showSidebar={showSidebar}
            />

            <div className="doctor-main-content">

                <DoctorHeader
                    title="Dashboard"
                    setShowSidebar={
                        setShowSidebar
                    }
                />

                <div className="mc-btm-bxx">

                    <div className="case-heading">

                        <div className="section-heading">
                            <h4 className="sub-heading">
                                All Cases
                            </h4>
                        </div>

                        <div className="case-btn">
                            <Link
                                to="/client/new-cases"
                                className="submit-link"
                            >
                                <button className="submit-btn text-white">
                                    Submit a Case
                                </button>
                            </Link>
                        </div>

                    </div>

                    <DoctorCaseFilter
                        statusFilter={
                            statusFilter
                        }
                        setStatusFilter={
                            setStatusFilter
                        }
                        deadlineFilter={
                            deadlineFilter
                        }
                        setDeadlineFilter={
                            setDeadlineFilter
                        }
                        handleSubmit={
                            handleSubmit
                        }
                        handleReset={
                            handleReset
                        }
                        setCurrentPage={
                            setCurrentPage
                        }
                    />

                    <DoctorCaseTopBar
                        entriesPerPage={
                            entriesPerPage
                        }
                        setEntriesPerPage={
                            setEntriesPerPage
                        }
                        searchTerm={
                            searchTerm
                        }
                        setSearchTerm={
                            setSearchTerm
                        }
                        setCurrentPage={
                            setCurrentPage
                        }
                    />

                    <DoctorCaseTable
                        cases={cases}
                        previewFilesMap={
                            previewFilesMap
                        }
                        digitalFilesMap={
                            digitalFilesMap
                        }
                        loadDigitalFiles={
                            loadDigitalFiles
                        }
                        handleViewCaseDocument={
                            handleViewCaseDocument
                        }
                        handlePreviewStatus={
                            handlePreviewStatus
                        }
                        handleDelete={
                            handleDelete
                        }
                    />

                    <DoctorCasePagination
                        currentPage={
                            currentPage
                        }
                        setCurrentPage={
                            setCurrentPage
                        }
                        totalPages={
                            totalPages
                        }
                        totalRecords={
                            totalRecords
                        }
                        entriesPerPage={
                            entriesPerPage
                        }
                    />

                </div>

            </div>

        </div>
    );
}

export default DoctorCases;