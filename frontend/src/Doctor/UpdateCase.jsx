import { useState } from "react";
import "../DoctorStyle/UpdateCase.css";
import DoctorSideBar from "../components/DoctorSideBar";
import DoctorHeader from "../components/DoctorHeader";

function UpdateCase() {
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
                  className="formContentContainer"
                  style={{ color: "#0152a8" }}
                >
                  Update Case
                </h1>

                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    id="progressBar"
                    style={{ width: "0%" }}
                  >
                    <div className="progress-bar-fill" id="progressBar" style={{ width: "0%" }}
                    >
                      <div className="step-indicator active">
                        <div className="step-indicator">
                          <div className="step-indicator">

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>
      </div>
    </div>


  );
}

export default UpdateCase;