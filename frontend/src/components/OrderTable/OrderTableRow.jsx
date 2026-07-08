import {
    FaEye,
    FaUpload,
    FaDownload,
    FaTrash
} from "react-icons/fa";

function OrderTableRow({
    item,
    previewFilesMap,
    digitalFilesMap,
    loadDigitalFiles,
    handleStatusChange,
    handleDelete,
    navigate
}) {
    const previewFiles = previewFilesMap || [];
    return (
        <tr>
            <td className="text-center">
                <img
                    src={
                        item.profile_image
                            ? `${import.meta.env.VITE_FILE_URL}/${item.profile_image.replace(/\\/g, "/")}`
                            : "/images/default-profile.png"
                    }
                    alt="profile"
                    width="40"
                />
            </td>
            <td>{item.id}</td>

            <td>{item.doctor_name}</td>

            <td>{item.phone_number}</td>

            <td>{item.patient_name}</td>

            <td >
                {
                    item.files
                        ?.filter(
                            file =>
                                file.file_category === "case_document"
                        )
                        .map((file, index) => (
                            <div key={index}>
                                <a
                                    href={`${import.meta.env.VITE_FILE_URL}/${file.file_path.replace(/\\/g, "/")}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        color: "#0152a8",
                                        textDecoration: "none",
                                        marginRight: "10px"
                                    }}
                                >
                                    <FaEye />
                                </a>

                                <a
                                    href={`${import.meta.env.VITE_API_URL}/download-file?file_path=${encodeURIComponent(file.file_path)}`}
                                    style={{
                                        color: "#0152a8"
                                    }}
                                >
                                    <FaDownload />
                                </a>
                            </div>
                        ))
                }
                {
                    !item.files?.some(
                        file =>
                            file.file_category === "case_document"
                    ) && <span>No File</span>
                }
            </td>
            <td className="text-center">

                {
                    digitalFilesMap?.map((file, index) => (
                        <div key={file.id}>

                            <a
                                href={`${import.meta.env.VITE_FILE_URL}/${file.file_path.replace(/\\/g, "/")}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    textDecoration: "none",
                                    marginRight: "12px",
                                    color: "#0152a8"
                                }}
                            >
                                Preview File {index + 1}
                                {" "}
                                (
                                {file.file_name
                                    .split(".")
                                    .pop()
                                    .toUpperCase()}
                                )
                            </a>

                            <a
                                href={`${import.meta.env.VITE_API_URL}/download-file?file_path=${encodeURIComponent(
                                    file.file_path
                                )}`}
                                style={{
                                    color: "#0152a8"
                                }}
                            >
                                <FaDownload />
                            </a>

                        </div>
                    ))
                }

                {
                    item.has_digital_files &&
                    digitalFilesMap.length === 0 && (
                        <button
                            className="btn btn-link p-0"
                            onClick={() =>
                                loadDigitalFiles(
                                    item.id
                                )
                            }
                        >
                            View Files
                        </button>
                    )
                }

                {
                    !item.has_digital_files &&
                    (
                        <span>
                            No File
                        </span>
                    )
                }

            </td>
            <td>
                {item.delivery_deadline ? (() => {

                    const today = new Date();
                    const deadline =
                        new Date(item.delivery_deadline);


                    today.setHours(0, 0, 0, 0);
                    deadline.setHours(0, 0, 0, 0);

                    const diffTime =
                        deadline - today;

                    const daysLeft =
                        Math.ceil(
                            diffTime /
                            (1000 * 60 * 60 * 24)
                        );

                    const isPassed =
                        deadline < today;

                    return (
                        <>
                            <div>
                                {deadline.toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    }
                                )}
                            </div>

                            <div
                                style={{
                                    color: isPassed
                                        ? "red"
                                        : "#0152a8",
                                    fontWeight: "600"
                                }}
                            >
                                {isPassed
                                    ? "(Deadline passed)"
                                    : `(${daysLeft} day${daysLeft > 1
                                        ? "s"
                                        : ""
                                    } left)`
                                }
                            </div>
                        </>
                    );
                })() : (
                    <span>No deadline</span>
                )}
            </td>

            <td>
                <div
                    style={{
                        fontWeight: "600"
                    }}
                >
                    {item.preview_status === "-" ? (
                        <>
                            <div
                                style={{
                                    color: "#0152a8"
                                }}
                            >
                                No Preview Requested
                            </div>

                            <div
                                style={{
                                    color: "#0152a8",
                                    fontWeight: "600",
                                    cursor: "pointer"
                                }}
                            >
                                (Upload Now)
                            </div>

                            <small
                                style={{
                                    color: "#6c757d"
                                }}
                            >
                                No preview files uploaded.
                            </small>
                        </>
                    ) : item.preview_status ===
                        "Waiting User" ? (
                        <>
                            <span
                                style={{
                                    color: "#0152a8"
                                }}
                            >
                                Preview Uploaded
                            </span>

                            <br />

                            <span
                                style={{
                                    color: "#0152a8"
                                }}
                            >
                                (Waiting User)
                            </span>
                        </>
                    ) : item.preview_status ===
                        "Approved" ? (
                        <>
                            <span
                                style={{
                                    color: "green"
                                }}
                            >
                                Preview Approved
                            </span>

                            {previewFiles.length > 0 && (
                                <>
                                    <br />

                                    <small
                                        style={{
                                            color: "#6c757d"
                                        }}
                                    >
                                        (
                                        {previewFiles.length}
                                        {" "}
                                        file
                                        {previewFiles.length > 1
                                            ? "s"
                                            : ""}
                                        )
                                    </small>

                                    {previewFiles.map(
                                        (file, index) => (
                                            <div
                                                key={file.id}
                                            >
                                                <a
                                                    href={`${import.meta.env.VITE_FILE_URL}/${file.file_path.replace(
                                                        /\\/g,
                                                        "/"
                                                    )}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={{
                                                        textDecoration:
                                                            "none",
                                                        color:
                                                            "#0152a8"
                                                    }}
                                                >
                                                    Preview{" "}
                                                    {index + 1}
                                                </a>

                                                <br />

                                                <span
                                                    style={{
                                                        color:
                                                            "#0152a8"
                                                    }}
                                                >
                                                    (
                                                    {file.file_name
                                                        .split(".")
                                                        .pop()
                                                        .toUpperCase()}
                                                    )
                                                </span>
                                            </div>
                                        )
                                    )}
                                </>
                            )}
                        </>
                    ) : item.preview_status ===
                        "Preview Rejected" ? (
                        <span
                            style={{
                                color: "red"
                            }}
                        >
                            Preview Rejected
                        </span>
                    ) : null}
                </div>
            </td>
            <td>
                <select
                    value={item.status}
                    onChange={(e) =>
                        handleStatusChange(
                            item.id,
                            e.target.value
                        )
                    }
                    style={{
                        border: "none",
                        background: "transparent",
                        color: "#0152a8",
                        fontWeight: "600",
                        cursor: "pointer",
                        outline: "none",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        paddingRight: "20px"
                    }}
                >
                    <option value="Submitted">
                        Submitted
                    </option>

                    <option value="InProduction">
                        InProduction
                    </option>

                    <option value="QualityCheck">
                        QualityCheck
                    </option>

                    <option value="Shipped">
                        Shipped
                    </option>

                    <option value="Delivered">
                        Delivered
                    </option>
                </select>

                <span
                    style={{
                        marginLeft: "-15px",
                        color: "#0152a8",
                        pointerEvents: "none",
                        fontSize: "12px"
                    }}
                >
                    ▼
                </span>
            </td>

            <td className="action-icons">

                <button
                    className="btn btn-link p-0 me-3"
                    onClick={() =>
                        navigate(`/admin/view-case/${item.id}`)
                    }
                >
                    <FaEye
                        style={{
                            color: "#0152a8",
                            cursor: "pointer"
                        }}
                    />
                </button>


                {previewFiles.length === 0 && (

                    <button
                        className="btn btn-link p-0 me-3"
                        onClick={() =>
                            navigate(
                                `/admin/upload-preview/${item.id}`
                            )
                        }
                    >
                        <FaUpload
                            style={{
                                color: "#0152a8",
                                cursor: "pointer"
                            }}
                        />
                    </button>

                )}

                <button
                    className="btn btn-link p-0"
                    onClick={() => handleDelete(item.id)}
                >
                    <FaTrash
                        style={{
                            color: "red",
                            cursor: "pointer"
                        }}
                    />
                </button>

            </td>
        </tr >
    );



}
export default OrderTableRow;