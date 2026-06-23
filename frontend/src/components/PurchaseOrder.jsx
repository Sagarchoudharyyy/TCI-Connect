import "../DoctorStyle/NewCases.css";
import axios from "axios";

function PurchaseOrder({
    formData,
    setFormData,
    handleNext,
    pdfUpload,
    pdfProgress,
    setPdfProgress,
    setUploadedPdf,
    handleCheckboxSelection,
    handleImplantChange,
    errors
}) {

    const removePdfFile = async () => {

        try {

            if (formData.pdfUpload?.id) {

                await axios.delete(
                    `http://localhost:8000/api/case-files/${formData.pdfUpload.id}`
                );
            }

            setFormData({
                ...formData,
                pdfUpload: null
            });

            setPdfProgress(0);

        } catch (error) {

            console.log(error);

            alert("Failed to delete file");
        }
    };

    const handlePdfChange = async (e) => {

        if (formData.pdfUpload) {

            alert(
                "Please delete the existing case document before uploading a new one."
            );

            e.target.value = "";
            return;
        }

        setPdfProgress(0);

        const file = e.target.files[0];

        if (!file) return;

        setFormData({
            ...formData,
            pdfUpload: file
        });

        const uploadData = new FormData();
        uploadData.append("file", file);

        try {

            const response = await axios.post(
                "http://localhost:8000/api/temp-upload",
                uploadData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    onUploadProgress: (progressEvent) => {

                        const percent = Math.round(
                            (progressEvent.loaded * 100) /
                            progressEvent.total
                        );

                        setPdfProgress(percent);
                    }
                }
            );

            setUploadedPdf(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to upload file");
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;

        setFormData({
            ...formData,
            [id]: value
        });
    };
    return (
        <div className="step-content active " style={{ display: "block" }}>
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
                        value={formData.patient_name || ""}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                patient_name: e.target.value
                            })
                        }
                    />
                    {
                        errors.patient_name && (
                            <span className="text-danger">
                                {errors.patient_name}
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
                        value={formData.patient_id || ""}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                patient_id:
                                    e.target.value
                            })
                        }

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
                        id="next_appointment_date"
                        value={
                            formData.next_appointment_date || ""
                        }
                        onChange={(e) =>
                            setFormData(prev => ({
                                ...prev,
                                next_appointment_date:
                                    e.target.value
                            }))
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
                        id="appointment_time"
                        value={
                            formData.appointment_time || ""
                        }
                        onChange={(e) =>
                            setFormData(prev => ({
                                ...prev,
                                appointment_time:
                                    e.target.value
                            }))
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
                        id="delivery_deadline"
                        value={
                            formData.delivery_deadline || ""
                        }
                        onChange={(e) =>
                            setFormData(prev => ({
                                ...prev,
                                delivery_deadline:
                                    e.target.value
                            }))
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
                        value={formData.age || ""}
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
                            id="genderMale"
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={
                                formData.gender === "Male"
                            }
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    gender: e.target.value
                                }))

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
                            id="genderFemale"
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={
                                formData.gender === "Female"
                            }
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    gender: e.target.value
                                }))
                            }

                        />


                        <label
                            className="form-check-label"
                            htmlFor="genderFemale"
                        >
                            Female
                        </label>
                    </div>
                </div>
                <div className="col-md-6 my-3">
                    <label className="form-label d-block">
                        Case Stage
                    </label>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="caseStage"
                            id="tryInFramework"
                            value="Try-In Framework"
                            checked={
                                formData.case_stage.includes(
                                    "Try-In Framework"
                                )
                            }
                            onChange={() =>
                                handleCheckboxSelection(
                                    "case_stage",
                                    "Try-In Framework"
                                )
                            }

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
                            name="caseStage"
                            id="tryInCeramics"
                            value="Try-In Ceramics"
                            checked={
                                formData.case_stage.includes(
                                    "Try-In Ceramics"
                                )
                            }
                            onChange={() =>
                                handleCheckboxSelection(
                                    "case_stage",
                                    "Try-In Ceramics"
                                )
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
                            checked={
                                formData.case_stage.includes(
                                    "Finish"
                                )
                            }
                            onChange={() =>
                                handleCheckboxSelection(
                                    "case_stage",
                                    "Finish"
                                )
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
                            checked={formData.surface_texture.includes("Smooth")}
                            onChange={() =>
                                handleCheckboxSelection(
                                    "surface_texture",
                                    "Smooth"
                                )
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
                            checked={formData.surface_texture.includes("Moderate")}
                            onChange={() =>
                                handleCheckboxSelection(
                                    "surface_texture",
                                    "Moderate"
                                )
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
                            checked={formData.surface_texture.includes("Heavy")}
                            onChange={() =>
                                handleCheckboxSelection(
                                    "surface_texture",
                                    "Heavy"
                                )
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
                            checked={formData.glazed_polish.includes("High")}
                            onChange={() =>
                                handleCheckboxSelection(
                                    "glazed_polish",
                                    "High"
                                )
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
                            checked={formData.glazed_polish.includes("Moderate")}
                            onChange={() =>
                                handleCheckboxSelection(
                                    "glazed_polish",
                                    "Moderate"
                                )
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
                            checked={formData.glazed_polish.includes("Light")}
                            onChange={() =>
                                handleCheckboxSelection(
                                    "glazed_polish",
                                    "Light"
                                )
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
                            checked={formData.incisal_translucency.includes("None")}
                            onChange={() =>
                                handleCheckboxSelection(
                                    "incisal_translucency",
                                    "None"
                                )
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
                            checked={formData.incisal_translucency.includes("0.5mm")}
                            onChange={() =>
                                handleCheckboxSelection(
                                    "incisal_translucency",
                                    "0.5mm"
                                )
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
                            checked={formData.incisal_translucency.includes("1mm")}
                            onChange={() =>
                                handleCheckboxSelection(
                                    "incisal_translucency",
                                    "1mm"
                                )
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
                            checked={formData.incisal_translucency.includes(
                                "Maximum 1.5mm"
                            )}
                            onChange={() =>
                                handleCheckboxSelection(
                                    "incisal_translucency",
                                    "Maximum 1.5mm"
                                )
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
                            checked={formData.prepared_tooth_shade.includes(
                                "Grey Discolored"
                            )}
                            onChange={() =>
                                handleCheckboxSelection(
                                    "prepared_tooth_shade",
                                    "Grey Discolored"
                                )
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
                            checked={formData.prepared_tooth_shade.includes(
                                "Natural"
                            )}
                            onChange={() =>
                                handleCheckboxSelection(
                                    "prepared_tooth_shade",
                                    "Natural"
                                )
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
            </div>
            <div className="col-md-12 my-3">
                <label className="form-label">
                    Shade Guide Color
                </label>

                <input
                    type="text"
                    className="form-control"
                    id="shadeGuideColor"
                    value={formData.shade_guide_color || ""}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            shade_guide_color: e.target.value
                        }))
                    }
                />

                <span
                    className="validation-msg"
                    id="errorShadeGuideColor"
                ></span>
            </div>
            <div className="mb-4">
                <label className="form-label d-block">
                    Material Type


                </label>

                <div className="row">

                    <div className="col-md-6 my-3">

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="titan"
                                checked={
                                    formData.material_type?.includes(
                                        "TITAN"
                                    )
                                }
                                onChange={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        material_type:
                                            prev.material_type?.includes(
                                                "TITAN"
                                            )
                                                ? prev.material_type.filter(
                                                    item =>
                                                        item !== "TITAN"
                                                )
                                                : [
                                                    ...(
                                                        prev.material_type || []
                                                    ),
                                                    "TITAN"
                                                ]
                                    }))
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
                                checked={
                                    formData.material_type?.includes(
                                        "Zirconia"
                                    )
                                }
                                onChange={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        material_type:
                                            prev.material_type?.includes(
                                                "Zirconia"
                                            )
                                                ? prev.material_type.filter(
                                                    item =>
                                                        item !== "Zirconia"
                                                )
                                                : [
                                                    ...(
                                                        prev.material_type || []
                                                    ),
                                                    "Zirconia"
                                                ]
                                    }))
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
                                checked={
                                    formData.material_type?.includes(
                                        "Multilayer Zirconia Katana"
                                    )
                                }
                                onChange={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        material_type:
                                            prev.material_type?.includes(
                                                "Multilayer Zirconia Katana"
                                            )
                                                ? prev.material_type.filter(
                                                    item =>
                                                        item !== "Multilayer Zirconia Katana"
                                                )
                                                : [
                                                    ...(
                                                        prev.material_type || []
                                                    ),
                                                    "Multilayer Zirconia Katana"
                                                ]
                                    }))
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
                                checked={
                                    formData.material_type?.includes(
                                        "Nickel-Chrome"
                                    )
                                }
                                onChange={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        material_type:
                                            prev.material_type?.includes(
                                                "Nickel-Chrome"
                                            )
                                                ? prev.material_type.filter(
                                                    item =>
                                                        item !== "Nickel-Chrome"
                                                )
                                                : [
                                                    ...(
                                                        prev.material_type || []
                                                    ),
                                                    "Nickel-Chrome"
                                                ]
                                    }))
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
                                checked={
                                    formData.material_type?.includes(
                                        "PMMA"
                                    )
                                }
                                onChange={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        material_type:
                                            prev.material_type?.includes(
                                                "PMMA"
                                            )
                                                ? prev.material_type.filter(
                                                    item =>
                                                        item !== "PMMA"
                                                )
                                                : [
                                                    ...(
                                                        prev.material_type || []
                                                    ),
                                                    "PMMA"
                                                ]
                                    }))
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
                                checked={
                                    formData.material_type?.includes(
                                        "Chrome-Cobalt Kera CAD/CAM"
                                    )
                                }
                                onChange={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        material_type:
                                            prev.material_type?.includes(
                                                "Chrome-Cobalt Kera CAD/CAM"
                                            )
                                                ? prev.material_type.filter(
                                                    item =>
                                                        item !== "Chrome-Cobalt Kera CAD/CAM"
                                                )
                                                : [
                                                    ...(
                                                        prev.material_type || []
                                                    ),
                                                    "Chrome-Cobalt Kera CAD/CAM"
                                                ]
                                    }))
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


                </label>

                <div className="row">

                    <div className="col-md-6">

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="crown"
                                checked={
                                    formData.crown_bridge?.includes(
                                        "Crown"
                                    )
                                }
                                onChange={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        crown_bridge:
                                            prev.crown_bridge?.includes(
                                                "Crown"
                                            )
                                                ? prev.crown_bridge.filter(
                                                    item =>
                                                        item !== "Crown"
                                                )
                                                : [
                                                    ...(prev.crown_bridge || []),
                                                    "Crown"
                                                ]
                                    }))
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
                                checked={
                                    formData.crown_bridge?.includes(
                                        "Bridge"
                                    )
                                }
                                onChange={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        crown_bridge:
                                            prev.crown_bridge?.includes(
                                                "Bridge"
                                            )
                                                ? prev.crown_bridge.filter(
                                                    item =>
                                                        item !== "Bridge"
                                                )
                                                : [
                                                    ...(prev.crown_bridge || []),
                                                    "Bridge"
                                                ]
                                    }))
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
                                checked={
                                    formData.crown_bridge?.includes(
                                        " Full Contour Crown"
                                    )
                                }
                                onChange={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        crown_bridge:
                                            prev.crown_bridge?.includes(
                                                " Full Contour Crown"
                                            )
                                                ? prev.crown_bridge.filter(
                                                    item =>
                                                        item !== " Full Contour Crown"
                                                )
                                                : [
                                                    ...(prev.crown_bridge || []),
                                                    " Full Contour Crown"
                                                ]
                                    }))
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
                                checked={
                                    formData.crown_bridge?.includes(
                                        "Inlay/Onlay"
                                    )
                                }
                                onChange={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        crown_bridge:
                                            prev.crown_bridge?.includes(
                                                "Inlay/Onlay"
                                            )
                                                ? prev.crown_bridge.filter(
                                                    item =>
                                                        item !== "Inlay/Onlay"
                                                )
                                                : [
                                                    ...(prev.crown_bridge || []),
                                                    "Inlay/Onlay"
                                                ]
                                    }))
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
                                checked={
                                    formData.crown_bridge?.includes(
                                        "Post & Core"
                                    )
                                }
                                onChange={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        crown_bridge:
                                            prev.crown_bridge?.includes(
                                                "Post & Core"
                                            )
                                                ? prev.crown_bridge.filter(
                                                    item =>
                                                        item !== "Post & Core"
                                                )
                                                : [
                                                    ...(prev.crown_bridge || []),
                                                    "Post & Core"
                                                ]
                                    }))
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
                                checked={
                                    formData.crown_bridge?.includes(
                                        "Veneer"
                                    )
                                }
                                onChange={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        crown_bridge:
                                            prev.crown_bridge?.includes(
                                                "Veneer"
                                            )
                                                ? prev.crown_bridge.filter(
                                                    item =>
                                                        item !== "Veneer"
                                                )
                                                : [
                                                    ...(prev.crown_bridge || []),
                                                    "Veneer"
                                                ]
                                    }))
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
                    <thead className="implant-header">
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
                                    value={
                                        formData.implant_details?.[0]
                                            ?.implant_type || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(
                                            0,
                                            "implant_type",
                                            e.target.value
                                        )
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="platformDiameter1"
                                    value={
                                        formData.implant_details?.[0]
                                            ?.platform_diameter || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(
                                            0,
                                            "platform_diameter",
                                            e.target.value
                                        )
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="screwRetained1"
                                    value={
                                        formData.implant_details?.[0]
                                            ?.screw_retained || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(
                                            0,
                                            "screw_retained",
                                            e.target.value
                                        )
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="screwRetainedHybrid1"
                                    value={
                                        formData.implant_details?.[0]
                                            ?.screw_retained_hybrid || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(0, "screw_retained_hybrid", e.target.value)
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cementRetainedTiAbutment1"
                                    value={
                                        formData.implant_details?.[0]
                                            ?.cement_retained_ti_abutment || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(0, "cement_retained_ti_abutment", e.target.value)

                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="zrAbutment1"
                                    value={
                                        formData.implant_details?.[0]
                                            ?.zr_abutment || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(0, "zr_abutment", e.target.value)
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="implantBarType1"
                                    value={
                                        formData.implant_details?.[0]
                                            ?.implant_bar_type || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(0, "implant_bar_type", e.target.value)
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="attachmentType1"
                                    value={
                                        formData.implant_details?.[0]
                                            ?.attachment_type || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(0, "attachment_type", e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="implantType1"
                                    value={
                                        formData.implant_details?.[1]
                                            ?.implant_type || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(
                                            1,
                                            "implant_type",
                                            e.target.value
                                        )
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="platformDiameter1"
                                    value={
                                        formData.implant_details?.[1]
                                            ?.platform_diameter || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(
                                            1,
                                            "platform_diameter",
                                            e.target.value
                                        )
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="screwRetained1"
                                    value={
                                        formData.implant_details?.[1]
                                            ?.screw_retained || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(
                                            1,
                                            "screw_retained",
                                            e.target.value
                                        )
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="screwRetainedHybrid1"
                                    value={
                                        formData.implant_details?.[1]
                                            ?.screw_retained_hybrid || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(1, "screw_retained_hybrid", e.target.value)
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cementRetainedTiAbutment1"
                                    value={
                                        formData.implant_details?.[1]
                                            ?.cement_retained_ti_abutment || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(1, "cement_retained_ti_abutment", e.target.value)

                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="zrAbutment1"
                                    value={
                                        formData.implant_details?.[1]
                                            ?.zr_abutment || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(1, "zr_abutment", e.target.value)
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="implantBarType1"
                                    value={
                                        formData.implant_details?.[1]
                                            ?.implant_bar_type || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(1, "implant_bar_type", e.target.value)
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="attachmentType1"
                                    value={
                                        formData.implant_details?.[1]
                                            ?.attachment_type || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(1, "attachment_type", e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="implantType1"
                                    value={
                                        formData.implant_details?.[2]
                                            ?.implant_type || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(
                                            2,
                                            "implant_type",
                                            e.target.value
                                        )
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="platformDiameter1"
                                    value={
                                        formData.implant_details?.[2]
                                            ?.platform_diameter || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(
                                            2,
                                            "platform_diameter",
                                            e.target.value
                                        )
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="screwRetained1"
                                    value={
                                        formData.implant_details?.[2]
                                            ?.screw_retained || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(
                                            2,
                                            "screw_retained",
                                            e.target.value
                                        )
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="screwRetainedHybrid1"
                                    value={
                                        formData.implant_details?.[2]
                                            ?.screw_retained_hybrid || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(2, "screw_retained_hybrid", e.target.value)
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cementRetainedTiAbutment1"
                                    value={
                                        formData.implant_details?.[2]
                                            ?.cement_retained_ti_abutment || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(2, "cement_retained_ti_abutment", e.target.value)

                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="zrAbutment1"
                                    value={
                                        formData.implant_details?.[2]
                                            ?.zr_abutment || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(2, "zr_abutment", e.target.value)
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="implantBarType1"
                                    value={
                                        formData.implant_details?.[2]
                                            ?.implant_bar_type || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(2, "implant_bar_type", e.target.value)
                                    }
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="attachmentType1"
                                    value={
                                        formData.implant_details?.[2]
                                            ?.attachment_type || ""
                                    }
                                    onChange={(e) =>
                                        handleImplantChange(2, "attachment_type", e.target.value)
                                    }
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
                                checked={
                                    formData.additional_restorations?.includes(
                                        "Bleaching Tray"
                                    )
                                }
                                onChange={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        additional_restorations:
                                            prev.additional_restorations?.includes(
                                                "Bleaching Tray"
                                            )
                                                ? prev.additional_restorations.filter(
                                                    item =>
                                                        item !==
                                                        "Bleaching Tray"
                                                )
                                                : [
                                                    ...(prev.additional_restorations || []),
                                                    "Bleaching Tray"
                                                ]
                                    }))
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
                                checked={
                                    formData.additional_restorations?.includes(
                                        "P.E.I"
                                    )
                                }
                                onChange={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        additional_restorations:
                                            prev.additional_restorations?.includes(
                                                "P.E.I"
                                            )
                                                ? prev.additional_restorations.filter(
                                                    item =>
                                                        item !== "P.E.I"
                                                )
                                                : [
                                                    ...(prev.additional_restorations || []),
                                                    "P.E.I"
                                                ]
                                    }))
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
                                checked={
                                    formData.additional_restorations?.includes(
                                        "Transparent Night Guard Soft / Hard Dual"
                                    )
                                }
                                onChange={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        additional_restorations:
                                            prev.additional_restorations?.includes(
                                                "Transparent Night Guard Soft / Hard Dual"
                                            )
                                                ? prev.additional_restorations.filter(
                                                    item =>
                                                        item !==
                                                        "Transparent Night Guard Soft / Hard Dual"
                                                )
                                                : [
                                                    ...(prev.additional_restorations || []),
                                                    "Transparent Night Guard Soft / Hard Dual"
                                                ]
                                    }))
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
                                checked={
                                    formData.additional_restorations?.includes(
                                        "Full Arch Printed Master Model"
                                    )
                                }
                                onChange={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        additional_restorations:
                                            prev.additional_restorations?.includes(
                                                "Full Arch Printed Master Model"
                                            )
                                                ? prev.additional_restorations.filter(
                                                    item =>
                                                        item !==
                                                        "Full Arch Printed Master Model"
                                                )
                                                : [
                                                    ...(prev.additional_restorations || []),
                                                    "Full Arch Printed Master Model"
                                                ]
                                    }))
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
                        checked={
                            formData.design_preview
                        }
                        onChange={(e) =>
                            setFormData(prev => ({
                                ...prev,
                                design_preview:
                                    e.target.checked
                            }))
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
                    value={formData.additional_instructions || ""}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            additional_instructions: e.target.value
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
                    onChange={handlePdfChange}
                />
                {formData.pdfUpload && (
                    <div className="d-flex align-items-center gap-3 mb-3 p-2 border rounded mt-2">

                        <span style={{ width: "350px" }}>
                            {formData.pdfUpload.file_name ||
                                formData.pdfUpload.name}
                        </span>

                        <span
                            className={`badge ${pdfProgress === 100
                                ? "bg-success"
                                : "bg-secondary"
                                }`}
                        >
                            {pdfProgress === 100
                                ? "uploaded"
                                : "uploading"}
                        </span>

                        <div className="progress flex-grow-1">
                            <div
                                className={`progress-bar ${pdfProgress === 100
                                    ? "bg-success"
                                    : ""
                                    }`}
                                role="progressbar"
                                style={{
                                    width: `${pdfProgress}%`
                                }}
                            >
                                {pdfProgress === 100
                                    ? "100%"
                                    : `${pdfProgress}%`}
                            </div>
                        </div>

                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={removePdfFile}
                            disabled={pdfProgress < 100}
                        >
                            Remove
                        </button>
                    </div>
                )}
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
                <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={formData.pdfUpload && pdfProgress < 100}
                >
                    Next
                </button>
            </div>

        </div>

    )

}
export default PurchaseOrder;