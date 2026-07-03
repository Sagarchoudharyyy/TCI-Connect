
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
    const [pdfProgress, setPdfProgress] = useState(0);
    const [uploadedPdf, setUploadedPdf] = useState(null);
    const [isPdfUploading, setIsPdfUploading] = useState(false);
    const [digitalProgress, setDigitalProgress] = useState(0);
    const [isDigitalUploading, setIsDigitalUploading] = useState(false);
    const [digitalFiles, setDigitalFiles] = useState([]);

    const initialFormData = {
        patient_name: "",
        patient_id: "",

        next_appointment_date: "",
        appointment_time: "",
        delivery_deadline: "",

        age: "",
        gender: "",

        case_stage: [],

        surface_texture: [],
        glazed_polish: [],
        incisal_translucency: [],
        prepared_tooth_shade: [],
        shade_guide_color: "",

        material_type: [],
        crown_bridge: [],
        additional_restorations: [],

        implant_details: [
            {
                implant_type: "",
                platform_diameter: "",
                screw_retained: "",
                screw_retained_hybrid: "",
                cement_retained_ti_abutment: "",
                zr_abutment: "",
                implant_bar_type: "",
                attachment_type: ""
            },

            {
                implant_type: "",
                platform_diameter: "",
                screw_retained: "",
                screw_retained_hybrid: "",
                cement_retained_ti_abutment: "",
                zr_abutment: "",
                implant_bar_type: "",
                attachment_type: ""
            },
            {
                implant_type: "",
                platform_diameter: "",
                screw_retained: "",
                screw_retained_hybrid: "",
                cement_retained_ti_abutment: "",
                zr_abutment: "",
                implant_bar_type: "",
                attachment_type: ""
            }
        ],

        pdfUpload: null,

        design_preview: false,
        additional_instructions: "",

        files: [],

        gdpr_confirm: false,
        dpca_confirm: false,
        patient_consent: false
    };

    const [formData, setFormData] =
        useState(initialFormData);

    const [errors, setErrors] =
        useState({});
    const [
        checkboxErrors,
        setCheckboxErrors
    ] = useState({});

    const handleCheckboxSelection = (
        field,
        value
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(
                    (item) => item !== value
                )
                : [...prev[field], value]
        }));
    };

    const handleImplantChange = (index, field, value) => {
        setFormData(prev => {
            const updatedImplantDetails = [
                ...(prev.implant_details || [])
            ];

            updatedImplantDetails[index] = {
                ...(updatedImplantDetails[index] || {}),
                [field]: value
            };

            return {
                ...prev,
                implant_details: updatedImplantDetails
            };
        });
    };
    const handleNext = () => {

        let newErrors = {};

        if (isPdfUploading) {
            newErrors.pdfUpload =
                "Please wait until the case document upload is complete.";
        }

        if (
            digitalFiles.some(
                (file) => file.status === "uploading"
            )
        ) {
            newErrors.files =
                "Please wait until all digital files finish uploading.";
        }

        // Step 1
        if (step === 1) {

            if (
                !formData
                    .patient_name
                    ?.trim()
            ) {

                newErrors.patient_name =
                    "Patient name is required";
            }
        }

        // Step 2
        if (step === 2) {
            if (
                !digitalFiles ||
                digitalFiles.length === 0
            ) {
                newErrors.files =
                    "At least one file is required";
            }
        }
        console.log("CURRENT STEP:", step);

        console.log(
            "FORM DATA:",
            formData
        );

        console.log(
            "ERRORS:",
            newErrors
        );

        setErrors(newErrors);

        if (
            Object.keys(newErrors)
                .length > 0
        ) {
            return;
        }

        setStep(prev => {

            console.log(
                "STEP CHANGED:",
                prev,
                "->",
                prev + 1
            );

            return prev + 1;
        });
    };

    const handlePrevious = () => {

        setStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        let newErrors =
            {};

        if (
            !formData
                .gdpr_confirm
        ) {

            newErrors
                .gdpr_confirm =
                "You must confirm GDPR compliance.";

            setCheckboxErrors(
                newErrors
            );

            return;
        }

        if (
            !formData
                .dpca_confirm
        ) {

            newErrors
                .dpca_confirm =
                "You must confirm Data Processing & Confidentiality Agreement.";

            setCheckboxErrors(
                newErrors
            );

            return;
        }

        if (
            !formData
                .patient_consent
        ) {

            newErrors
                .patient_consent =
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

            const user = JSON.parse(
                localStorage.getItem("user") || "{}"
            );

            const payload = {
                doctor_id: user?.id || 1,

                patient_name: formData.patient_name,

                gender: formData.gender || null,

                age: formData.age
                    ? Number(formData.age)
                    : null,

                appointment_date:
                    formData.next_appointment_date
                        ? new Date(
                            formData.next_appointment_date
                        ).toISOString()
                        : null,

                appointment_time:
                    formData.appointment_time || null,

                delivery_deadline:
                    formData.delivery_deadline || null,

                preview_status: "-",

                status: "Submitted",

                details: {
                    case_stage:
                        formData.case_stage || null,

                    surface_texture:
                        formData.surface_texture || null,

                    glazed_polish:
                        formData.glazed_polish || null,

                    incisal_translucency:
                        formData.incisal_translucency || null,

                    prepared_tooth_shade:
                        formData.prepared_tooth_shade || null,

                    shade_guide_color:
                        formData.shade_guide_color || null,

                    material_type:
                        formData.material_type || [],

                    crown_bridge:
                        formData.crown_bridge || [],

                    additional_restorations:
                        formData.additional_restorations || [],

                    implant_details:
                        formData.implant_details || [],

                    design_preview:
                        formData.design_preview || false,

                    additional_instructions:
                        formData.additional_instructions || null
                },

                files: [
                    ...(uploadedPdf ? [uploadedPdf] : []),

                    ...digitalFiles
                        .filter(f => f.file_path)
                        .map(f => ({
                            file_name: f.file_name,
                            file_path: f.file_path,
                            file_type: f.file_type,
                            file_category: f.file_category
                        }))
                ]
            };


            console.log(
                "DIGITAL FILES:",
                JSON.stringify(digitalFiles, null, 2)
            );

            console.log(
                "PAYLOAD:",
                JSON.stringify(payload, null, 2)
            );

            const response =
                await axios.post(
                    "http://localhost:8000/api/cases",
                    payload
                );

            console.log(
                "CASE CREATED:",
                response.data
            );
            setStep(4);

        } catch (error) {

            console.log(
                JSON.stringify(
                    error.response?.data,
                    null,
                    2
                )
            );

            alert(
                "Failed to submit case"
            );
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setErrors({});
        setCheckboxErrors({});
        setUploadedPdf(null);
        setDigitalFiles([]);
        setPdfProgress(0);
        setDigitalProgress(0);
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
                                            pdfProgress={pdfProgress}
                                            setPdfProgress={setPdfProgress}
                                            setUploadedPdf={setUploadedPdf}
                                            handleNext={
                                                handleNext
                                            }
                                            setIsPdfUploading={setIsPdfUploading}
                                            isPdfUploading={isPdfUploading}
                                            uploadedPdf={uploadedPdf}
                                            handleCheckboxSelection={handleCheckboxSelection}
                                            handleImplantChange={handleImplantChange}
                                            errors={
                                                errors
                                            }
                                        />
                                    )}

                                    {/* STEP 2 */}

                                    {step === 2 && (

                                        <UploadDigitalFiles
                                            formData={formData}
                                            setFormData={setFormData}
                                            handleNext={handleNext}
                                            handlePrevious={handlePrevious}
                                            digitalFiles={digitalFiles}
                                            setDigitalFiles={setDigitalFiles}
                                            digitalProgress={digitalProgress}
                                            setDigitalProgress={setDigitalProgress}
                                            errors={errors}
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
                                            digitalFiles={digitalFiles}
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
