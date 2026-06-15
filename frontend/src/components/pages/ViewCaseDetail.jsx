import axios from "axios";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/ViewCaseDetail.css";

function ViewCaseDetail() {

    const [doctordata, setdoctordata] = useState(null);
    const [casedata, setCasedata] = useState(null);
    const { id } = useParams();
    const [caselist, setCaseList] = useState(null);

    useEffect(() => {
        fetchDoctorData();
    }, []);
    useEffect(() => {
        getCaseDetails();
    }, []);

    useEffect(() => {
    }, []);
    const getCaseDetails = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/cases/${id}`
            )
            console.log(response.data);
            setCasedata(response.data);
        }
        catch (error) {
            console.error("Error fetching case", error);
        }
    }

    const fetchDoctorData = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/doctors/${id}`
            );
            console.log(
                "doctor Api:",
                response.data.id
            )
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

    return (
        <div className="container-fluid">
            <div className="dashboard-main">
                <div className="row g-0">

                    <Sidebar />

                    <div
                        className="
                        offset-2
                        col-12
                        col-md-9
                        col-lg-9
                        offset-lg-3
                        col-xl-9
                        col-xxl-10
                        offset-xl-3
                        offset-xxl-2
                        main-content
                    "
                    >

                        <Header title="Dashboard" />

                        <div className="main-c-inner">


                            <section className="view-case-section">
                                <div className="container">
                                    <h1 className="text-center mb-4" style={{ color: "#0152a8" }}>View Case Details</h1>

                                    <div className="card ">
                                        <div className="card-header">Doctor / User Information</div>
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-md-3 text-center mb-3 mb-md-0">
                                                    <img src="assets\hero.png" className="user-profile-img"></img>
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
                                                            <span className="value"></span>
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
                                                    <span className="value">{casedata?.patient_id}</span>
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
                                                    <span className="value">{casedata?.case_stage}</span>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-6">
                                                    <span className="label">Material Type:</span>
                                                    <span className="value">{casedata?.material_type}</span>
                                                </div>
                                                <div className="col-md-6">
                                                    <span className="label">Shade Guide Color:</span>
                                                    <span className="value">{casedata?.shade_guide_color}</span>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-6">
                                                    <span className="label">Surface Texture:</span>
                                                    <span className="value">{casedata?.surface_texture}</span>
                                                </div>
                                                <div className="col-md-6">
                                                    <span className="label">Glazed Polish:</span>
                                                    <span className="value">{casedata?.glazed_polish}</span>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-6">
                                                    <span className="label">Prepared Tooth Shade:</span>
                                                    <span className="value">{casedata?.prepared_tooth_shade}</span>
                                                </div>
                                                <div className="col-md-6">
                                                    <span className="label">Incisal Translucency:</span>
                                                    <span className="value">{casedata?.incisal_translucency}</span>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-6">
                                                    <span className="label">Crown Bridge:</span>
                                                    <span className="value">{casedata?.crown_bridge}</span>
                                                </div>
                                                <div className="col-md-6">
                                                    <span className="label">Additional Restorations:</span>
                                                    <span className="value">{casedata?.additional_restorations}</span>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-12">
                                                    <span className="label">Implant Info:</span>
                                                    <span className="value">{casedata?.implant_type}</span>
                                                </div>
                                            </div>

                                            <div className="row mb-2">
                                                <div className="col-12">
                                                    <span className="label">Additional Instructions:</span>
                                                    <span className="value">{casedata?.additional_instructions}</span>
                                                </div>
                                            </div>

                                            <div className="row mb-2">
                                                <div className="col-12">
                                                    <span className="label">GDPR Confirmation:</span>
                                                    <span className="value">
                                                        <span style={{ color: "green", fontWeight: 600 }}>

                                                        </span>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="row mb-2">
                                                <div className="col-12">
                                                    <span className="label">Data Processing Agreement:</span>
                                                    <span className="value">
                                                        <span style={{ color: "green", fontWeight: 600 }}>

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
                                                            InProduction
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ViewCaseDetail;