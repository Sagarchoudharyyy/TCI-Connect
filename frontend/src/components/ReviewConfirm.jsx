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
                    {formData.patientId ||
                        "Not provided"}
                </p>

                <p>
                    <strong>Patient Name:</strong>{" "}
                    {formData.patientName ||
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
                    {formData.nextAppointmentDate ||
                        "Not provided"}
                </p>

                <p>
                    <strong>Time:</strong>{" "}
                    {formData.appointmentTime ||
                        "Not provided"}
                </p>

                <p>
                    <strong>
                        Delivery Deadline:
                    </strong>{" "}
                    {formData.deliveryDeadline ||
                        "Not provided"}
                </p>

                <p>
                    <strong>Age:</strong>{" "}
                    {formData.age ||
                        "Not provided"}
                </p>

                <p>
                    <strong>Case Stage:</strong>{" "}
                    {formData.caseStage ||
                        "None"}
                </p>

                <h3 className="fw-semibold mb-2 mt-3">
                    Shade Instructions
                </h3>

                <p>
                    <strong>
                        Surface Texture:
                    </strong>{" "}
                    {formData.surfaceTexture ||
                        "None"}
                </p>

                <p>
                    <strong>
                        Glazed Polish:
                    </strong>{" "}
                    {formData.glazedPolish ||
                        "None"}
                </p>

                <p>
                    <strong>
                        Incisal Translucency:
                    </strong>{" "}
                    {formData.incisalTranslucency ||
                        "None"}
                </p>

                <p>
                    <strong>
                        Prepared Tooth Shade:
                    </strong>{" "}
                    {formData.preparedToothShade ||
                        "None"}
                </p>

                <p>
                    <strong>
                        Shade Guide Color:
                    </strong>{" "}
                    {formData.shadeGuideColor ||
                        "None"}
                </p>

                <p>
                    <strong>
                        Material Type:
                    </strong>{" "}
                    {Array.isArray(
                        formData.materialType
                    )
                        ? formData.materialType.join(", ") ||
                        "None"
                        : "None"}
                </p>

                <p>
                    <strong>
                        Crown Bridge:
                    </strong>{" "}
                    {Array.isArray(
                        formData.crownBridge
                    )
                        ? formData.crownBridge.join(", ") ||
                        "None"
                        : "None"}
                </p>

                <p>
                    <strong>
                        Additional Restorations:
                    </strong>{" "}
                    {Array.isArray(
                        formData.additionalRestorations
                    )
                        ? formData.additionalRestorations.join(", ") ||
                        "None"
                        : "None"}
                </p>

                <p>
                    <strong>
                        Additional Instructions:
                    </strong>{" "}
                    {formData.additionalInstructions ||
                        "None"}
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
                    checked={formData.gdprConfirm}
                    onChange={(e) =>
                        setFormData(prev => ({
                            ...prev,
                            gdprConfirm:
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
                    checkboxErrors?.gdprConfirm && (
                        <p className="text-danger mt-1">
                            {
                                checkboxErrors.gdprConfirm
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
                    checked={formData.dpcaConfirm}
                    onChange={(e) =>
                        setFormData(prev => ({
                            ...prev,
                            dpcaConfirm:
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
                    checkboxErrors?.dpcaConfirm && (
                        <p className="text-danger mt-1">
                            {
                                checkboxErrors.dpcaConfirm
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
                        formData.patientConsent
                    }
                    onChange={(e) =>
                        setFormData(prev => ({
                            ...prev,
                            patientConsent:
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
                    checkboxErrors?.patientConsent && (
                        <p className="text-danger mt-1">
                            {
                                checkboxErrors.patientConsent
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