import Sidebar from "../Sidebar";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
function UploadPreview() {

    const navigate = useNavigate();
    const [previewFiles, setPreviewFiles] = useState([]);
    const { id } = useParams();
    const [caseData, setCaseData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [showSidebar, setShowSidebar] = useState(false);

    const handlePreviewUpload = async (e) => {
        const files = Array.from(e.target.files);

        const uniqueFiles = files.filter((file) => {
            return !previewFiles.some(
                (item) =>
                    item.file.name === file.name &&
                    item.file.size === file.size &&
                    item.file.lastModified === file.lastModified
            );
        });

        const newFiles = uniqueFiles.map((file) => ({
            file,
            progress: 0,
            status: "uploading",
        }));

        setPreviewFiles((prev) => [
            ...prev,
            ...newFiles,
        ]);

        for (const file of uniqueFiles) {
            const formData = new FormData();

            formData.append(
                "category",
                "preview_file"
            );

            formData.append(
                "file",
                file
            );

            try {
                const response = await api.post(
                    `/cases/${id}/upload`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        onUploadProgress: (progressEvent) => {
                            if (!progressEvent.total) return;

                            const percent = Math.round(
                                (progressEvent.loaded * 100) / progressEvent.total
                            );

                            setPreviewFiles((prev) =>
                                prev.map((f) =>
                                    f.file.name === file.name
                                        ? {
                                            ...f,
                                            progress: percent,
                                            status: "uploading",
                                        }
                                        : f
                                )
                            );
                        },
                    }
                );
                setPreviewFiles((prev) =>
                    prev.map((f) =>
                        f.file.name === file.name
                            ? {
                                ...f,
                                id: response.data.file_id,
                                progress: 100,
                                status: "uploaded",
                            }
                            : f
                    )
                );
            } catch (error) {
                console.log(error);
            }
        }

        e.target.value = "";
    };

    const removeFile = async (fileId) => {
        try {
            await api.delete(`/case-files/${fileId}`);
            setPreviewFiles((prev) =>
                prev.filter(
                    (item) =>
                        item.id !== fileId
                )
            );
        }
        catch (error) {
            alert(
                "Failed to remove file."
            );
        }
    };

    useEffect(() => {
        getCaseDetails();
    }, []);

    const getCaseDetails = async () => {
        try {

            const response = await api.get(`/cases/${id}`);
            setCaseData(response.data);

        }
        catch (error) {
            console.error(error);
        }
    };
    const submitPreviewFiles = async () => {
        try {
            setIsSubmitting(true);

            await api.put(`/cases/${id}/confirm-preview-files`);
            setSuccessMsg(
                "Preview files submitted successfully!"
            );

            setTimeout(() => {
                navigate("/admin/dashboard");
            }, 2000);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = async () => {
        try {
            const filesToDelete = previewFiles.filter(
                (file) => file.id
            );

            await Promise.all(
                filesToDelete.map((file) =>
                    api.delete(`/case-files/${file.id}`)
                )
            );
            setPreviewFiles([]);

            navigate("/admin/dashboard");
        }
        catch (error) {
            console.error(error);
            alert(
                "Failed to cancel upload."
            );
        }
    };
    return (
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
                        <div className="container mt-4">
                            <div className="card">
                                <div className="card-header bg-primary text-white">
                                    <h4 className="mb-0">Upload Design Preview – Case #{caseData?.id}</h4>
                                    <small>Patient:{caseData?.patient_name}</small>
                                </div>
                                <div className="card-body">
                                    <p className="text-muted mb-4">
                                        "Files are merged on server immediately — but only kept if you click "Submit Preview Files"
                                        <br />
                                        <strong>Removed or canceled files are deleted from disk</strong>
                                    </p>
                                    <div className="mb-3">
                                        <input
                                            type="file"
                                            id="previewUpload"
                                            multiple
                                            disabled={isSubmitting}
                                            accept=".stl,.obj,.zip,.jpg,.jpeg,.png,.ply"
                                            className="form-control"
                                            onChange={handlePreviewUpload}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        {previewFiles.map((item) => (
                                            <div
                                                key={item.file.name}
                                                className="d-flex align-items-center gap-3 mb-3 p-2 border rounded"
                                            >
                                                <span style={{ width: "350px" }}>
                                                    {item.file.name}
                                                </span>

                                                <span
                                                    className={`badge ${item.status === "uploaded"
                                                        ? "bg-success"
                                                        : "bg-secondary"
                                                        }`}
                                                >
                                                    {item.status}
                                                </span>

                                                <div className="progress flex-grow-1">
                                                    <div
                                                        className="progress-bar"
                                                        role="progressbar"
                                                        style={{
                                                            width: `${item.progress}%`,
                                                        }}
                                                    >
                                                        {item.progress}%
                                                    </div>
                                                </div>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        removeFile(item.id)
                                                    }
                                                    disabled={
                                                        item.status !== "uploaded"
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="validation-msg" id="errorPreviewFiles"></div>
                                    <div className="text-success small mb-3">
                                        {successMsg}
                                    </div>
                                    <div className="d-flex justify-content-between mt-4">
                                        <button
                                            className="btn btn-secondary px-4"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="btn btn-primary px-5"
                                            id="submitPreviewBtn"
                                            onClick={submitPreviewFiles}
                                            disabled={
                                                previewFiles.length === 0 ||
                                                isSubmitting ||
                                                previewFiles.some(
                                                    (file) => file.status !== "uploaded"
                                                )
                                            }
                                        >
                                            Submit Preview Files
                                        </button>
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
export default UploadPreview;
