import DoctorSideBar from "../components/DoctorSideBar";
import DoctorHeader from "../components/DoctorHeader";
import "../DoctorStyle/CasesDetail.css";
function NewCases() {
    return (
        <div className="container-fluid p-0">
            <div className="row g-0 doctor-dashboard-main">
                <DoctorSideBar />
                <div className="col-md-9 doctor-main-content">

                    <DoctorHeader title="Dashboard" />
                    <div className="mc-btm-bxx">
                        <div className="step-form-section">
                            <div className="form-container">
                                <div id="formContentContainer">
                                    <h1 className="text-3xl font-bold text-center mb-2" style={{ color: "#0152a8" }}>Submit a Cases</h1>
                                    <div className="progress-bar-container">
                                        <div
                                            className="progress-bar-fill"
                                            id="progressBar"
                                            style={{ width: "0%" }}
                                        ></div>

                                        <div className="step-indicator active"></div>
                                        <div className="step-indicator"></div>
                                        <div className="step-indicator"></div>
                                    </div>
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
                                                    id="patientName"
                                                />

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
                                                    type="date"
                                                    className="form-control"
                                                    id="nextAppointmentDate"
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
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">
                                                    Delivery Deadline

                                                    {/* <span className="required-star">*</span> */}
                                                </label>

                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="deliveryDeadline"
                                                />

                                                <span
                                                    className="validation-msg"
                                                    id="errordeliveryDeadline"
                                                ></span>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">
                                                    Age

                                                    {/* <span className="required-star">*</span> */}
                                                </label>

                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="age"
                                                />

                                                <span
                                                    className="validation-msg"
                                                    id="errorAge"
                                                ></span>
                                            </div>
                                            <div className="col-md-6 my-3">
                                                <label className="form-label d-block">
                                                    Gender

                                                    {/* <span className="required-star">*</span> */}
                                                </label>

                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="gender"
                                                        value="Male"
                                                        id="genderMale"
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
                                                        id="genderFemale"
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

                                                    {/* <span className="required-star">*</span> */}
                                                </label>

                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="tryInFramework"
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
                                                        type="checkbox"
                                                        id="tryInCeramics"
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
                                        <h4 class="fw-bold mb-3">Implant Instructions</h4>
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
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="platformDiameter1"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="screwRetained1"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="screwRetainedHybrid1"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="cementRetainedTiAbutment1"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="zrAbutment1"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="implantBarType1"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="attachmentType1"
                                                            />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="implantType2"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="platformDiameter2"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="screwRetained2"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="screwRetainedHybrid2"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="cementRetainedTiAbutment2"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="zrAbutment2"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="implantBarType2"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="attachmentType2"
                                                            />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="implantType3"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="platformDiameter3"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="screwRetained3"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="screwRetainedHybrid3"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="cementRetainedTiAbutment3"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="zrAbutment3"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="implantBarType3"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="attachmentType3"
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
                                        <div class="text-end">
                                            <button class="btn btn-primary" onclick="nextStep()">Next</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NewCases;