import axios from "axios";

function UploadDigitalFiles({
    formData,
    setFormData,
    handleNext,
    handlePrevious,
    errors
}) {

    const handleFileChange = (e) => {

        const selectedFiles =
            Array.from(e.target.files);

        if (selectedFiles.length > 5) {
            alert(
                "You can upload maximum 5 files"
            );
            return;
        }

        setFormData(prev => ({
            ...prev,
            files: [
                ...prev.files,
                ...selectedFiles
            ]
        }));
        if (errors.files) {
            errors.files = "";
        }
    };

    const removeFile = async (
        index
    ) => {

        const file =
            formData.files[index];

        try {
            if (file.id) {

                await axios.delete(
                    `http://localhost:8000/api/case-files/${file.id}`
                );
            }
            const updatedFiles =
                formData.files.filter(
                    (_, i) =>
                        i !== index
                );
            setFormData(prev => ({
                ...prev,
                files:
                    updatedFiles
            }));

        } catch (error) {

            console.log(error);

            alert(
                "Failed to delete file"
            );
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

                {formData.files?.length > 0 &&
                    formData.files.map(
                        (file, index) => (
                            <div
                                key={index}
                                className="upload-item d-flex justify-content-between align-items-center border rounded p-2 mb-2"
                            >

                                <span>
                                    {file.name}
                                </span>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        removeFile(
                                            index
                                        )
                                    }
                                >
                                    Remove
                                </button>

                            </div>
                        )
                    )}

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