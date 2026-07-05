import { Link } from "react-router-dom";
import {
  FaEye,
  FaDownload,
  FaEdit,
  FaTrash
} from "react-icons/fa";
function DoctorTableBody({
  cases,
  currentCases,
  handlePreviewClick,
  handleDownload,
  handleDelete,
  handleStatusChange,
  loadDigitalFiles,
  handleViewCaseDocument,
  previewFilesMap,
  digitalFilesMap
}) {
  return (
    <tbody>
      {cases.map((item) => {
        const previewFiles =
          previewFilesMap[item.id] || [];
        return (
          <tr key={item.id}>
            <td className="text-center">{item.id}</td>
            <td className="text-center">{item.patient_name}</td>
            <td className="text-center">
              {item.appointment_date
                ? new Date(item.appointment_date)
                  .toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                  })
                  .replace(",", "")
                : "-"}
            </td>
            <td className="text-center">{item.age}</td>
            <td className="text-center">
              {
                item.has_case_document ? (
                  <FaEye
                    style={{
                      cursor: "pointer",
                      color: "#0152a8"
                    }}
                    onClick={() =>
                      handleViewCaseDocument(
                        item.id,
                        "case_document"
                      )
                    }
                  />
                ) : (
                  "-"
                )
              }
            </td>
            <td className="text-center">

              {
                digitalFilesMap[item.id]
                  ?.map((file, index) => (
                    <div key={file.id}>

                      <a
                        href={`http://127.0.0.1:8000/${file.file_path}`}
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
                        href={`http://127.0.0.1:8000/api/download-file?file_path=${encodeURIComponent(
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
                !digitalFilesMap[item.id] && (
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
            <td className="text-center">
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
                    <div className="text-center">
                      {deadline.toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric"
                        }
                      )}
                    </div>

                    {(isPassed || daysLeft <= 3) && (
                      <div
                        className="text-center"
                        style={{
                          color: isPassed ? "red" : "#0152a8",
                          fontWeight: "600"
                        }}
                      >
                        {isPassed
                          ? "(Deadline passed)"
                          : daysLeft === 0
                            ? "(Deadline is today)"
                            : `(${daysLeft} day${daysLeft > 1 ? "s" : ""} left)`
                        }
                      </div>
                    )}
                  </>
                );
              })() : (
                "-"
              )}
            </td>
            <td className="text-center">
              {
                previewFiles.map((file, index) => (

                  <div
                    key={file.id}
                    className="text-center"
                  >
                    <a
                      href={`http://127.0.0.1:8000/${file.file_path.replace(/\\/g, "/")}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Preview {index + 1}
                      {" "}
                      (
                      {file.file_name
                        .split(".")
                        .pop()
                        .toUpperCase()}
                      )
                    </a>

                    <br />

                    <a
                      href={`http://127.0.0.1:8000/api/download-file?file_path=${encodeURIComponent(
                        file.file_path
                      )}`}
                    >
                      <FaDownload />
                    </a>
                  </div>
                ))
              }

              <div className="mt-2 text-center">

                {
                  item.preview_status?.toLowerCase() ===
                  "waiting user" && (
                    <>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() =>
                          handlePreviewStatus(
                            item.id,
                            "Approved"
                          )
                        }
                      >
                        ✓
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          handlePreviewStatus(
                            item.id,
                            "Preview Rejected"
                          )
                        }
                      >
                        ✕
                      </button>
                    </>
                  )
                }

                {
                  item.preview_status?.toLowerCase() ===
                  "approved" && (
                    <span
                      style={{
                        color: "green",
                        fontWeight: "600"
                      }}
                    >
                      Approved
                    </span>
                  )
                }

                {
                  item.preview_status?.toLowerCase() ===
                  "preview rejected" && (
                    <span
                      style={{
                        color: "red",
                        fontWeight: "600"
                      }}
                    >
                      Rejected
                    </span>
                  )
                }

              </div>

              {
                !item.has_preview_files &&
                item.preview_status !==
                "Waiting User" &&
                item.preview_status !==
                "Approved" &&
                item.preview_status !==
                "Preview Rejected" &&
                "-"
              }

            </td>
            <td className="text-center">
              <span
                style={{
                  fontWeight: "600",
                  color:
                    item.status === "Submitted"
                      ? "#6c757d"
                      : item.status === "InProduction"
                        ? "#0d6efd"
                        : item.status === "QualityCheck"
                          ? "#fd7e14"
                          : item.status === "Shipped"
                            ? "#198754"
                            : item.status === "Delivered"
                              ? "#0dcaf0"
                              : "black"
                }}
              >
                {item.status}
              </span>
            </td>
            <td className="text-center">
              <Link
                to={`/client/update-case/${item.id}`}
              >
                <FaEdit className="me-2" />
              </Link>

              <FaTrash
                className="text-danger"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  handleDelete(
                    item.id
                  )
                }
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default DoctorTableBody;