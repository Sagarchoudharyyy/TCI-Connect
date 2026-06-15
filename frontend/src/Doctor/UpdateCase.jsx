import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../DoctorStyle/UpdateCase.css";
import DoctorSideBar from "../components/DoctorSideBar";
import DoctorHeader from "../components/DoctorHeader";
import PurchaseOrder from "../components/PurchaseOrder";
import UploadDigitalFiles from "../components/UploadDigitalFile";
import ReviewConfirm from "../components/ReviewConfirm";
import SuccessScreen from "../components/SuccessScreen";

function UpdateCase() {

  const { caseId } = useParams();

  const [step, setStep] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [errors, setErrors] =
    useState({});

  const [
    checkboxErrors,
    setCheckboxErrors
  ] = useState({});

  const [formData, setFormData] =
    useState({
      patientName: "",
      patientPhone: "",
      patientId: "",
      nextAppointmentDate: "",
      deliveryDeadline: "",
      age: "",
      gender: "",
      caseStage: [],

      caseStage: "",

      surfaceTexture: "",
      glazedPolish: "",
      incisalTranslucency: "",
      preparedToothShade: "",
      shadeGuideColor: "",

      materialType: [],
      crownBridge: [],

      implantType: "",
      platformDiameter: "",

      screwRetained: false,
      screwRetainedHybrid: false,
      cementRetainedTiAbutment: false,
      zrAbutment: false,

      implantBarType: "",
      attachmentType: "",

      additionalRestorations: [],
      additionalInstructions: "",
      designPreview: "",
      files: [],

      gdprConfirm: false,
      dpcaConfirm: false,
      patientConsent: false
    });
  console.log(formData);

  useEffect(() => {

    fetchCase();

  }, []);

  const fetchCase = async () => {

    try {

      const response =
        await axios.get(
          `http://localhost:8000/api/cases/${caseId}`
        );


      console.log(response.data);
      console.log(response.data.files);

      const data =
        response.data;

      setFormData(prev => ({
        ...prev,

        patientName:
          data.patient_name || "",

        patientPhone:
          data.patient_phone || "",

        patientId:
          data.id || "",

        nextAppointmentDate:
          data.appointment_date
            ?.split("T")[0] || "",

        appointmentTime:
          data.appointment_time || "",

        deliveryDeadline:
          data.delivery_deadline
            ?.split("T")[0] || "",

        age:
          data.age || "",

        gender:
          data.gender || "",

        caseStage:
          data.details?.case_stage || "",

        surfaceTexture:
          data.details?.surface_texture || "",

        glazedPolish:
          data.details?.glazed_polish || "",

        incisalTranslucency:
          data.details
            ?.incisal_translucency || "",

        preparedToothShade:
          data.details
            ?.prepared_tooth_shade || "",

        shadeGuideColor:
          data.details
            ?.shade_guide_color || "",

        materialType:
          typeof data.details
            ?.material_type === "string"
            ? data.details
              .material_type
              .split(",")
            : [],

        crownBridge:
          typeof data.details
            ?.crown_bridge === "string"
            ? data.details
              .crown_bridge
              .split(",")
            : [],

        additionalRestorations:
          typeof data.details
            ?.additional_restorations === "string"
            ? data.details
              .additional_restorations
              .split(",")
            : [],

        additionalInstructions:
          data.details
            ?.additional_instructions || "",

        files:
          Array.isArray(data.files) &&
            data.files.length > 0
            ? data.files.map(file => ({
              id: file.id,
              name: file.file_name,
              path: file.file_path
            }))
            : []
      }));


    } catch (error) {

      console.log(error);
    }

    setLoading(false);
  };

  const handleNext = () => {

    let newErrors = {};

    if (
      step === 1 &&
      !formData.patientName.trim()
    ) {
      newErrors.patientName =
        "Patient Name is required";
    }

    if (step === 2) {
      if (
        !formData.files ||
        formData.files.length === 0
      ) {
        newErrors.files =
          "Upload at least 1 digital file.";
      }
    }

    setErrors(newErrors);

    if (
      Object.keys(newErrors)
        .length > 0
    ) {
      return;
    }

    setStep(step + 1);
  };

  const handlePrevious = () => {

    setStep(step - 1);
  };
  const handleSubmit = async () => {

    let newErrors = {};

    if (
      !formData.gdprConfirm
    ) {
      newErrors.gdprConfirm =
        "You must confirm GDPR compliance.";
      setCheckboxErrors(newErrors);
      return;
    }

    if (
      !formData.dpcaConfirm
    ) {
      newErrors.dpcaConfirm =
        "You must confirm Data Processing & Confidentiality Agreement.";
      setCheckboxErrors(newErrors);
      return;
    }

    if (
      !formData.patientConsent
    ) {
      newErrors.patientConsent =
        "You must confirm that the patient has provided consent for transmitting these medical files (including scans and photos) to the laboratory.";
      setCheckboxErrors(newErrors);
      return;
    }

    setCheckboxErrors({});

    if (
      Object.keys(
        newErrors
      ).length > 0
    ) {
      return;
    }
    try {

      const payload = {

        doctor_id: 4,

        patient_name:
          formData.patientName,

        patient_phone:
          formData.patientPhone,

        gender:
          formData.gender,

        age:
          formData.age
            ? Number(formData.age)
            : null,
        case_type:
          formData.caseStage || "",

        appointment_date:
          formData.nextAppointmentDate || null,

        delivery_deadline:
          formData.deliveryDeadline || null,

        preview_status:
          "Pending",

        status:
          "Submitted",

        details: {
          case_stage:
            formData.caseStage || "",

          surface_texture:
            formData.surfaceTexture || "",

          glazed_polish:
            formData.glazedPolish || "",

          incisal_translucency:
            formData.incisalTranslucency || "",

          prepared_tooth_shade:
            formData.preparedToothShade || "",

          shade_guide_color:
            formData.shadeGuideColor || "",

          material_type:
            formData.materialType || [],

          crown_bridge:
            formData.crownBridge || [],

          implant_type:
            formData.implantType || "",

          platform_diameter:
            formData.platformDiameter || "",

          screw_retained:
            formData.screwRetained || false,

          screw_retained_hybrid:
            formData.screwRetainedHybrid || false,

          cement_retained_ti_abutment:
            formData.cementRetainedTiAbutment || false,

          zr_abutment:
            formData.zrAbutment || false,

          implant_bar_type:
            formData.implantBarType || "",

          attachment_type:
            formData.attachmentType || "",

          additional_restorations:
            formData.additionalRestorations || [],

          design_preview:
            formData.designPreview || "",

          additional_instructions:
            formData.additionalInstructions || ""
        }
      };

      const updateResponse =
        await axios.put(
          `http://localhost:8000/api/cases/${caseId}`,
          payload
        );

      console.log(
        "CASE UPDATED:",
        updateResponse.data
      );

      console.log(
        "FILES:",
        formData.files
      );

      if (
        formData.files &&
        formData.files.length > 0
      ) {
        for (const file of formData.files) {

          if (!(file instanceof File)) {
            continue;
          }

          console.log(
            "Uploading:",
            file.name
          );

          const fileData =
            new FormData();

          fileData.append(
            "file",
            file
          );

          const uploadResponse =
            await axios.post(
              `http://localhost:8000/api/cases/${caseId}/upload`,
              fileData,
              {
                headers: {
                  "Content-Type":
                    "multipart/form-data"
                }
              }
            );

          console.log(
            "UPLOAD SUCCESS:",
            uploadResponse.data
          );
        }
      }

      setStep(4);

    } catch (error) {

      console.log(
        "FULL ERROR:",
        error.response?.data ||
        error
      );
    }
  };

  return (
    <div className="container-fluid p-0">

      <div className="row g-0 doctor-dashboard-main">

        <DoctorSideBar />

        <div className="col-md-9 doctor-main-content">

          <DoctorHeader title="Dashboard" />
          <div className="mc-btm-bxx-cs">

            <section className="step-form-section">

              <div className="form-container">

                <div id="formContentContainer">

                  <h1
                    className="text-center mb-4"
                    style={{
                      color: "#0152a8"
                    }}
                  >
                    Update Case
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
                        }`}
                    ></div>

                    <div
                      className={`step-indicator ${step >= 2
                        ? "active"
                        : ""
                        }`}
                    ></div>

                    <div
                      className={`step-indicator ${step >= 3
                        ? "active"
                        : ""
                        }`}
                    ></div>

                  </div>

                  {step === 1 && (
                    <PurchaseOrder
                      formData={formData}
                      setFormData={
                        setFormData
                      }
                      handleNext={
                        handleNext
                      }
                      errors={errors}
                    />
                  )}

                  {step === 2 && (
                    <UploadDigitalFiles
                      formData={formData}
                      setFormData={
                        setFormData
                      }
                      handleNext={
                        handleNext
                      }
                      handlePrevious={
                        handlePrevious
                      }
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
                      checkboxErrors={
                        checkboxErrors
                      }
                      buttonText="Update Case"
                    />
                  )}

                  {step === 4 && (
                    <SuccessScreen
                      title="Case Updated Successfully!"
                      buttonText="View Cases"
                      redirectPath="/client/cases"
                    />
                  )}

                </div>

              </div>

            </section>

          </div>

        </div>
      </div>
    </div>
  );
}

export default UpdateCase;