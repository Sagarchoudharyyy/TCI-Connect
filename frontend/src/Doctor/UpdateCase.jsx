import { useState } from "react";
import "../DoctorStyle/UpdateCase.css";

function UpdateCase() {
  return (
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
  );
}

export default UpdateCase;