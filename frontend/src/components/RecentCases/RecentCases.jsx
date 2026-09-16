


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


    /*
    ============================================================
    LOAD PREVIEW FILES
    ============================================================
    */

    const loadPreviewFiles = async (caseId) => {

        try {

            const files = await getPreviewFiles(caseId);

            setPreviewFilesMap((prev) => ({
                ...prev,
                [caseId]: files,
            }));

        } catch (error) {

            console.log(
                "Failed to load preview files:",
                error
            );

        }
    };


    /*
    ============================================================
    LOAD DIGITAL FILES
    ============================================================
    */

    const loadDigitalFiles = async (caseId) => {

        try {

            const files = await getDigitalFiles(caseId);

            setDigitalFilesMap((prev) => ({
                ...prev,
                [caseId]: files,
            }));

        } catch (error) {

            console.log(
                "Failed to load digital files:",
                error
            );

        }
    };


    /*
    ============================================================
    LOAD CASES
    ============================================================
    */

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

            console.log(
                "Failed to load cases:",
                error
            );

        }
    };


    /*
    ============================================================
    ADMIN CASE WEBSOCKET
    ============================================================
    */

    useEffect(() => {

        /*
         * VITE_API_URL is normally something like:
         *
         * http://127.0.0.1:8000/api
         *
         * or:
         *
         * https://tcidentallab.com/api
         *
         * Our WebSocket endpoint is at:
         *
         * /ws/admin/cases
         *
         * Therefore we remove /api before creating
         * the WebSocket URL.
         */

        const apiUrl =
            import.meta.env.VITE_API_URL;

        if (!apiUrl) {

            console.error(
                "VITE_API_URL is not configured"
            );

            return;
        }


        const websocketBaseUrl =
            apiUrl
                .replace(/^http:\/\//, "ws://")
                .replace(/^https:\/\//, "wss://")
                .replace(/\/api\/?$/, "");


        const websocketUrl =
            `${websocketBaseUrl}/ws/admin/cases`;


        console.log(
            "===================================="
        );

        console.log(
            "ADMIN CASE WEBSOCKET CONNECTING..."
        );

        console.log(
            "WEBSOCKET URL:",
            websocketUrl
        );

        console.log(
            "===================================="
        );


        const socket =
            new WebSocket(websocketUrl);


        /*
        ========================================================
        CONNECTION OPEN
        ========================================================
        */

        socket.onopen = () => {

            console.log(
                "===================================="
            );

            console.log(
                "ADMIN CASE WEBSOCKET CONNECTED"
            );

            console.log(
                "URL:",
                websocketUrl
            );

            console.log(
                "===================================="
            );
        };


        /*
        ========================================================
        RECEIVE WEBSOCKET MESSAGE
        ========================================================
        */

        socket.onmessage = (event) => {

            try {

                const data =
                    JSON.parse(event.data);


                console.log(
                    "ADMIN CASE WEBSOCKET MESSAGE:",
                    data
                );


                /*
                =================================================
                CASE STATUS UPDATED
                =================================================
                */

                if (
                    data.type ===
                    "case_status_updated"
                ) {

                    console.log(
                        "CASE STATUS UPDATE RECEIVED:",
                        data
                    );


                    setCases((prevCases) =>
                        prevCases.map((item) =>
                            item.id === data.case_id
                                ? {
                                    ...item,
                                    status:
                                        data.status,
                                }
                                : item
                        )
                    );

                }


                /*
                =================================================
                PREVIEW STATUS UPDATED
                =================================================
                */

                else if (
                    data.type ===
                    "preview_status_updated"
                ) {

                    console.log(
                        "PREVIEW STATUS UPDATE RECEIVED:",
                        data
                    );


                    setCases((prevCases) =>
                        prevCases.map((item) =>
                            item.id === data.case_id
                                ? {
                                    ...item,
                                    preview_status:
                                        data.preview_status,
                                }
                                : item
                        )
                    );

                }


                /*
                =================================================
                PREVIEW FILE UPLOADED
                =================================================
                */

                else if (
                    data.type ===
                    "preview_uploaded"
                ) {

                    console.log(
                        "PREVIEW UPLOAD UPDATE RECEIVED:",
                        data
                    );


                    /*
                     * Update preview status.
                     */

                    setCases((prevCases) =>
                        prevCases.map((item) =>
                            item.id === data.case_id
                                ? {
                                    ...item,
                                    preview_status:
                                        data.preview_status,
                                    has_preview_files:
                                        true,
                                }
                                : item
                        )
                    );


                    /*
                     * Add the newly uploaded file
                     * to the preview files map.
                     */

                    if (data.file_id) {

                        setPreviewFilesMap(
                            (prev) => {

                                const existingFiles =
                                    prev[data.case_id] || [];


                                /*
                                 * Prevent duplicate file.
                                 */

                                const alreadyExists =
                                    existingFiles.some(
                                        (file) =>
                                            file.id ===
                                            data.file_id
                                    );


                                if (alreadyExists) {

                                    return prev;
                                }


                                return {
                                    ...prev,

                                    [data.case_id]: [
                                        ...existingFiles,

                                        {
                                            id:
                                                data.file_id,

                                            file_name:
                                                data.file_name,

                                            file_path:
                                                data.file_path,

                                            file_type:
                                                data.file_type,

                                            file_category:
                                                data.file_category,
                                        },
                                    ],
                                };
                            }
                        );
                    }

                }

            } catch (error) {

                console.error(
                    "Failed to process WebSocket message:",
                    error
                );

            }

        };


        /*
        ========================================================
        CONNECTION ERROR
        ========================================================
        */

        socket.onerror = (error) => {

            console.error(
                "ADMIN CASE WEBSOCKET ERROR:",
                error
            );

        };


        /*
        ========================================================
        CONNECTION CLOSED
        ========================================================
        */

        socket.onclose = (event) => {

            console.log(
                "===================================="
            );

            console.log(
                "ADMIN CASE WEBSOCKET DISCONNECTED"
            );

            console.log(
                "CODE:",
                event.code
            );

            console.log(
                "REASON:",
                event.reason
            );

            console.log(
                "===================================="
            );

        };


        /*
        ========================================================
        CLEANUP
        ========================================================
        */

        return () => {

            console.log(
                "Closing Admin Case WebSocket..."
            );

            socket.close();

        };

    }, []);


    /*
    ============================================================
    LOAD CASES WHEN FILTER/PAGINATION CHANGES
    ============================================================
    */

    useEffect(() => {

        loadCases();

    }, [
        currentPage,
        entriesPerPage,
        searchTerm,
        statusFilter,
        deadlineFilter,
    ]);


    /*
    ============================================================
    LOAD PREVIEW FILES FOR CASES
    ============================================================
    */

    useEffect(() => {

        cases.forEach((item) => {

            if (!previewFilesMap[item.id]) {

                loadPreviewFiles(item.id);

            }

        });

    }, [cases]);


    /*
    ============================================================
    DOWNLOAD CASE DOCUMENT
    ============================================================
    */

    const handleDownloadCaseDocument =
        async (caseId) => {

            try {

                await downloadCaseDocument(
                    caseId
                );

            } catch (error) {

                alert(error.message);

            }

        };


    /*
    ============================================================
    VIEW CASE DOCUMENT
    ============================================================
    */

    const handleViewCaseDocument =
        async (caseId) => {

            try {

                await viewCaseDocument(
                    caseId
                );

            } catch (error) {

                alert(error.message);

            }

        };


    /*
    ============================================================
    HANDLE STATUS CHANGE
    ============================================================
    */

    const handleStatusChange =
        async (caseId, status) => {

            try {

                await updateCaseStatus(
                    caseId,
                    status
                );


                /*
                 * Update Admin UI immediately.
                 *
                 * The backend WebSocket event will also
                 * be received once Admin is included in
                 * the backend broadcast.
                 */

                setCases((prev) =>
                    prev.map((item) =>
                        item.id === caseId
                            ? {
                                ...item,
                                status,
                            }
                            : item
                    )
                );

            } catch (error) {

                console.log(error);

            }

        };


    /*
    ============================================================
    HANDLE DELETE
    ============================================================
    */

    const handleDelete = async (id) => {

        if (
            !window.confirm(
                "Are you sure you want to delete this case?"
            )
        ) {

            return;

        }


        try {

            await deleteCase(id);

            alert(
                "Case deleted successfully"
            );

            loadCases();

        } catch (error) {

            alert(
                "Delete failed"
            );

        }

    };


    /*
    ============================================================
    FILTER SUBMIT
    ============================================================
    */

    const handleSubmit = (e) => {

        e.preventDefault();

    };


    /*
    ============================================================
    RESET FILTER
    ============================================================
    */

    const handleReset = () => {

        setStatusFilter("");

        setDeadlineFilter("");

    };


    /*
    ============================================================
    RENDER
    ============================================================
    */

    return (
        <>

            <div className="dashboard-main">

                {showSidebar && (
                    <div
                        className="sidebar-overlay"
                        onClick={() =>
                            setShowSidebar(false)
                        }
                    />
                )}


                <Sidebar
                    showSidebar={
                        showSidebar
                    }
                />


                <div className="main-wrapper">

                    <Header
                        title="Dashboard"
                        setShowSidebar={
                            setShowSidebar
                        }
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
                                    />


                                    <div
                                        id="data-table_wrapper"
                                        className="dt-container dt-bootstrap5 dt-empty-footer"
                                    >

                                        <RecentCasesTopBar
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
                                        />


                                        <RecentCasesTable
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
                                            handleDownloadCaseDocument={
                                                handleDownloadCaseDocument
                                            }
                                            handleStatusChange={
                                                handleStatusChange
                                            }
                                            handleDelete={
                                                handleDelete
                                            }
                                            navigate={
                                                navigate
                                            }
                                        />


                                        <RecentCasesPagination
                                            currentPage={
                                                currentPage
                                            }
                                            setCurrentPage={
                                                setCurrentPage
                                            }
                                            totalPages={
                                                totalPages
                                            }
                                            totalCases={
                                                totalCases
                                            }
                                            entriesPerPage={
                                                entriesPerPage
                                            }
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
}


export default RecentCases;




// import Header from "../Header";
// import Sidebar from "../Sidebar";

// import {
//     fetchCases,
//     getPreviewFiles,
//     getDigitalFiles,
//     downloadCaseDocument,
//     viewCaseDocument,
//     updateCaseStatus,
//     deleteCase,
// } from "./recentCasesApi";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import "../../styles/header.css";
// import "../../styles/sidebar.css";
// import RecentCasesFilter from "./RecentCasesFilter";
// import RecentCasesTopBar from "./RecentCasesTopBar";
// import RecentCasesTable from "./RecentCasesTable";
// import RecentCasesPagination from "./RecentCasesPagination";

// function RecentCases() {
//     const [statusFilter, setStatusFilter] = useState("");
//     const [deadlineFilter, setDeadlineFilter] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [entriesPerPage, setEntriesPerPage] = useState(10);
//     const [searchTerm, setSearchTerm] = useState("");
//     const navigate = useNavigate();
//     const [showSidebar, setShowSidebar] = useState(false);
//     const [cases, setCases] = useState([]);
//     const [totalPages, setTotalPages] = useState(1);
//     const [totalCases, setTotalCases] = useState(0);
//     const [digitalFilesMap, setDigitalFilesMap] =
//         useState({});
//     const [previewFilesMap, setPreviewFilesMap] =
//         useState({});
//     useEffect(() => {
//         loadCases();
//     }, [
//         currentPage,
//         entriesPerPage,
//         searchTerm,
//         statusFilter,
//         deadlineFilter,
//     ]);
//     useEffect(() => {
//         cases.forEach((item) => {
//             if (!previewFilesMap[item.id]) {
//                 loadPreviewFiles(item.id);
//             }
//         });
//     }, [cases]);
//     const loadPreviewFiles = async (caseId) => {
//         try {
//             const files = await getPreviewFiles(caseId);

//             setPreviewFilesMap((prev) => ({
//                 ...prev,
//                 [caseId]: files,
//             }));
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     const handleDownloadCaseDocument = async (caseId) => {
//         try {
//             await downloadCaseDocument(caseId);
//         } catch (error) {
//             alert(error.message);
//         }
//     };

//     const loadCases = async () => {
//         try {
//             const data = await fetchCases({
//                 page: currentPage,
//                 limit: entriesPerPage,
//                 search: searchTerm || undefined,
//                 status: statusFilter || undefined,
//                 deadline: deadlineFilter || undefined,
//             });

//             setCases(data.items);
//             setTotalPages(data.pages);
//             setTotalCases(data.total);
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     const handleViewCaseDocument = async (caseId) => {
//         try {
//             await viewCaseDocument(caseId);
//         } catch (error) {
//             alert(error.message);
//         }
//     };

//     const loadDigitalFiles = async (caseId) => {
//         try {
//             const files = await getDigitalFiles(caseId);

//             setDigitalFilesMap((prev) => ({
//                 ...prev,
//                 [caseId]: files,
//             }));
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     const handleSubmit = (e) => {
//         e.preventDefault();

//     };
//     const handleReset = () => {
//         setStatusFilter("");
//         setDeadlineFilter("");
//     };

//     const formatDate = (date) => {
//         if (!date) return "N/A";
//         return new Date(date).toLocaleDateString();
//     };

//     const isDeadlinePassed = (date) => {
//         return new Date(date) < new Date();
//     };

//     const handleStatusChange = async (caseId, status) => {
//         try {
//             await updateCaseStatus(caseId, status);

//             setCases((prev) =>
//                 prev.map((item) =>
//                     item.id === caseId
//                         ? { ...item, status }
//                         : item
//                 )
//             );
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this case?")) {
//             return;
//         }

//         try {
//             await deleteCase(id);
//             alert("Case deleted successfully");
//             loadCases();
//         } catch (error) {
//             alert("Delete failed");
//         }
//     };
//     return (
//         <>

//             <div className="dashboard-main">

//                 {showSidebar && (
//                     <div
//                         className="sidebar-overlay"
//                         onClick={() => setShowSidebar(false)}
//                     />
//                 )}

//                 <Sidebar showSidebar={showSidebar} />

//                 <div className="main-wrapper">

//                     <Header
//                         title="Dashboard"
//                         setShowSidebar={setShowSidebar}
//                     />

//                     <div className="main-content">

//                         <div className="main-c-inner">
//                             <div className="row g-5">

//                                 <div className="case-area">
//                                     <div className="section-heading">
//                                         <h4 className="sub-heading">
//                                             All Cases
//                                         </h4>
//                                     </div>
//                                     <RecentCasesFilter
//                                         statusFilter={statusFilter}
//                                         setStatusFilter={setStatusFilter}
//                                         deadlineFilter={deadlineFilter}
//                                         setDeadlineFilter={setDeadlineFilter}
//                                         handleSubmit={handleSubmit}
//                                         handleReset={handleReset}
//                                     />
//                                     <div id="data-table_wrapper" className="dt-container dt-bootstrap5 dt-empty-footer">
//                                         <RecentCasesTopBar
//                                             entriesPerPage={entriesPerPage}
//                                             setEntriesPerPage={setEntriesPerPage}
//                                             searchTerm={searchTerm}
//                                             setSearchTerm={setSearchTerm}
//                                         />

//                                         <RecentCasesTable
//                                             cases={cases}
//                                             previewFilesMap={previewFilesMap}
//                                             digitalFilesMap={digitalFilesMap}
//                                             loadDigitalFiles={loadDigitalFiles}
//                                             handleViewCaseDocument={handleViewCaseDocument}
//                                             handleDownloadCaseDocument={handleDownloadCaseDocument}
//                                             handleStatusChange={handleStatusChange}
//                                             handleDelete={handleDelete}
//                                             navigate={navigate}
//                                         />
//                                         <RecentCasesPagination
//                                             currentPage={currentPage}
//                                             setCurrentPage={setCurrentPage}
//                                             totalPages={totalPages}
//                                             totalCases={totalCases}
//                                             entriesPerPage={entriesPerPage}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
// export default RecentCases;