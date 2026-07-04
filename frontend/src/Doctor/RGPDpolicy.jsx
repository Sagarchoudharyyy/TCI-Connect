import DoctorHeader from "../components/DoctorHeader";
import DoctorSideBar from "../components/DoctorSideBar";
import "../DoctorStyle/rgpdprivacy.css";
import { useState } from "react";
function RGPDpolicy() {
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



          <div className="privacy-policy-meta">
            <h2 className="all-same-heading">

              RGPD (GDPR) Compliance & Privacy Policy | Technological Crown Innovation Belgium

            </h2>
            <p>
              Technological Crown Innovation (TCI) Dental Laboratory is committed to protecting personal data
              and complying with the General Data Protection Regulation (GDPR / RGPD).
            </p>
            <hr />
            <h3>1. Data Controller</h3>
            <p>

              <strong>Technological Crown Innovation (TCI)</strong>
              <br />
              31 Rue du Saphir
              <br />
              1030 Brussels, Belgium

            </p>
            <p>

              Email: <a href="mailto:info@tcidental.com">info@tcidental.com</a><br />
              Tel: +32 2 734 8565

            </p>
            <p>
              <strong>Data Protection Officer (DPO):</strong><br />
              To be appointed – contact via{" "}
              <a href="mailto:info@tcidental.com">
                info@tcidental.com
              </a>
            </p>
            <hr />
            <h3>2. Scope & Legal Basis of Processing</h3>
            <p>
              This policy applies to the TCI digital platform used by dental clinics and professionals
              for digital dental workflows and appliance manufacturing.
            </p>
            <ul>
              <li><strong>Article 6(1)(b)</strong> – Contractual necessity (case processing)</li>
              <li><strong>Article 9(2)(h)</strong> – Healthcare purposes (dental appliance manufacturing)</li>
            </ul>
            <p>
              By registering on the platform, the dentist or clinic enters a professional B2B relationship with TCI.
            </p>
            <hr />
            <h3>
              3. Data We Process
            </h3>
            <table border="1" cellpadding="10" cellspacing="0" width="100%">
              <thead>
                <tr>
                  <th>Data Type</th>
                  <th>Purpose</th>
                  <th>Retention</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Patient name / ID / RX notes</td>
                  <td>Case manufacturing &amp; traceability</td>
                  <td>10 years (legal obligation)</td>
                </tr>
                <tr>
                  <td>Scan files (STL / DICOM)</td>
                  <td>Design &amp; production</td>
                  <td>Deleted after 90 days</td>
                </tr>
                <tr>
                  <td>Dentist / clinic details</td>
                  <td>Account management</td>
                  <td>Relationship duration + 5 years</td>
                </tr>
                <tr>
                  <td>Billing &amp; invoicing data</td>
                  <td>Accounting</td>
                  <td>10 years</td>
                </tr>
              </tbody>
            </table>
            <p><strong>Dentist responsibility:</strong></p>
            <ul>
              <li>Patient consent has been obtained</li>
              <li>Data shared is limited and necessary</li>
              <li>Clinic is authorized to share patient data with TCI</li>
            </ul>
            <hr />
            <h3>4. Data Security & Storage</h3>
            <ul>
              <li>EU-based servers only</li>
              <li>Encrypted transmission and storage</li>
              <li>Restricted staff access</li>
              <li>Automatic scan deletion after 90 days</li>
            </ul>
            <hr />
            <h3>5. Your Rights</h3>
            <ul>
              <li>Right to be informed</li>
              <li>Right of access</li>
              <li>Right to rectification</li>
              <li>Right to erasure (subject to legal retention)</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object</li>
            </ul>
            <p>
              Requests can be sent to{" "}
              <a href="mailto:info@tcidental.com">info@tcidental.com</a>.
              Response within one month.
            </p>
            <hr />
            <h3>6. Third Parties</h3>
            <p>
              TCI does not sell or share personal data for marketing.
              Data may only be shared with trusted processors under a Data Processing Agreement
              or legal authorities when required.
            </p>
            <hr />
            <h3>7. Cookies</h3>
            <p>
              Only essential cookies are used for security and platform functionality.
              No marketing or tracking cookies are used.
            </p>
            <hr />
            <h3>8. Data of Minors</h3>
            <p>
              Services are not intended for individuals under 18 years of age.
            </p>
            <hr />
            <h3>
              9. Complaints & Supervisory Authority
            </h3>
            <p>
              Contact TCI first at{" "}
              <a href="mailto:info@tcidental.com">info@tcidental.com</a>.
            </p>
            <p>
              Belgium Data Protection Authority:{" "}
              <a href="https://www.autoriteprotectiondonnees.be" target="_blank">
                https://www.autoriteprotectiondonnees.be
              </a>
            </p>
            <hr />
            <h3>10. Policy Updates</h3>
            <p>
              This policy may be updated periodically. Continued use of the platform
              constitutes acceptance of updates.
            </p>
            <hr />
            <h3>
              Downloads
            </h3>
            <ul>
              <li>
                <a
                  href="#"

                >
                  Download Privacy Policy (PDF)
                </a>
              </li>

              <li>
                <a
                  href="#"

                >
                  Download Data Processing Agreement (PDF)
                </a>
              </li>
            </ul>
            <hr />
            <p>
              <strong>Technological Crown Innovation (TCI)</strong><br />
              31 Rue du Saphir – 1030 Brussels – Belgium<br />
              Tel: +32 2 734 8565<br />
              Website: <a href="https://www.tcidental.com" target="_blank">www.tcidental.com</a><br />
              Email: <a href="mailto:info@tcidental.com">info@tcidental.com</a><br />
              VAT: BE 0866969469
            </p>

          </div>





        </div>
      </div>
    </div>

  );
}
export default RGPDpolicy;
