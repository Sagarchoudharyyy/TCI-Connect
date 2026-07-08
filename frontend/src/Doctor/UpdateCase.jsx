import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

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

  const [pdfProgress, setPdfProgress] = useState(0);
  const [uploadedPdf, setUploadedPdf] = useState(null);
  const [digitalProgress, setDigitalProgress] = useState(0);
  const [isPdfUploading, setIsPdfUploading] = useState(false);
  const [digitalFiles, setDigitalFiles] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  const [formData, setFormData] =
    useState({

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

      additional_instructions: "",
      design_preview: false,

      pdfUpload: null,

      files: [],

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

      gdpr_confirm: false,
      dpca_confirm: false,
      patient_consent: false
    });

  useEffect(() => {

    const fetchCase = async () => {

      try {
        const response = await api.get(`/cases/${caseId}`);
        const data = response.data;

        const existingDigitalFiles =
          data.files
            ?.filter(
              (file) => file.file_category === "digital_file"
            )
            .map((file) => ({
              id: file.id,
              file_name: file.file_name,
              file_path: file.file_path,
              file_type: file.file_type,
              file_category: file.file_category,
              progress: 100,
              status: "uploaded",
            })) || [];

        setDigitalFiles(existingDigitalFiles);

        const materialTypes =
          Array.isArray(
            data.details?.material_type
          )
            ? data.details.material_type
            : typeof data.details
              ?.material_type ===
              "string"
              ? data.details.material_type
                .split(",")
                .map(item =>
                  item.trim()
                )
              : [];

        const crownBridge =
          Array.isArray(
            data.details?.crown_bridge
          )
            ? data.details.crown_bridge
            : typeof data.details
              ?.crown_bridge ===
              "string"
              ? data.details.crown_bridge
                .split(",")
                .map(item =>
                  item.trim()
                )
              : [];

        const restorations =
          Array.isArray(
            data.details
              ?.additional_restorations
          )
            ? data.details
              .additional_restorations
            : typeof data.details
              ?.additional_restorations ===
              "string"
              ? data.details
                .additional_restorations
                .split(",")
                .map(item =>
                  item.trim()
                )
              : [];

        setFormData(prev => {

          if (prev.patient_id === data.id) {
            return prev;
          }

          return {
            ...prev,

            patient_name:
              data.patient_name || "",

            patient_phone:
              data.patient_phone || "",

            patient_id:
              data.id || "",

            next_appointment_date:
              data.appointment_date
                ?.split("T")[0] || "",

            appointment_time:
              data.appointment_time
                ?.slice(0, 5) || "",

            delivery_deadline:
              data.delivery_deadline
                ?.split("T")[0] || "",

            age:
              data.age || "",

            gender:
              data.gender || "",

            case_stage:
              Array.isArray(data.details?.case_stage)
                ? data.details.case_stage
                : typeof data.details?.case_stage === "string"
                  ? data.details.case_stage
                    .split(",")
                    .map(item => item.trim())
                  : [],
            surface_texture:
              Array.isArray(data.details?.surface_texture)
                ? data.details.surface_texture
                : typeof data.details?.surface_texture === "string"
                  ? data.details.surface_texture
                    .split(",")
                    .map(item => item.trim())
                  : [],

            glazed_polish:
              Array.isArray(data.details?.glazed_polish)
                ? data.details.glazed_polish
                : typeof data.details?.glazed_polish === "string"
                  ? data.details.glazed_polish
                    .split(",")
                    .map(item => item.trim())
                  : [],

            incisal_translucency:
              Array.isArray(data.details?.incisal_translucency)
                ? data.details.incisal_translucency
                : typeof data.details?.incisal_translucency === "string"
                  ? data.details.incisal_translucency
                    .split(",")
                    .map(item => item.trim())
                  : [],

            prepared_tooth_shade:
              Array.isArray(data.details?.prepared_tooth_shade)
                ? data.details.prepared_tooth_shade
                : typeof data.details?.prepared_tooth_shade === "string"
                  ? data.details.prepared_tooth_shade
                    .split(",")
                    .map(item => item.trim())
                  : [],

            shade_guide_color:
              data.details
                ?.shade_guide_color || "",

            material_type:
              materialTypes,

            crown_bridge:
              crownBridge,

            additional_restorations:
              restorations,

            implant_details:
              data.details
                ?.implant_details
                ?.length > 0
                ? data.details
                  .implant_details
                : [
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

            design_preview:
              data.details
                ?.design_preview || false,

            additional_instructions:
              data.details
                ?.additional_instructions || "",

            pdfUpload:
              data.files?.find(
                file =>
                  file.file_category ===
                  "case_document"
              ) || null,

            files: existingDigitalFiles
          }
        }
        );


      }
      catch (error) {

        console.log(
          "FETCH ERROR:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

    if (caseId) {
      fetchCase();
    }
  }, [caseId]);


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
  const handleNext = () => {

    let newErrors = {};

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

    if (step === 2) {
      if (
        !digitalFiles ||
        digitalFiles.length === 0
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

    setStep(prev => prev + 1);
  };
  const handlePrevious = () => {

    setStep(step - 1);
  };
  const handleSubmit = async () => {

    let newErrors = {};

    if (
      !formData.gdpr_confirm
    ) {

      newErrors.gdpr_confirm =
        "You must confirm GDPR compliance.";

      setCheckboxErrors(
        newErrors
      );

      return;
    }

    if (
      !formData.dpca_confirm
    ) {

      newErrors.dpca_confirm =
        "You must confirm Data Processing & Confidentiality Agreement.";

      setCheckboxErrors(
        newErrors
      );

      return;
    }

    if (
      !formData.patient_consent
    ) {

      newErrors.patient_consent =
        "You must confirm that the patient has provided consent for transmitting these medical files (including scans and photos) to the laboratory.";

      setCheckboxErrors(
        newErrors
      );

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

        patient_name:
          formData.patient_name,

        patient_phone:
          formData.patient_phone,

        gender:
          formData.gender || null,

        age:
          formData.age
            ? Number(
              formData.age
            )
            : null,

        appointment_date:
          formData
            .next_appointment_date
            ? new Date(
              formData
                .next_appointment_date
            ).toISOString()
            : null,

        appointment_time:
          formData
            .appointment_time
          || null,

        delivery_deadline:
          formData
            .delivery_deadline
          || null,

        preview_status:
          "-",

        status:
          "Submitted",

        details: {

          case_stage:
            formData
              .case_stage
            || null,

          surface_texture:
            formData
              .surface_texture
            || null,

          glazed_polish:
            formData
              .glazed_polish
            || null,

          incisal_translucency:
            formData
              .incisal_translucency
            || null,

          prepared_tooth_shade:
            formData
              .prepared_tooth_shade
            || null,

          shade_guide_color:
            formData
              .shade_guide_color
            || null,

          material_type:
            formData
              .material_type || [],

          crown_bridge:
            formData
              .crown_bridge || [],

          additional_restorations:
            formData
              .additional_restorations
            || [],

          implant_details:
            formData
              .implant_details
            || [],

          design_preview:
            formData
              .design_preview
            || false,

          additional_instructions:
            formData
              .additional_instructions
            || null
        }
      };

      const updateResponse = await api.put(
        `/cases/${caseId}`,
        payload
      );


      if (
        formData.pdfUpload?.file_path &&
        formData.pdfUpload.file_path.includes("temp_uploads")
      ) {
        const response = await api.post(
          `/cases/${caseId}/save-temp-file`,
          {
            file_path: formData.pdfUpload.file_path,
            category: "case_document",
          }
        );

        await api.delete("/delete-temp-file", {
          data: {
            file_path: formData.pdfUpload.file_path,
          },
        });
      }

      if (digitalFiles.length > 0) {
        for (const file of digitalFiles) {
          if (
            file.file_path &&
            file.file_path.includes("temp_uploads")
          ) {
            const response = await api.post(
              `/cases/${caseId}/save-temp-file`,
              {
                file_path: file.file_path,
                category: "digital_file",
              }
            );
            await api.delete("/delete-temp-file", {
              data: {
                file_path: file.file_path,
              },
            });
          }
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
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container-fluid p-0">

      <div className="row g-0 doctor-dashboard-main">

        {showSidebar && (
          <div
            className="doctor-sidebar-overlay"
            onClick={() => setShowSidebar(false)}
          />
        )}
        <DoctorSideBar showSidebar={showSidebar} />

        <div className="col-md-9 doctor-main-content">

          <DoctorHeader
            title="Dashboard"
            setShowSidebar={setShowSidebar}
          />
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
                      setFormData={setFormData}
                      handleNext={handleNext}
                      pdfUpload={formData.pdfUpload}
                      uploadedPdf={uploadedPdf}
                      setPdfProgress={setPdfProgress}
                      pdfProgress={pdfProgress}
                      setUploadedPdf={setUploadedPdf}
                      setIsPdfUploading={setIsPdfUploading}
                      handleCheckboxSelection={handleCheckboxSelection}
                      errors={errors}
                    />
                  )}

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
