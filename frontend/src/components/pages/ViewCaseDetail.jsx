import axios from "axios";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/ViewCaseDetail.css";
// import heroImg from "../../assets/hero.png";

function ViewCaseDetail() {

    const [doctordata, setdoctordata] = useState({});
    const [casedata, setCasedata] = useState(null);
    const { id } = useParams();
    const [caselist, setCaseList] = useState(null);
    const [files, setFiles] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        getCaseDetails();
        getCaseFiles();
    }, []);

    useEffect(() => {
    }, []);

    const getCaseFiles = async () => {
        try {

            const response = await axios.get(
                `http://127.0.0.1:8000/api/case_files/${id}`
            );
            setFiles(response.data);

        }
        catch (error) {
            console.error(
                "Error fetching files",
                error
            );
        }
    };
    const getCaseDetails = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/cases/${id}`
            )
            setCasedata(response.data);

            if (
                response.data.doctor_id
            ) {
                fetchDoctorData(
                    response.data
                        .doctor_id
                );
            }
        }
        catch (error) {
            console.error("Error fetching case", error);
        }
    }

    const fetchDoctorData = async (id) => {
        try {


            const response = await axios.get(
                `http://127.0.0.1:8000/api/doctors/${id}`
            );

            setdoctordata(
                response.data
            );

        }
        catch (error) {
            console.error("failed to fetch doctor: ",
                error
            );
        }
    }
    const casePdfs =
        casedata?.files?.filter(
            file =>
                file.file_category ===
                "case_document"
        ) || [];

    const digitalFiles =
        casedata?.files?.filter(
            file =>
                file.file_category ===
                "digital_file"
        ) || [];

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
                        
                        <section className="view-case-section">
                            <div className="container">
                                <h1 className="text-center mb-4" style={{ color: "#0152a8" }}>View Case Details</h1>

                                <div className="card ">
                                    <div className="card-header">Doctor / User Information</div>
                                    <div className="card-body">
                                        <div className="row mb-3">
                                            <div className="col-md-3 text-center mb-3 mb-md-0">
                                                <img src="" className="user-profile-img"></img>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <span className="label">Full Name:</span>
                                                        <span className="value">{doctordata?.full_name}</span>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <span className="label">Phone:</span>
                                                        <span className="value">{doctordata?.phone}</span>
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <span className="label">Email:</span>
                                                        <span className="value">{doctordata?.email}</span>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <span className="label">Business Name:</span>
                                                        <span className="value">{doctordata?.business_name}</span>
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <span className="label">Business Type:</span>
                                                        <span className="value"></span>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <span className="label">Country:</span>
                                                        <span className="value">{doctordata?.country}</span>
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <span className="label">Address:</span>
                                                        <span className="value"></span>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <span className="label">Registration Number:</span>
                                                        <span className="value">{doctordata?.license_number}</span>
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <span className="label">VAT / Tax ID:</span>
                                                        <span className="value">{doctordata?.vat_id}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">Patient Case Information</div>

                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <span className="label">Patient ID:</span>
                                                <span className="value">{casedata?.id}</span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="label">Patient Name:</span>
                                                <span className="value">{casedata?.patient_name}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <span className="label">Gender:</span>
                                                <span className="value">{casedata?.gender}</span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="label">Age:</span>
                                                <span className="value">{casedata?.age}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <span className="label">Delivery Deadline:</span>
                                                <span className="value">{casedata?.delivery_deadline}</span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="label">Next Appointment Date:</span>
                                                <span className="value">{casedata?.appointment_date}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <span className="label">Appointment Time:</span>
                                                <span className="value">{casedata?.appointment_time}</span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="label">Case Stage:</span>
                                                <span className="value">{casedata?.details?.case_stage || "N/A"}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <span className="label">Material Type:</span>
                                                <span className="value">{casedata?.details?.material_type || "N/A"}</span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="label">Shade Guide Color:</span>
                                                <span className="value">{casedata?.details?.shade_guide_color || "N/A"}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <span className="label">Surface Texture:</span>
                                                <span className="value">{casedata?.details?.surface_texture || "N/A"}</span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="label">Glazed Polish:</span>
                                                <span className="value">{casedata?.details?.glazed_polish || "N/A"}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <span className="label">Prepared Tooth Shade:</span>
                                                <span className="value">
                                                    {casedata?.details?.prepared_tooth_shade || "N/A"}
                                                </span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="label">Incisal Translucency:</span>
                                                <span className="value">{casedata?.details?.incisal_translucency || "N/A"}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <span className="label">Crown Bridge:</span>
                                                <span className="value">
                                                    {casedata?.details?.crown_bridge || "N/A"}
                                                </span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="label">Additional Restorations:</span>
                                                <span className="value">{casedata?.details?.additional_restorations || "N/A"}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-12">
                                                <span className="label">Implant Info:</span>
                                                <div className="table-responsive mt-2">
                                                    <table className="implant-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Implant Type</th>
                                                                <th>Platform Diameter</th>
                                                                <th>Screw Retained</th>
                                                                <th>Screw Retained Hybrid</th>
                                                                <th>Cement Retained TI Abutment</th>
                                                                <th>ZR Abutment</th>
                                                                <th>Implant Bar Type</th>
                                                                <th>Attachment Type</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {casedata?.details?.implant_details?.map(
                                                                (item, index) => (
                                                                    <tr key={index}>
                                                                        <td>{item.implant_type}</td>
                                                                        <td>{item.platform_diameter}</td>
                                                                        <td>{item.screw_retained}</td>
                                                                        <td>{item.screw_retained_hybrid}</td>
                                                                        <td>
                                                                            {item.cement_retained_ti_abutment}
                                                                        </td>
                                                                        <td>{item.zr_abutment}</td>
                                                                        <td>{item.implant_bar_type}</td>
                                                                        <td>{item.attachment_type}</td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {casedata?.details?.implant_details?.length === 0
                                                    ? "N/A" : ""}
                                            </div>
                                        </div>

                                        <div className="row mb-2">
                                            <div className="col-12">
                                                <span className="label">Additional Instructions:</span>
                                                <span className="value">{casedata?.details?.additional_instructions || "N/A"}</span>
                                            </div>
                                        </div>

                                        <div className="row mb-2">
                                            <div className="col-12">
                                                <span className="label">GDPR Confirmation:</span>
                                                <span className="value">
                                                    <span style={{ color: "green", fontWeight: 600 }}>
                                                        Yes
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="row mb-2">
                                            <div className="col-12">
                                                <span className="label">Data Processing Agreement:</span>
                                                <span className="value">
                                                    <span style={{ color: "green", fontWeight: 600 }}>
                                                        Yes
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="row mb-2">
                                            <div className="col-12">
                                                <span className="label">Patient Consent:</span>
                                                <span className="value">
                                                    <span style={{ color: "green", fontWeight: 600 }}>
                                                        Yes
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="row mb-2">
                                            <div className="col-12">
                                                <span className="label">Status:</span>
                                                <span className="value">
                                                    <span style={{ color: "green", fontWeight: 600 }}>
                                                        {casedata?.status}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header fw-bold">Uploaded Files</div>
                                    <div className="card-body">

                                        <strong>Case PDF</strong>
                                        {casePdfs.map((file) => (

                                            <div
                                                key={file.id}
                                                className="file-item d-flex flex-wrap align-items-center justify-content-between mb-2 p-2"
                                            >

                                                <span className="file-name text-truncate">
                                                    {file.file_name}
                                                </span>

                                                <div className="file-buttons d-flex flex-wrap gap-2 mt-2 mt-sm-0">

                                                    <a
                                                        href={`http://127.0.0.1:8000/${file.file_path.replace(/\\/g, "/")}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="btn btn-sm btn-primary"
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                        {" "}
                                                        Preview
                                                    </a>

                                                    <a
                                                        href={`http://127.0.0.1:8000/api/download-file?file_path=${encodeURIComponent(file.file_path)}`}
                                                        download
                                                        className="btn btn-sm btn-success"
                                                    >
                                                        <i className="bi bi-download"></i>
                                                        {" "}
                                                        Download
                                                    </a>

                                                </div>

                                            </div>

                                        ))}

                                        <strong>Digital File</strong>
                                        {digitalFiles.map((file) => (

                                            <div
                                                key={file.id}
                                                className="file-item d-flex flex-wrap align-items-center justify-content-between mb-2 p-2"
                                            >

                                                <span className="file-name text-truncate">
                                                    {file.file_name}
                                                </span>

                                                <div className="file-buttons d-flex flex-wrap gap-2 mt-2 mt-sm-0">

                                                    <a
                                                        href={`http://127.0.0.1:8000/${file.file_path.replace(/\\/g, "/")}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="btn btn-sm btn-primary"
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                        {" "}
                                                        Preview
                                                    </a>

                                                    <a
                                                        href={`http://127.0.0.1:8000/api/download-file?file_path=${encodeURIComponent(file.file_path)}`}
                                                        className="btn btn-sm btn-success"
                                                    >
                                                        <i className="bi bi-download"></i>
                                                        {" "}
                                                        Download
                                                    </a>

                                                </div>

                                            </div>

                                        ))}

                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default ViewCaseDetail;
