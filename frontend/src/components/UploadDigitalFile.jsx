import api from "../services/api";
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
    // const uploadFile = async (fileObj) => {
    //     const uploadData = new FormData();

    //     uploadData.append("file", fileObj.file);

    //     try {
    //         const response = await api.post(
    //             "/temp-upload",
    //             uploadData,
    //             {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data",
    //                 },
    //                 onUploadProgress: (event) => {
    //                     const percent = Math.round(
    //                         (event.loaded * 100) / event.total
    //                     );

    //                     setDigitalFiles((prev) =>
    //                         prev.map((f) =>
    //                             f.id === fileObj.id
    //                                 ? {
    //                                     ...f,
    //                                     progress: percent,
    //                                 }
    //                                 : f
    //                         )
    //                     );
    //                 },
    //             }
    //         );

    //         setDigitalFiles((prev) =>
    //             prev.map((f) =>
    //                 f.id === fileObj.id
    //                     ? {
    //                         ...f,
    //                         progress: 100,
    //                         status: "uploaded",
    //                         file_name: response.data.file_name,
    //                         file_path: response.data.file_path,
    //                         file_type: fileObj.file.type,
    //                         file_category: "digital_file",
    //                     }
    //                     : f
    //             )
    //         );
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const uploadFile = async (fileObj) => {
        const file = fileObj.file;

        // ==========================================
        // CONFIGURATION
        // ==========================================

        const CHUNK_SIZE = 8 * 1024 * 1024; // 8 MB
        const MAX_PARALLEL = 6;

        const totalChunks = Math.ceil(
            file.size / CHUNK_SIZE
        );

        // Store uploaded bytes for every chunk
        const chunkProgress = new Array(
            totalChunks
        ).fill(0);

        // ==========================================
        // UPDATE OVERALL PROGRESS
        // ==========================================

        const updateOverallProgress = () => {
            const uploadedBytes =
                chunkProgress.reduce(
                    (total, value) =>
                        total + value,
                    0
                );

            const percent = Math.min(
                100,
                Math.round(
                    (uploadedBytes / file.size) * 100
                )
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
        };

        try {

            // ==========================================
            // STEP 1: INITIALIZE UPLOAD
            // ==========================================

            console.log(
                "Starting upload:",
                file.name
            );

            console.log(
                "File size:",
                file.size,
                "bytes"
            );

            console.log(
                "Total chunks:",
                totalChunks
            );

            const initData =
                new FormData();

            initData.append(
                "file_name",
                file.name
            );

            initData.append(
                "total_size",
                file.size.toString()
            );

            const initResponse =
                await api.post(
                    "/upload/init",
                    initData
                );

            console.log(
                "Upload initialized:",
                initResponse.data
            );

            const uploadId =
                initResponse.data.upload_id;

            if (!uploadId) {
                throw new Error(
                    "Upload ID was not returned by server"
                );
            }

            // ==========================================
            // STEP 2: UPLOAD ONE CHUNK
            // ==========================================

            const uploadChunk = async (
                chunkNumber
            ) => {

                const start =
                    chunkNumber *
                    CHUNK_SIZE;

                const end =
                    Math.min(
                        start + CHUNK_SIZE,
                        file.size
                    );

                const chunk =
                    file.slice(
                        start,
                        end
                    );

                console.log(
                    `Uploading chunk ${chunkNumber + 1}/${totalChunks}`
                );

                const chunkData =
                    new FormData();

                chunkData.append(
                    "upload_id",
                    uploadId
                );

                chunkData.append(
                    "chunk_number",
                    chunkNumber.toString()
                );

                chunkData.append(
                    "file",
                    chunk,
                    file.name
                );

                await api.post(
                    "/upload/chunk",
                    chunkData,
                    {
                        onUploadProgress: (
                            event
                        ) => {

                            if (
                                !event.total
                            ) {
                                return;
                            }

                            // Current uploaded
                            // bytes for this chunk
                            chunkProgress[
                                chunkNumber
                            ] =
                                event.loaded;

                            updateOverallProgress();
                        },
                    }
                );

                // ==========================================
                // CHUNK COMPLETED
                // ==========================================

                chunkProgress[
                    chunkNumber
                ] = chunk.size;

                updateOverallProgress();

                console.log(
                    `Chunk ${chunkNumber + 1}/${totalChunks} completed`
                );
            };

            // ==========================================
            // STEP 3:
            // UPLOAD 3 CHUNKS AT A TIME
            // ==========================================

            for (
                let i = 0;
                i < totalChunks;
                i += MAX_PARALLEL
            ) {

                const batch = [];

                for (
                    let j = i;
                    j <
                    Math.min(
                        i + MAX_PARALLEL,
                        totalChunks
                    );
                    j++
                ) {

                    batch.push(
                        uploadChunk(j)
                    );
                }

                // Wait until the
                // current 3 chunks finish
                await Promise.all(
                    batch
                );
            }

            // ==========================================
            // STEP 4:
            // COMPLETE UPLOAD
            // ==========================================

            console.log(
                "All chunks uploaded."
            );

            const completeData =
                new FormData();

            completeData.append(
                "upload_id",
                uploadId
            );

            completeData.append(
                "file_name",
                file.name
            );

            completeData.append(
                "total_chunks",
                totalChunks.toString()
            );

            const completeResponse =
                await api.post(
                    "/upload/complete",
                    completeData
                );

            console.log(
                "Upload completed:",
                completeResponse.data
            );

            // ==========================================
            // STEP 5:
            // UPDATE UI
            // ==========================================

            setDigitalFiles((prev) =>
                prev.map((f) =>
                    f.id === fileObj.id
                        ? {
                            ...f,

                            progress: 100,

                            status:
                                "uploaded",

                            file_name:
                                completeResponse
                                    .data
                                    .file_name,

                            file_path:
                                completeResponse
                                    .data
                                    .file_path,

                            file_type:
                                file.type,

                            file_category:
                                "digital_file",
                        }
                        : f
                )
            );

        } catch (error) {

            console.error(
                "Chunk upload failed:",
                error
            );

            // Show backend response
            // if available
            if (
                error.response
            ) {
                console.error(
                    "Status:",
                    error.response.status
                );

                console.error(
                    "Response:",
                    error.response.data
                );
            }

            setDigitalFiles((prev) =>
                prev.map((f) =>
                    f.id === fileObj.id
                        ? {
                            ...f,
                            status: "error",
                        }
                        : f
                )
            );
        }
    };


    const removeFile = async (index) => {
        const file = digitalFiles[index];

        try {

            if (
                file.file_path &&
                !file.file_path.includes("temp_uploads")
            ) {
                await api.delete(`/case-files/${file.id}`);
            } else if (
                file.file_path?.includes("temp_uploads")
            ) {
                await api.delete("/delete-temp-file", {
                    data: {
                        file_path: file.file_path,
                    },
                });
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