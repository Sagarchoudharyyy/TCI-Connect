import "../DoctorStyle/ReviewConfirm.css";
import { useState } from "react";

function ReviewConfirm({
    formData,
    setFormData,
    handlePrevious,
    handleSubmit,
    checkboxErrors,
    buttonText
}) {
    return (
        <div className="step-content">

            <h2
                className="text-xl fw-semibold mb-4"
                style={{ color: "#0152a8" }}
            >
                3. Review & Confirm
            </h2>

            <div className="review-card p-3 bg-light rounded mb-3">

                <h3 className="fw-semibold mb-2">
                    Case Details
                </h3>

                <p>
                    <strong>Patient Id:</strong>{" "}
                    {formData.patient_id ||
                        "Not provided"}
                </p>

                <p>
                    <strong>Patient Name:</strong>{" "}
                    {formData.patient_name ||
                        "Not provided"}
                </p>

                <p>
                    <strong>Gender:</strong>{" "}
                    {formData.gender ||
                        "Not selected"}
                </p>

                <p>
                    <strong>
                        Next Appointment Date:
                    </strong>{" "}
                    {formData.next_appointment_date ||
                        "Not provided"}
                </p>

                <p>
                    <strong>Time:</strong>{" "}
                    {formData.appointment_time ||
                        "Not provided"}
                </p>

                <p>
                    <strong>
                        Delivery Deadline:
                    </strong>{" "}
                    {formData.delivery_deadline ||
                        "Not provided"}
                </p>

                <p>
                    <strong>Age:</strong>{" "}
                    {formData.age ||
                        "Not provided"}
                </p>

                <p>
                    <strong>Case Stage:</strong>{" "}
                    {
                        formData.case_stage
                        || "None"
                    }
                </p>
                <h3 className="fw-semibold mb-2 mt-3">
                    Shade Instructions
                </h3>
                <p>
                    <strong>
                        Surface Texture:
                    </strong>{" "}
                    {
                        formData.surface_texture
                        || "None"
                    }
                </p>
                <p>
                    <strong>
                        Glazed Polish:
                    </strong>{" "}
                    {
                        formData.glazed_polish
                        || "None"
                    }
                </p>

                <p>
                    <strong>
                        Incisal Translucency:
                    </strong>{" "}
                    {
                        formData
                            .incisal_translucency
                        || "None"
                    }
                </p>

                <p>
                    <strong>
                        Prepared Tooth Shade:
                    </strong>{" "}
                    {
                        formData
                            .prepared_tooth_shade
                        || "None"
                    }
                </p>

                <p>
                    <strong>
                        Shade Guide Color:
                    </strong>{" "}
                    {
                        formData
                            .shade_guide_color
                        || "None"
                    }
                </p>

                <p>
                    <strong>
                        Material Type:
                    </strong>{" "}
                    {
                        formData
                            .material_type
                            ?.join(", ")
                        || "None"
                    }
                </p>

                <p>
                    <strong>
                        Crown Bridge:
                    </strong>{" "}
                    {
                        formData
                            .crown_bridge
                            ?.join(", ")
                        || "None"
                    }
                </p>

                <p>
                    <strong>
                        Additional Restorations:
                    </strong>{" "}
                    {
                        formData
                            .additional_restorations
                            ?.join(", ")
                        || "None"
                    }
                </p>

                <p>
                    <strong>
                        Additional Instructions:
                    </strong>{" "}
                    {
                        formData
                            .additional_instructions
                        || "None"
                    }
                </p>
                <p>
                    <strong>Digital Files:</strong>
                </p>
                {formData.files?.length >
                    0 ? (
                    <ul>

                        {formData.files.map(
                            (
                                file,
                                index
                            ) => (
                                <li
                                    key={index}
                                >
                                    {
                                        file.name
                                    }
                                </li>
                            )
                        )}

                    </ul>
                ) : (
                    <p>
                        No files
                        uploaded
                    </p>
                )}

            </div>

            {/* GDPR */}

            <div className="mb-3">

                <input
                    type="checkbox"
                    id="gdprConfirm"
                    checked={formData.gdpr_confirm}
                    onChange={(e) =>
                        setFormData(prev => ({
                            ...prev,
                            gdpr_confirm:
                                e.target.checked
                        }))
                    }
                />


                <label
                    htmlFor="gdprConfirm"
                    className="ms-2"
                >
                    I confirm that all
                    uploaded files
                    comply with GDPR
                    regulations
                    <span className="required-star">
                        *
                    </span>
                </label>

                {
                    checkboxErrors?.gdpr_confirm && (
                        <p className="text-danger mt-1">
                            {
                                checkboxErrors.gdpr_confirm
                            }
                        </p>
                    )
                }

            </div>

            {/* DPCA */}

            <div className="mb-3">

                <input
                    type="checkbox"
                    id="dpcaConfirm"
                    checked={formData.dpca_confirm}
                    onChange={(e) =>
                        setFormData(prev => ({
                            ...prev,
                            dpca_confirm:
                                e.target.checked
                        }))
                    }
                />

                <label
                    htmlFor="dpcaConfirm"
                    className="ms-2"
                >
                    I accept the{" "}

                    <a
                        href="https://tcidentallab.com/client/dpca-confirmation"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Data Processing &
                        Confidentiality
                        Agreement
                    </a>

                    <span className="required-star">
                        *
                    </span>
                </label>

                {
                    checkboxErrors?.dpca_confirm && (
                        <p className="text-danger mt-1">
                            {
                                checkboxErrors.dpca_confirm
                            }
                        </p>
                    )
                }

            </div>

            <div className="mb-3">


                <input
                    type="checkbox"
                    id="patientConsent"
                    checked={
                        formData.patient_consent
                    }
                    onChange={(e) =>
                        setFormData(prev => ({
                            ...prev,
                            patient_consent:
                                e.target.checked
                        }))
                    }
                />

                <label
                    htmlFor="patientConsent"
                    className="ms-2"
                >
                    I confirm that the
                    patient has
                    consented to
                    sending these
                    medical files
                    <span className="required-star">
                        *
                    </span>
                </label>

                {
                    checkboxErrors?.patient_consent && (
                        <p className="text-danger mt-1">
                            {
                                checkboxErrors.patient_consent
                            }
                        </p>
                    )
                }

            </div>

            <div className="d-flex justify-content-between">

                <button
                    className="btn btn-outline-primary"
                    onClick={
                        handlePrevious
                    }
                >
                    Previous
                </button>
                <button
                    className="btn btn-success"
                    onClick={handleSubmit}
                >
                    {buttonText}
                </button>

            </div>

        </div>
    );
}

export default ReviewConfirm;