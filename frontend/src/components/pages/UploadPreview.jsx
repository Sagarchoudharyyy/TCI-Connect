import Sidebar from "../Sidebar";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function UploadPreview() {

    const navigate = useNavigate();
    const [previewFiles, setPreviewFiles] = useState([]);
    const { id } = useParams();
    const [caseData, setCaseData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const handlePreviewUpload = (e) => {
        setPreviewFiles(
            Array.from(e.target.files)
        );
    };

    useEffect(() => {
        getCaseDetails();
    }, []);

    const getCaseDetails = async () => {
        try {

            const response = await axios.get(
                `http://127.0.0.1:8000/api/cases/${id}`
            );

            setCaseData(response.data);

        }
        catch (error) {
            console.error(error);
        }
    };

    const submitPreviewFiles = async () => {

        try {

            setIsSubmitting(true);

            for (const file of previewFiles) {

                const formData =
                    new FormData();

                formData.append(
                    "category",
                    "preview_file"
                );

                formData.append(
                    "file",
                    file
                );

                await axios.post(
                    `http://127.0.0.1:8000/api/cases/${id}/upload`,
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data"
                        }
                    }
                );

            }

            setSuccessMsg(
                "Preview files uploaded successfully!"
            );

            setTimeout(() => {

                navigate("/admin/dashboard");

            }, 2000);

        }
        catch (error) {

            console.error(error);

            alert(
                "Failed to upload preview files."
            );

        }
        finally {

            setIsSubmitting(false);

        }
    };
    return (
        <div className="container-fluid">
            <div className="dashboard-main">
                <div className="row g-0">

                    <Sidebar />

                    <div className="offset-2 col-12 col-md-9 col-lg-9 
                    offset-lg-3 col-xl-9 col-xxl-10 offset-xl-3 offset-xxl-2 
                    main-content">

                        <Header title="Dashboard" />

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
                                                accept=".stl,.obj,.zip,.jpg,.jpeg,.png,.ply"
                                                className="form-control"
                                                onChange={handlePreviewUpload}
                                            />
                                        </div>
                                        <div id="previewUploadList" className="mb-4"></div>
                                        <div className="validation-msg" id="errorPreviewFiles"></div>
                                        <div className="text-success small mb-3" id="successPreviewFiles"></div>
                                        <div className="d-flex justify-content-between mt-4">
                                            <button
                                                className="btn btn-secondary px-4"
                                                onClick={() => navigate(-1)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="btn btn-primary px-5"
                                                id="submitPreviewBtn"
                                                onClick={submitPreviewFiles}
                                                disabled={previewFiles.length === 0}
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
        </div>
    )
}
export default UploadPreview;