import "../designcomponentstyle/contact.css";
import "../style/home.css";

import ContactOverly from "../../assets/contact-overly.png";

function ContactUs() {
  return (
    <>
      <section className="contact-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-11">

              <div className="contact-flower">
                <img
                  src={ContactOverly}
                  alt="Contact"
                />
              </div>

              <div className="contact-section-meta">

                <div className="contact-location">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2518.809023167994!2d4.3960969765810685!3d50.853220671671835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c3508d482839%3A0xa95851e5597c3bca!2sRue%20du%20Saphir%2031%2C%201030%20Schaerbeek%2C%20Belgium!5e0!3m2!1sen!2sin!4v1789632320671!5m2!1sen!2sin"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="31 Rue du Saphir, 1030 Schaerbeek, Belgium"
                  ></iframe>
                </div>

                <div className="contact-form">

                  {/* Message Area */}
                  <div id="formResponse"></div>

                  <h2 className="all-same-heading">
                    Contact Us
                  </h2>

                  <p>
                    We are here to support you.
                    Please reach out through your
                    preferred channel.
                  </p>

                  <form
                    id="contactForm"
                    method="post"
                  >
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="fullName"
                      placeholder="Enter your full name"
                      required
                    />

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      required
                    />

                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      id="phone"
                      placeholder="Enter your phone number"
                      required
                    />

                    <textarea
                      className="form-control"
                      name="message"
                      id="message"
                      rows={4}
                      placeholder="Type your message here"
                      required
                    ></textarea>

                    <button
                      type="submit"
                      id="contactSubmitBtn"
                      className="all-same-btn"
                    >
                      Submit
                      <span>
                        <i className="bi bi-arrow-right"></i>
                      </span>
                    </button>
                  </form>

                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

    </>
  );
}

export default ContactUs;