import DoctorHeader from "../components/DoctorHeader";
import DoctorSideBar from "../components/DoctorSideBar";
import "../DoctorStyle/QuestionAnswer.css";
import { useState } from "react";
function QuestionAnswer() {
  const [showSidebar, setShowSidebar] = useState(false);

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

          <div className="mc-btm-bxx">
            <div className="container py-5">
              <h4 className="mb-4 text-center fw-bold fs-2">Questions & Answers</h4>
              <div className="accordion" id="qaAccordion">
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#answerOne"
                      aria-expanded="true"
                    >
                      <img
                        src="https://mediumseagreen-herring-541085.hostingersite.com/assets/images/question-icon.png"
                        alt="Question"
                        className="qa-icon"
                      />
                      How do I submit files to the lab?
                    </button>
                  </h2>
                  <div id="answerOne" className="accordion-collapse collapse show">
                    <div className="accordion-body">
                      <h5 className="mb-4 text-center fw-bold">How to Submit Files to the Lab</h5>
                      <div className="step-box">
                        <div className="icon-block red">
                          <i className="bi bi-file-earmark-text"></i>
                        </div>
                        <div>
                          <h4 className="fw-bold">Complete Rx Form</h4>
                          <p className="mb-0">Required first. Fill patient info, treatment notes, and submit.
                            <br />
                            File upload is disabled until completed.
                          </p>
                        </div>
                      </div>
                      <div className="step-box">
                        <div className="icon-block yellow">
                          <i className="bi bi-folder"></i>
                        </div>
                        <div>
                          <h4 className="fw-bold">
                            Prepare Files
                          </h4>
                          <p className="mb-0">Supported formats: STL, PLY, OBJ, JPEG, PNG.
                            <br />
                            Name files: PatientID_Date (e.g., Patient123_2025-11-09.stl)
                          </p>
                        </div>
                      </div>
                      <div className="step-box">
                        <div className="icon-block orange">
                          <i className="bi bi-upload"></i>
                        </div>
                        <div>
                          <h4 className="fw-bold">Upload Files</h4>
                          <p className="mb-0">Select the completed Rx case, attach files, wait for upload success.
                          </p>
                        </div>
                      </div>
                      <div className="step-box">
                        <div className="icon-block white">
                          <i className="bi bi-check2-circle"></i>
                        </div>

                        <div>
                          <h4 className="fw-bold">Accept GDPR Agreement</h4>
                          <p className="mb-0">
                            Check the box confirming you've read and accepted the Data Processing Agreement.
                          </p>
                        </div>
                      </div>

                      <div className="step-box">
                        <div className="icon-block blue">
                          <i className="bi bi-arrow-right-circle"></i>
                        </div>

                        <div>
                          <h4 className="fw-bold">Submit Case</h4>
                          <p className="mb-0">
                            Click submit to securely send files to the lab.
                          </p>
                        </div>
                      </div>
                      <div className="alert alert-info mt-4 p-4" style={{ background: "#e8f4ff", border: "1px solid #bcdcff" }}>
                        <p className="mb-3">
                          Please submit each case separately to ensure accurate processing and timely delivery.
                          For every patient case, fill out a complete prescription (Rx) form with all relevant details,
                          and upload all related digital files, photos, and documents together in a single submission.
                        </p>
                        <p className="mb-3">
                          Submitting cases individually helps us track each patient’s treatment precisely and avoid mix-ups.
                          This also enables our technicians to manufacture restorations according to your specific instructions.
                        </p>
                        <p className="mb-0">
                          Thank you for your cooperation in maintaining the highest quality of care for your patients.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-3">
                  <h4 className="accordion-header">
                    <button
                      className="accordion-button fw-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#answerTwo"
                      aria-expanded="true"
                    >
                      <img
                        src="https://mediumseagreen-herring-541085.hostingersite.com/assets/images/question-icon.png"
                        alt="Question"
                        className="qa-icon"
                      />
                      Why don’t you provide large cloud storage for my scan files? Where are my files kept?
                    </button>
                  </h4>
                  <div id="answerTwo" className="accordion-collapse collapse show">
                    <div className="accordion-body">
                      <p>Our platform is designed as a <strong>workflow and communication tool</strong>, not a long-term archive
                        for heavy scan files. Large STL/DICOM files are securely stored in the <strong>lab’s cloud</strong>.</p>
                      <p className="fw-bold mb-2">Your dashboard stores:</p>
                      <ul>
                        <li>
                          Patient and prescription (Rx) information
                        </li>
                        <li>
                          Case status and communication with the lab
                        </li>
                        <li>Light data such as previews or limited photos</li>
                      </ul>
                      <p>
                        Each dentist has a <strong>5 GB storage limit</strong> to keep the platform fast and efficient.
                      </p>
                      <p className="fw-bold mb-2">Your main scan archive remains:</p>
                      <ul>
                        <li>Locally in your clinic</li>
                        <li>In the lab’s secure admin cloud with retention policies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default QuestionAnswer;
