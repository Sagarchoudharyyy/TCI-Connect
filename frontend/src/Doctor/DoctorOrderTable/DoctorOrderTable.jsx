
import "../../DoctorStyle/Cases.css";
import {
    FaEye,
    FaUpload,
    FaDownload,
    FaTrash,
    FaEdit
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getCases, deleteCase, updatePreviewStatus } from "../../services/caseService";
import { Link } from "react-router-dom";
import api from "../../services/api";
import DoctorTableFilter from "./DoctorTableFilter";
import DoctorTableHeader from "./DoctorTableHeader";
import DoctorTableBody from "./DoctorTableBody";
import DoctorPagination from "./DoctorPagination";
function DoctorOrderTable({

    title = "All Cases",
    showSubmitButton = true,

}) {
    const [statusFilter, setStatusFilter] = useState("");
    const [deadlineFilter, setDeadlineFilter] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [cases, setCases] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCases, setTotalCases] =
        useState(0);
    const [successMessage,
        setSuccessMessage
    ] = useState("");

    const [selectedFiles, setSelectedFiles] =
        useState([]);

    const [showFilesModal, setShowFilesModal] =
        useState(false);

    const [selectedCategory,
        setSelectedCategory
    ] = useState("");

    const [digitalFilesMap,
        setDigitalFilesMap
    ] = useState({});

    const [previewFilesMap,
        setPreviewFilesMap
    ] = useState({});

    const loadDigitalFiles = async (
        caseId
    ) => {
        try {
            const response = await api.get(`/case_files/${caseId}`);

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
            const response = await api.get(`/case_files/${caseId}`);

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

            const response = await getCases({
                page: currentPage,
                limit: entriesPerPage,
                search: searchTerm || undefined,
                status: statusFilter || undefined,
                deadline: deadlineFilter || undefined
            });

            console.log("API Response:", response);
            console.log("Items:", response.data.items);
            setCases(response.data.items);
            setTotalPages(response.data.pages);
            setTotalCases(response.data.total);

        } catch (error) {
            console.log(error);
        }
    };

    const handleViewFiles = async (
        caseId,
        category
    ) => {
        try {
            const response = await api.get(`/case_files/${caseId}`);
            const files =
                response.data.filter(
                    file =>
                        file.file_category === category
                );

            setSelectedFiles(files);
            setSelectedCategory(category);
            setShowFilesModal(true);

        } catch (error) {
            console.log(error);
        }
    };

    const handleViewCaseDocument =
        async (caseId) => {
            try {
                const response = await api.get(`/case_files/${caseId}`);

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

                const url = `${import.meta.env.VITE_FILE_URL}/${caseDocument.file_path.replace(
                    /\\/g,
                    "/"
                )}`;
                // Open in same tab
                window.location.href = url;

            } catch (error) {
                console.log(error);
            }
        };
    const handleReset = () => {
        setStatusFilter("");
        setDeadlineFilter("");
        setSearchTerm("");
        setCurrentPage(1);
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this case?"
        );

        if (!confirmDelete) return;

        try {

            await deleteCase(id);

            fetchCases();

            setSuccessMessage(
                "Case deleted successfully!"
            );
            setTimeout(() => {
                setSuccessMessage(
                    ""
                );
            }, 3000);

        } catch (error) {

            console.log(error);

            setSuccessMessage(
                "Failed to delete case"
            );

            setTimeout(() => {
                setSuccessMessage(
                    ""
                );
            }, 3000);
        }
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
    useEffect(() => {
        fetchCases();
    }, [
        currentPage,
        entriesPerPage,
        searchTerm,
        statusFilter,
        deadlineFilter
    ]);

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
        <div className="row">
            <div className="col-12">
                <div className="table-card mt-3">
                    <div className="mc-btm-bxx">
                        <div className="case-heading">
                            <div className="section-heading">
                                <h4 className="sub-heading">
                                    {title}
                                </h4>
                            </div>
                            {showSubmitButton && (
                                <div className="case-btn">
                                    <Link to="/client/new-cases" className="submit-link">
                                        <button className="submit-btn text-white">
                                            Submit a Case
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <DoctorTableFilter
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            deadlineFilter={deadlineFilter}
                            setDeadlineFilter={setDeadlineFilter}
                            setCurrentPage={setCurrentPage}
                            handleReset={handleReset}
                        />
                        <DoctorTableHeader
                            successMessage={successMessage}
                            entriesPerPage={entriesPerPage}
                            setEntriesPerPage={setEntriesPerPage}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            setCurrentPage={setCurrentPage}
                        />

                        <div className="table-responsive">
                            <div className="row mt-2 justify-content-between dt-layout-table">
                                <div className="d-md-flex justify-content-between align-items-center col-12 dt-layout-full col-md">
                                    <table id="data-table" className="table table-striped custom-table dataTable">
                                        <colgroup>
                                            <col data-dt-column="0" style={{ width: "66.9625px" }} />
                                            <col data-dt-column="1" style={{ width: "105.625px" }} />
                                            <col data-dt-column="2" style={{ width: "162.5px" }} />
                                            <col data-dt-column="3" style={{ width: "51.65px" }} />
                                            <col data-dt-column="4" style={{ width: "76.825px" }} />
                                            <col data-dt-column="5" style={{ width: "165.2px" }} />
                                            <col data-dt-column="6" style={{ width: "133.812px" }} />
                                            <col data-dt-column="7" style={{ width: "113.8px" }} />
                                            <col data-dt-column="8" style={{ width: "79.7625px" }} />
                                            <col data-dt-column="9" style={{ width: "78.0625px" }} />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th className="text-center">Case Id</th>
                                                <th className="text-center">Patient Name</th>
                                                <th className="text-center">Appointment Date</th>
                                                <th className="text-center">Age</th>
                                                <th className="text-center">Case PDF</th>
                                                <th className="text-center">Digital Files</th>
                                                <th className="text-center">Delivery Deadline</th>
                                                <th className="text-center">Preview Status</th>
                                                <th className="text-center">Status</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <DoctorTableBody
                                            cases={cases}
                                            previewFilesMap={previewFilesMap}
                                            digitalFilesMap={digitalFilesMap}
                                            handleViewCaseDocument={handleViewCaseDocument}
                                            loadDigitalFiles={loadDigitalFiles}
                                            handlePreviewStatus={handlePreviewStatus}
                                            handleDelete={handleDelete}
                                        />
                                    </table>
                                </div>
                            </div>
                            <DoctorPagination
                                cases={cases}
                                currentPage={currentPage}
                                entriesPerPage={entriesPerPage}
                                totalCases={totalCases}
                                totalPages={totalPages}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default DoctorOrderTable;