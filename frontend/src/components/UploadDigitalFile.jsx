import axios from "axios";
import { useState } from "react";

function UploadDigitalFiles({
    formData,
    setFormData,
    handleNext,
    handlePrevious,
    digitalFiles,
    setDigitalFiles,
    errors
}) {

    const isUploading = digitalFiles?.some(
        (file) => file.status === "uploading"
    );

    const handleFileChange = async (e) => {
        const selectedFiles =
            Array.from(e.target.files);

        if (
            digitalFiles.length +
            selectedFiles.length >
            5
        ) {
            alert(
                "You can upload maximum 5 files"
            );
            return;
        }

        const newFiles =
            selectedFiles.map((file) => ({
                id:
                    Date.now() +
                    Math.random(),
                file,
                progress: 0,
                status: "uploading"
            }));

        setDigitalFiles((prev) => [
            ...prev,
            ...newFiles
        ]);

        newFiles.forEach((fileObj) => {
            uploadFile(fileObj);
        });
        e.target.value = "";
    };
    const uploadFile = async (fileObj) => {
        const uploadData = new FormData();

        uploadData.append("file", fileObj.file);

        try {
            const response = await axios.post(
                "http://localhost:8000/api/temp-upload",
                uploadData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (event) => {
                        const percent = Math.round(
                            (event.loaded * 100) / event.total
                        );

                        setDigitalFiles((prev) =>
                            prev.map((f) =>
                                f.id === fileObj.id
                                    ? {
                                        ...f,
                                        progress: percent,
                                    }
                                    : f
                            )
                        );
                    },
                }
            );

            setDigitalFiles((prev) =>
                prev.map((f) =>
                    f.id === fileObj.id
                        ? {
                            ...f,
                            progress: 100,
                            status: "uploaded",
                            file_name: response.data.file_name,
                            file_path: response.data.file_path,
                            file_type: fileObj.file.type,
                            file_category: "digital_file",
                        }
                        : f
                )
            );
        } catch (error) {
            console.log(error);
        }
    };
    const removeFile = async (index) => {
        const file = digitalFiles[index];

        try {

            if (
                file.file_path &&
                !file.file_path.includes("temp_uploads")
            ) {
                await axios.delete(
                    `http://localhost:8000/api/case-files/${file.id}`
                );
            } else if (
                file.file_path?.includes("temp_uploads")
            ) {
                await axios.delete(
                    "http://localhost:8000/api/delete-temp-file",
                    {
                        data: {
                            file_path: file.file_path,
                        },
                    }
                );
            }

            setDigitalFiles((prev) =>
                prev.filter((_, i) => i !== index)
            );


            setFormData((prev) => ({
                ...prev,
                files: prev.files.filter(
                    (_, i) => i !== index
                ) || [],
            }));
        } catch (error) {
            alert("Failed to delete file");
        }
    };
    return (
        <div className="step-content active">

            <h2
                className="text-xl fw-semibold mb-4"
                style={{ color: "#0152a8" }}
            >
                2. Upload Digital Files
                (Max 5)
                <span className="required-star">
                    *
                </span>
            </h2>

            <p
                className="text-muted mb-2"
                style={{
                    fontSize: "14px",
                    color: "#555"
                }}
            >
                • Accepted formats:
                <strong>
                    STL, OBJ, ZIP,
                    JPG, JPEG, PNG
                </strong>
            </p>

            <input
                type="file"
                multiple
                accept=".stl,.obj,.zip,.jpg,.jpeg,.png"
                className="form-control mb-3"
                onChange={handleFileChange}
            />
            {
                errors?.files && (
                    <p className="text-danger mb-2">
                        {errors.files}
                    </p>
                )
            }
            <div>
                {digitalFiles.map((item, index) => (
                    <div
                        key={item.id}
                        className="border rounded p-3 mb-3"
                    >
                        <div className="d-flex justify-content-between align-items-start">

                            <div className="flex-grow-1 me-3">

                                <div className="mb-2">
                                    {item.file?.name ?? item.file_name}
                                </div>

                                {item.status === "uploading" && (
                                    <div className="progress">
                                        <div
                                            className="progress-bar progress-bar-striped progress-bar-animated"
                                            role="progressbar"
                                            style={{
                                                width: `${item.progress}%`,
                                            }}
                                        >
                                            {item.progress}%
                                        </div>
                                    </div>
                                )}

                            </div>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                    removeFile(index)
                                }
                                disabled={
                                    item.status !== "uploaded"
                                }
                            >
                                Remove
                            </button>

                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-between mt-4">

                <button
                    className="btn btn-outline-primary"
                    onClick={handlePrevious}
                >
                    Previous
                </button>

                <button
                    className="btn btn-primary"
                    onClick={handleNext}
                >
                    Next
                </button>

            </div>
        </div>
    );
}

export default UploadDigitalFiles;