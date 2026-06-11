
import { useState } from "react";
import axios from "axios";

import DoctorSideBar from "../components/DoctorSideBar";
import DoctorHeader from "../components/DoctorHeader";
import PurchaseOrder from "../components/PurchaseOrder";
import UploadDigitalFiles from "../components/UploadDigitalFile";
import ReviewConfirm from "../components/ReviewConfirm";
import SuccessScreen from "../components/SuccessScreen";
import "../DoctorStyle/NewCases.css";

function NewCases() {

    const [step, setStep] = useState(1);

    const initialFormData = {
        patientName: "",
        patientPhone: "",
        patientId: "",
        nextAppointmentDate: "",
        deliveryDeadline: "",
        age: "",
        gender: "",
        caseStage: [],
        files: [],

        gdprConfirm: false,
        dpcaConfirm: false,
        patientConsent: false
    };

    const [formData, setFormData] =
        useState(initialFormData);

    const [errors, setErrors] =
        useState({});
    const [
        checkboxErrors,
        setCheckboxErrors
    ] = useState({});


    const handleNext = () => {

        let newErrors = {};

        if (step === 1) {

            if (
                !formData
                    .patientName
                    ?.trim()
            ) {

                newErrors.patientName =
                    "Patient name is required";
            }
        }
        if (step === 2) {

            if (
                !formData.files ||
                formData.files.length === 0
            ) {

                newErrors.files =
                    "At least one file is required";
            }
        }

        setErrors(newErrors);

        if (
            Object.keys(newErrors)
                .length > 0
        ) {
            return;
        }

        setStep(prev => prev + 1);
    };

    const handlePrevious = () => {

        setStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        let newErrors =
            {};

        if (
            !formData
                .gdprConfirm
        ) {

            newErrors
                .gdprConfirm =
                "You must confirm GDPR compliance.";

            setCheckboxErrors(
                newErrors
            );

            return;
        }

        if (
            !formData
                .dpcaConfirm
        ) {

            newErrors
                .dpcaConfirm =
                "You must confirm Data Processing & Confidentiality Agreement.";

            setCheckboxErrors(
                newErrors
            );

            return;
        }

        if (
            !formData
                .patientConsent
        ) {

            newErrors
                .patientConsent =
                "Patient consent is required.";

            setCheckboxErrors(
                newErrors
            );

            return;
        }

        setCheckboxErrors(
            {}
        );


        try {

            const user =
                JSON.parse(
                    localStorage.getItem(
                        "user"
                    )
                );

            const payload = {

                doctor_id:
                    user?.id || 1,

                patient_name:
                    formData.patientName,

                patient_phone:
                    formData.patientPhone || null,

                gender:
                    formData.gender || null,

                age:
                    formData.age
                        ? Number(
                            formData.age
                        )
                        : null,

                case_type:
                    formData.caseStage
                        ?.join(", ") || null,

                appointment_date:
                    formData
                        .nextAppointmentDate
                        ? new Date(
                            formData
                                .nextAppointmentDate
                        ).toISOString()
                        : null,

                delivery_deadline:
                    formData
                        .deliveryDeadline ||
                    null,

                preview_status:
                    "Pending",

                status:
                    "Submitted"
            };

            const response =
                await axios.post(
                    "http://localhost:8000/api/cases",
                    payload
                );

            console.log(
                "CASE CREATED:",
                response.data
            );

            if (
                formData.files &&
                formData.files.length > 0
            ) {

                for (const file of formData.files) {

                    const fileData =
                        new FormData();

                    fileData.append(
                        "file",
                        file
                    );

                    await axios.post(
                        `http://localhost:8000/api/cases/${response.data.id}/upload`,
                        fileData,
                        {
                            headers: {
                                "Content-Type":
                                    "multipart/form-data"
                            }
                        }
                    );
                }
            }
            setStep(4);

        } catch (error) {

            console.log(
                error.response?.data
            );

            alert(
                "Failed to submit case"
            );
        }
    };

    const handleReset = () => {

        setFormData(
            initialFormData
        );

        setErrors({});

        setStep(1);
    };

    return (

        <div className="container-fluid p-0">

            <div className="row g-0 doctor-dashboard-main">

                <DoctorSideBar />

                <div className="col-md-9 doctor-main-content">

                    <DoctorHeader
                        title="Dashboard"
                    />

                    <div className="mc-btm-bxx">

                        <div className="step-form-section">

                            <div className="form-container">

                                <div id="formContentContainer">

                                    <h1
                                        className="text-center mb-4"
                                        style={{
                                            color:
                                                "#0152a8"
                                        }}
                                    >
                                        Submit a Case
                                    </h1>

                                    {/* Progress Bar */}

                                    <div className="progress-bar-container">

                                        <div
                                            className="progress-bar-fill"
                                            style={{
                                                width:
                                                    step === 1
                                                        ? "0%"
                                                        : step === 2
                                                            ? "50%"
                                                            : "100%"
                                            }}
                                        ></div>

                                        <div
                                            className={`step-indicator ${step >= 1
                                                ? "active"
                                                : ""
                                                } `}
                                        ></div>

                                        <div
                                            className={`step-indicator ${step >= 2
                                                ? "active"
                                                : ""
                                                } `}
                                        ></div>

                                        <div
                                            className={`step-indicator ${step >= 3
                                                ? "active"
                                                : ""
                                                } `}
                                        ></div>

                                    </div>

                                    {/* STEP 1 */}

                                    {step === 1 && (

                                        <PurchaseOrder
                                            formData={
                                                formData
                                            }
                                            setFormData={
                                                setFormData
                                            }
                                            handleNext={
                                                handleNext
                                            }
                                            errors={
                                                errors
                                            }
                                        />
                                    )}

                                    {/* STEP 2 */}

                                    {step === 2 && (

                                        <UploadDigitalFiles
                                            formData={
                                                formData
                                            }
                                            setFormData={
                                                setFormData
                                            }
                                            handleNext={
                                                handleNext
                                            }
                                            handlePrevious={
                                                handlePrevious
                                            }
                                            errors={
                                                errors
                                            }
                                        />
                                    )}

                                    {step === 3 && (
                                        <ReviewConfirm
                                            formData={formData}
                                            setFormData={
                                                setFormData
                                            }
                                            handlePrevious={
                                                handlePrevious
                                            }
                                            handleSubmit={
                                                handleSubmit
                                            }
                                            checkboxErrors={
                                                checkboxErrors
                                            }
                                            buttonText="Submit Case"
                                        />
                                    )}


                                    {step === 4 && (

                                        <SuccessScreen
                                            title="Case Submitted Successfully!"
                                            subtitle="Thank you. We'll review and contact you soon."
                                            buttonText="Submit Another Case"
                                            handleReset={
                                                handleReset
                                            }
                                        />
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default NewCases;
