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
      files: [],

      gdprConfirm: false,
      dpcaConfirm: false,
      patientConsent: false
    });
  console.log(formData);

  // Fetch existing case data
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
          data.case_id || "",

        nextAppointmentDate:
          data.appointment_date
            ?.split("T")[0] || "",

        deliveryDeadline:
          data.delivery_deadline || "",

        age:
          data.age || "",

        gender:
          data.gender || "",

        caseStage:
          data.case_type
            ? data.case_type.split(", ")
            : [],

        // keep uploaded files
        files:
          Array.isArray(data.files) &&
            data.files.length > 0
            ? data.files.map(file => ({
              id: file.id,
              name: file.file_name,
              path: file.file_path
            }))
            : prev.files
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

    if (
      step === 2 &&
      !Array.isArray(
        formData.files
      )
    ) {
      newErrors.files =
        "Invalid file state";
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
    }

    if (
      !formData.dpcaConfirm
    ) {
      newErrors.dpcaConfirm =
        "You must confirm Data Processing & Confidentiality Agreement.";
    }

    if (
      !formData.patientConsent
    ) {
      newErrors.patientConsent =
        "You must confirm that the patient has provided consent for transmitting these medical files (including scans and photos) to the laboratory.";
    }

    setCheckboxErrors(
      newErrors
    );

    if (
      Object.keys(
        newErrors
      ).length > 0
    ) {
      return;
    }
    try {

      const payload = {

        case_id: caseId,

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
          formData.caseStage?.join(", ") || "",

        appointment_date:
          formData.nextAppointmentDate || null,

        delivery_deadline:
          formData.deliveryDeadline || null,

        preview_status:
          "Pending",

        status:
          "Submitted"
      };

      // UPDATE CASE
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

      // UPLOAD FILES
      if (
        formData.files &&
        formData.files.length > 0
      ) {
        for (const file of formData.files) {

          // Skip already uploaded files
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

      alert(
        "Case updated successfully"
      );

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

                {/* Step 1 */}
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

                {/* Step 2 */}
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

                {/* Step 3 */}
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
                  />
                )}

                {/* Success */}
                {step === 4 && (
                  <SuccessScreen />
                )}

              </div>

            </div>

          </section>

        </div>

      </div>

    </div>
  );
}

export default UpdateCase;