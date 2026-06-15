function PurchaseOrder({
    formData,
    setFormData,
    handleNext,
    errors
}) {

    const handleChange = (e) => {
        const { id, value } = e.target;

        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;

        setFormData({
            ...formData,
            [id]: checked
        });
    };
    return (
        <div className="step-content active" style={{ display: "block" }}>
            <h2 className="text-xl font-semibold mb-4" style={{ color: "#0152a8" }}>1. Purchase Order</h2>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">
                        Patient's Name{" "}
                        <span className="required-star">*</span>
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="patientName"
                        value={formData.patientName}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                patientName: e.target.value
                            })
                        }
                    />
                    {
                        errors.patientName && (
                            <span className="text-danger">
                                {errors.patientName}
                            </span>
                        )
                    }

                    <span
                        className="validation-msg"
                        id="errorPatientName"
                    ></span>
                </div>
                <div className="col-md-6">
                    <label className="form-label">
                        Patient Id
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        id="patientId"
                        value={formData.patientId || ""}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                patientId:
                                    e.target.value
                            })
                        }
                        readOnly
                    />

                    <span
                        className="validation-msg"
                        id="errorPatientId"
                    ></span>
                </div>
                <div className="col-md-6">
                    <label className="form-label">
                        Next Appointment Date

                    </label>

                    <input
                        type="datetime-local"
                        className="form-control"
                        id="nextAppointmentDate"
                        value={
                            formData.nextAppointmentDate
                                ? formData.nextAppointmentDate.includes("T")
                                    ? formData.nextAppointmentDate.slice(0, 16)
                                    : `${formData.nextAppointmentDate}T00:00`
                                : ""
                        }
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                nextAppointmentDate:
                                    e.target.value
                            })
                        }
                    />
                    <span
                        className="validation-msg"
                        id="errorNextAppointmentDate"
                    ></span>
                </div>
                <div className="col-md-6">
                    <label className="form-label">
                        Time
                    </label>

                    <input
                        type="time"
                        className="form-control"
                        id="time"
                        value={
                            formData.appointmentTime ||""
                        }
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                appointmentTime:
                                    e.target.value
                            })
                        }
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">
                        Delivery Deadline
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        id="deliveryDeadline"
                        value={formData.deliveryDeadline ||""}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                deliveryDeadline:
                                    e.target.value
                            })
                        }
                    />
                    <span
                        className="validation-msg"
                        id="errordeliveryDeadline"
                    ></span>
                </div>
                <div className="col-md-6">
                    <label className="form-label">
                        Age
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        id="age"
                        value={formData.age}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                age: e.target.value
                            })
                        }
                    />

                    <span
                        className="validation-msg"
                        id="errorAge"
                    ></span>
                </div>
                <div className="col-md-6 my-3">
                    <label className="form-label d-block">
                        Gender
                    </label>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={
                                formData.gender === "Male"
                            }
                            onChange={handleCheckboxChange
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="genderMale"
                        >
                            Male
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={
                                formData.gender === "Female"
                            }
                            onChange={handleCheckboxChange
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="genderFemale"
                        >
                            Female
                        </label>
                    </div>

                    <span
                        className="validation-msg"
                        id="errorGender"
                    ></span>
                </div>
                <div className="col-md-6 my-3">
                    <label className="form-label d-block">
                        Case Stage
                    </label>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="caseStage"
                            id="tryInFramework"
                            value="Try-In Framework"
                            checked={
                                formData.caseStage ===
                                "Try-In Framework"
                            }
                            onChange={handleCheckboxChange}
                        />

                        <label
                            className="form-check-label"
                            htmlFor="tryInFramework"
                        >
                            Try-In Framework
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="caseStage"
                            id="tryInCeramics"
                            value="Try-In Ceramics"
                            checked={
                                formData.caseStage ===
                                "Try-In Ceramics"
                            }
                            onChange={handleCheckboxChange
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="tryInCeramics"
                        >
                            Try-In Ceramics
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="finish"
                            checked={formData.finish || false}
                            onChange={handleCheckboxChange
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="finish"
                        >
                            Finish
                        </label>
                    </div>

                    <span
                        className="validation-msg"
                        id="errorCaseStage"
                    ></span>
                </div>
            </div>
            <h4 className="fw-bold mb-3"> Shade Instructions</h4>
            <div className="row mb-3">

                <div className="col-md-6 my-3">
                    <label className="form-label d-block">
                        Surface Texture
                    </label>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="smooth"
                            checked={formData.smooth || false}
                            onChange={handleCheckboxChange
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="smooth"
                        >
                            Smooth
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="moderate"
                            checked={formData.moderate || false}
                            onChange={handleCheckboxChange
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="moderate"
                        >
                            Moderate
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="heavy"
                            checked={formData.heavy || false}
                            onChange={handleCheckboxChange
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="heavy"
                        >
                            Heavy
                        </label>
                    </div>
                </div>

                <div className="col-md-6 my-3">
                    <label className="form-label d-block">
                        Glazed Polish
                    </label>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="high"
                            checked={formData.high || false}
                            onChange={handleCheckboxChange
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="high"
                        >
                            High
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="moderatePolish"
                            checked={formData.moderatePolish || false}
                            onChange={handleCheckboxChange
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="moderatePolish"
                        >
                            Moderate
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="light"
                            checked={formData.light || false}
                            onChange={handleCheckboxChange
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="light"
                        >
                            Light
                        </label>
                    </div>
                </div>

            </div>
            <div className="row mb-3">

                <div className="col-md-6 my-3">
                    <label className="form-label d-block">
                        Incisal Translucency
                    </label>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="translucencyNone"
                            checked={formData.translucencyNone || false}
                            onChange={handleCheckboxChange
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="translucencyNone"
                        >
                            None
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="translucency0_5mm"
                            checked={formData.translucency0_5mm || false}
                            onChange={handleCheckboxChange
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="translucency0_5mm"
                        >
                            0.5mm
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="translucency1mm"
                            checked={formData.translucency1mm || false}
                            onChange={handleCheckboxChange
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="translucency1mm"
                        >
                            1mm
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="translucencyMax1_5mm"
                            checked={formData.translucencyMax1_5mm || false}
                            onChange={handleCheckboxChange
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="translucencyMax1_5mm"
                        >
                            Maximum 1.5mm
                        </label>
                    </div>
                </div>

                <div className="col-md-6 my-3">
                    <label className="form-label d-block">
                        Prepared Tooth Shade
                    </label>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="greyDiscolored"
                            checked={formData.greyDiscolored || false}
                            onChange={handleCheckboxChange
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="greyDiscolored"
                        >
                            Grey Discolored
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="natural"
                            checked={formData.natural || false}
                            onChange={handleCheckboxChange
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="natural"
                        >
                            Natural
                        </label>
                    </div>
                </div>

                <div className="col-md-12 my-3">
                    <label className="form-label">
                        Shade Guide Color
                        {/* <span className="required-star">*</span> */}
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        id="shadeGuideColor"
                        value={formData.shadeGuideColor || ""}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                shadeGuideColor: e.target.value
                            })
                        }
                    />

                    <span
                        className="validation-msg"
                        id="errorShadeGuideColor"
                    ></span>
                </div>
            </div>
            <div className="mb-4">
                <label className="form-label d-block">
                    Material Type

                    {/* <span className="required-star">*</span> */}
                </label>

                <div className="row">

                    <div className="col-md-6 my-3">

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="titan"
                                checked={formData.titan || false}
                                onChange={handleCheckboxChange
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor="titan"
                            >
                                TITAN
                            </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="zirconia"
                                checked={formData.zirconia || false}
                                onChange={handleCheckboxChange
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor="zirconia"
                            >
                                Zirconia
                            </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="multilayerZirconiaKatana"
                                checked={formData.multilayerZirconiaKatana || false}
                                onChange={handleCheckboxChange
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor="multilayerZirconiaKatana"
                            >
                                Multilayer Zirconia Katana
                            </label>
                        </div>

                    </div>

                    <div className="col-md-6 my-3">

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="nickelChrome"
                                checked={formData.nickelChrome || false}
                                onChange={handleCheckboxChange
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor="nickelChrome"
                            >
                                Nickel-Chrome
                            </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="pmma"
                                checked={formData.pmma || false}
                                onChange={handleCheckboxChange
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor="pmma"
                            >
                                PMMA
                            </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="chromeCobaltKeraCadCam"
                                checked={formData.chromeCobaltKeraCadCam || false}
                                onChange={handleCheckboxChange
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor="chromeCobaltKeraCadCam"
                            >
                                Chrome-Cobalt Kera CAD/CAM
                            </label>
                        </div>

                    </div>

                </div>

                <span
                    className="validation-msg"
                    id="errorMaterialType"
                ></span>
            </div>
            <div className="mb-4">
                <label className="form-label d-block">
                    Crown &amp; Bridge Instructions

                    {/* <span className="required-star">*</span> */}
                </label>

                <div className="row">

                    <div className="col-md-6">

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="crown"
                                checked={formData.crown || false}
                                onChange={handleCheckboxChange
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor="crown"
                            >
                                Crown
                            </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="bridge"
                                checked={formData.bridge || false}
                                onChange={handleCheckboxChange
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor="bridge"
                            >
                                Bridge
                            </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="fullContourCrown"
                                checked={formData.fullContourCrown || false}
                                onChange={handleCheckboxChange
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor="fullContourCrown"
                            >
                                Full Contour Crown
                            </label>
                        </div>

                    </div>

                    <div className="col-md-6">

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlayOnlay"
                                checked={formData.inlayOnlay || false}
                                onChange={handleCheckboxChange
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor="inlayOnlay"
                            >
                                Inlay/Onlay
                            </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="postCore"
                                checked={formData.postCore || false}
                                onChange={handleCheckboxChange
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor="postCore"
                            >
                                Post &amp; Core
                            </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="veneer"
                                checked={formData.veneer || false}
                                onChange={handleCheckboxChange
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor="veneer"
                            >
                                Veneer
                            </label>
                        </div>

                    </div>

                </div>

                <span
                    className="validation-msg"
                    id="errorCrownBridge"
                ></span>
            </div>
            <h4 className="fw-bold mb-3">Implant Instructions</h4>
            <div className="table-responsive">
                <table className="table table-bordered align-middle text-center">

                    <thead className="table-success">

                        <tr>
                            <th colSpan="2">
                                Implant Information
                            </th>

                            <th colSpan="6">
                                Restoration Type / Abutment Choice
                            </th>
                        </tr>

                        <tr>
                            <th>Implant Type</th>
                            <th>Platform Diameter</th>
                            <th>Screw Retained</th>
                            <th>Screw Retained Hybrid</th>
                            <th>Cement Retained - Ti Abutment</th>
                            <th>Zr Abutment</th>
                            <th>Implant Bar Type</th>
                            <th>Attachment Type</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="implantType1"
                                    value={formData.implantType1 || ""}
                                    onChange={handleChange}
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="platformDiameter1"
                                    value={formData.platformDiameter1 || ""}
                                    onChange={handleChange}
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="screwRetained1"
                                    value={formData.screwRetained1 || ""}
                                    onChange={handleChange}
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="screwRetainedHybrid1"
                                    value={formData.screwRetainedHybrid1 || ""}
                                    onChange={handleChange}
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cementRetainedTiAbutment1"
                                    value={formData.cementRetainedTiAbutment1 || ""}
                                    onChange={handleChange}
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="zrAbutment1"
                                    value={formData.zrAbutment1 || ""}
                                    onChange={handleChange}
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="implantBarType1"
                                    value={formData.implantBarType1 || ""}
                                    onChange={handleChange}
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="attachmentType1"
                                    value={formData.attachmentType1 || ""}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>

                    </tbody>
                </table>

                <span
                    className="validation-msg"
                    id="errorImplantInfo"
                ></span>
            </div>
            <div className="mb-4">
                <label className="form-label">
                    Additional Restorations
                </label>

                <div className="row">

                    <div className="col-md-6">

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="bleachingTray"
                                checked={formData.bleachingTray || false}
                                onChange={handleCheckboxChange
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor="bleachingTray"
                            >
                                Bleaching Tray
                            </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="pei"
                                checked={formData.pei || false}
                                onChange={handleCheckboxChange
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor="pei"
                            >
                                P.E.I
                            </label>
                        </div>

                    </div>

                    <div className="col-md-6">

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="transparentNightGuard"
                                checked={formData.transparentNightGuard || false}
                                onChange={handleCheckboxChange
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor="transparentNightGuard"
                            >
                                Transparent Night Guard Soft / Hard Dual
                            </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="fullArchPrintedMasterModel"
                                checked={formData.fullArchPrintedMasterModel || false}
                                onChange={handleCheckboxChange
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor="fullArchPrintedMasterModel"
                            >
                                Full Arch Printed Master Model
                            </label>
                        </div>

                    </div>

                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Design Preview
                </label>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="designPreview"
                        name="design_preview_request"
                        value="1"
                        checked={formData.designPreview || false}
                        onChange={handleCheckboxChange
                        }
                    />

                    <label
                        className="form-check-label"
                        htmlFor="designPreview"
                    >
                        Request a Design Preview Before Production
                    </label>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Additional Instructions
                </label>

                <textarea
                    className="form-control"
                    rows="3"
                    id="additionalInstructions"
                    value={formData.additionalInstructions || ""}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            additionalInstructions: e.target.value
                        })
                    }
                ></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Case Document
                </label>

                <input
                    type="file"
                    className="form-control"
                    id="pdfUpload"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            pdfUpload: e.target.files[0]
                        })
                    }
                />

                <div
                    id="pdfProgressContainer"
                    className="mt-2"
                ></div>

                <span
                    className="validation-msg"
                    id="errorPdfUpload"
                ></span>

                <span
                    className="validation-msg"
                    id="successPdfUpload"
                ></span>
            </div>
            <div className="text-end">
                <button className="btn btn-primary"
                    onClick={handleNext}>Next</button>
            </div>

        </div>

    )

}
export default PurchaseOrder;