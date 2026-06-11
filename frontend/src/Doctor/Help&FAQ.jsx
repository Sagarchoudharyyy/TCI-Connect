import DoctorHeader from "../components/DoctorHeader";
import DoctorSideBar from "../components/DoctorSideBar";
import "../DoctorStyle/Help&FAQ.css"
function HelpandFAQ() {
  return (
    <div className="container-fluid p-0">
      <div className="row g-0 doctor-dashboard-main">


        <DoctorSideBar />


        <div className="col-md-9 doctor-main-content">
          <DoctorHeader title="Dashboard" />

          <div className="mc-btm-bxx">
            <section className="help-faq-section">
              <div className="container-fluid">
                <div className="help-faq-meta">
                  <h2 className="all-same-heading">Help & FAQ</h2>
                  <p>
                    This section helps you understand how to use the Dentist Dashboard efficiently.
                    Browse the questions below or contact our support team if you need assistance.
                  </p>
                  <hr />
                  <h3>Dashboard Usage</h3>
                  <p>
                    <strong>Q: How do I navigate the dashboard?</strong>
                  </p>
                  <p>A: Use the left sidebar to access the main sections:</p>
                  <ul>
                    <li><strong>Home:</strong> Case overview and statistics</li>
                    <li><strong>New Case:</strong> Create a prescription (RX) and upload files</li>
                    <li><strong>Cases:</strong> View active, pending, and completed cases</li>
                    <li><strong>Pricing:</strong> Your Belgium / Lebanon pricing rates</li>
                    <li><strong>Messages:</strong> Per-case communication with the lab</li>
                    <li><strong>Billing:</strong> Monthly invoices and payment details</li>
                  </ul>

                  <br />

                  <p><strong>Q: Is the dashboard mobile-friendly?</strong></p>
                  <p>
                    A: Yes. The dashboard is fully responsive on tablets and mobile devices.
                    Portrait mode is recommended; landscape mode may have layout limitations.
                  </p>
                  <hr />
                  <h3>Sending Cases (Step by Step)</h3>
                  <p><strong>Q: How do I create and send a case?</strong></p>
                  <p>A:</p>
                  <ol>
                    <li>Click <strong>New Case</strong></li>
                    <li>Fill in the RX details (patient, tooth, instructions)</li>
                    <li>Drag &amp; drop STL files or photos (max 100MB)</li>
                    <li>Review pricing and total cost</li>
                    <li>Click <strong>Submit</strong> to receive a tracking ID</li>
                  </ol>
                  <p><strong>Q: What files are required?</strong></p>
                  <p>
                    A: STL or PLY files with a completed RX form.
                    Recommended additional files: bite scan, shade, opposing scan, and photos.
                  </p>
                  <p><strong>Q: How do I track my case?</strong></p>
                  <p>A: Case statuses are displayed with icons:</p>
                  <ul className="list-unstyled">
                    <li>
                      <i className="bi bi-circle-fill text-warning me-2"></i>
                      Submitted
                    </li>
                    <li>
                      <i className="bi bi-arrow-repeat text-primary me-2"></i>
                      Design
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Review
                    </li>
                    <li>
                      <i className="bi bi-box-seam text-info me-2"></i>
                      Shipped
                    </li>
                    <li>
                      <i className="bi bi-check-circle text-success me-2"></i>
                      Delivered
                    </li>
                  </ul>
                  <br />
                  <p><strong>Q: How do I approve a design?</strong></p>
                  <p>
                    A: Open the case → View 3D design → Click <strong>Approve</strong>
                    or <strong>Request Changes</strong> and add comments if needed.
                  </p>
                  <hr />
                  <h3>Billing</h3>

                  <p><strong>Q: How do I receive invoices?</strong></p>
                  <p>A:</p>

                  <ul>
                    <li>Invoices are emailed at the end of each month</li>
                    <li>
                      You can view and download invoices from the <strong>Billing</strong> section
                    </li>
                    <li>
                      Payments are made via bank transfer (details on the invoice)
                    </li>
                    <li>
                      Invoices reflect your active Belgium / Lebanon pricing rates
                    </li>
                  </ul>


                  <hr />


                  <h3>Communication</h3>
                  <p><strong>Q: How do I chat with the lab?</strong></p>
                  <p>
                    A: Go to <strong>Messages</strong>, mention <strong>@lab</strong>,
                    attach files if needed, and track read receipts.
                  </p>
                  <p><strong>Q: How do I request a remake?</strong></p>
                  <p>
                    A: Go to <strong>Cases → Request Remake</strong>, add the reason
                    and upload photos. The lab responds within 24 hours.
                  </p>
                  <hr />
                  <h3>Files & Scans</h3>
                  <p><strong>Q: My upload failed. What should I do?</strong></p>
                  <p>A:</p>
                  <ul>
                    <li>Ensure the file format is STL or PLY</li>
                    <li>File size must be under 100MB</li>
                    <li>Use Chrome or Edge for best results</li>
                    <li>If the issue persists, contact support</li>
                  </ul>
                  <p><strong>Q: What scan quality is required?</strong></p>
                  <p>
                    A: Full arch coverage, clear margins, at least 10 scan passes.
                    Avoid patient movement for best accuracy.
                  </p>
                  <p><strong>Q: How do I duplicate an old case?</strong></p>
                  <p>
                    A: Go to <strong>Cases → Duplicate</strong>, update patient details
                    and files, then submit the new case.
                  </p>
                  <hr />
                  <h3>Account</h3>
                  <p><strong>Q: I forgot my password. What should I do?</strong></p>
                  <p>
                    A: Click <strong>Login → Forgot Password</strong> and follow the
                    instructions sent to your email.
                  </p>
                  <hr />

                  <h3>Additional Tips</h3>

                  <ul>
                    <li>
                      <strong>Notifications:</strong> Alerts appear in Messages for updates
                    </li>
                    <li>
                      <strong>Supported formats:</strong> Only STL and PLY files are accepted
                    </li>
                    <li>
                      <strong>Data privacy / GDPR:</strong> All personal and patient data is
                      securely processed. See our Privacy Policy for details.
                    </li>
                  </ul>

                  <hr />




                  <h3>Support</h3>
                  <div className="info-country">
                    <h4>Belgium </h4>
                    <p>
                      <strong>Email:</strong><a href="mailto:info@tcidental.com"> info@tcidental.com</a>
                      <br />

                    </p>
                    <p>
                      <strong>Phone:</strong> <a href="tel:0032475263026">0032475263026</a>

                    </p>
                  </div>
                  <div className="info-country">
                    <h4>Lebanon </h4>
                    <p>

                      <strong>Email:</strong><a href="mailto:isales@tcidental.com">isales@tcidental.com</a><br />
                    </p>
                    <p>

                      <strong>Phone:</strong><a href="tel:0096170144044">0096170144044</a>
                    </p>
                  </div>
                  <p>
                    Response time: Emails within 24 hours.
                    For urgent issues, please contact us by phone.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HelpandFAQ;