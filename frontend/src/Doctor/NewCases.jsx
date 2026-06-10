
import { useState } from "react";
import axios from "axios";

import DoctorSideBar from "../components/DoctorSideBar";
import DoctorHeader from "../components/DoctorHeader";
import PurchaseOrder from "../components/PurchaseOrder";
import UploadDigitalFiles from "../components/UploadDigitalFile";
import ReviewConfirm from "../components/ReviewConfirm";
import SuccessScreen from "../components/SuccessScreen";

import "../DoctorStyle/CasesDetail.css";

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
        files: []
    };

    const [formData, setFormData] =
        useState(initialFormData);

    const [errors, setErrors] =
        useState({});

    // NEXT BUTTON
    const handleNext = () => {

        let newErrors = {};

        // Step 1 validation
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

        // Step 2 validation
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

    // PREVIOUS BUTTON
    const handlePrevious = () => {

        setStep(prev => prev - 1);
    };


    const handleSubmit = async () => {

        try {

            const user =
                JSON.parse(
                    localStorage.getItem(
                        "user"
                    )
                );

            const payload = {


                case_id: `CASE-${Date.now()}`,

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

            console.log(payload);

            const response =
                await axios.post(
                    "http://localhost:8000/api/cases",
                    payload
                );

            console.log(
                response.data
            );

            // Success page
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

    // RESET FORM
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
                                            className={`step - indicator ${step >= 1
                                                ? "active"
                                                : ""
                                                } `}
                                        ></div>

                                        <div
                                            className={`step - indicator ${step >= 2
                                                ? "active"
                                                : ""
                                                } `}
                                        ></div>

                                        <div
                                            className={`step - indicator ${step >= 3
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

                                    {/* STEP 3 */}

                                    {step === 3 && (

                                        <ReviewConfirm
                                            formData={
                                                formData
                                            }
                                            handlePrevious={
                                                handlePrevious
                                            }
                                            handleSubmit={
                                                handleSubmit
                                            }
                                        />
                                    )}

                                    {/* STEP 4 */}

                                    {step === 4 && (

                                        <SuccessScreen
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
