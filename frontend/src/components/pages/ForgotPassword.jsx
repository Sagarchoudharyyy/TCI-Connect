import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import "../../styles/forgotpassword.css";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        "/forgot-password",
        {
          email: trimmedEmail,
        }
      );

      if (response.data.success) {
        setSuccess(
          "If an account exists with this email, a password reset link has been sent. Please check your email."
        );
      } else {
        setError(
          response.data.message ||
          "Something went wrong"
        );
      }

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );

      setSuccess("");

    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <header className="form-header">
        <div className="container">
          <div className="form-headerbxx">
            <nav className="navbar navbar-expand-lg">

              <a className="navbar-brand" href="">
                <h1>TCI Connet</h1>
              </a>

              <div className="formheader-right">
                <ul>
                  <li>
                    <a href="#">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.1111 15.2222C12.0385 15.2222 15.2222 12.0385 15.2222 8.1111C15.2222 4.18375 12.0385 1 8.1111 1C4.18375 1 1 4.18375 1 8.1111C1 12.0385 4.18375 15.2222 8.1111 15.2222Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <path
                          d="M17.0001 17L13.1334 13.1333"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>

            </nav>
          </div>
        </div>
      </header>


      <section
        className="forgot-form-section"
        style={{
          backgroundImage:
            "url('https://mediumseagreen-herring-541085.hostingersite.com/assets/images/login-bgimg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

        <div className="container">

          <div className="forgot-formsec-main">

            <div className="row">

              <div className="col-lg-11">

                <div className="forgot-formbxx-warrper">

                  <div className="forgot-section-heading">

                    <div className="forgot-main-heading">
                      TCI Connect
                    </div>


                    <div className="forgot-formsec-bxx">

                      <h3 className="forgot-form-heading">
                        Forgot Password
                      </h3>


                      <form
                        onSubmit={handleSubmit}
                        id="login"
                      >

                        <div className="forgot-form-group">

                          <input
                            type="email"
                            className="forgot-form-control"
                            name="email"
                            id="Email"
                            placeholder="Enter your email"
                            required
                            autoComplete="off"
                            value={email}
                            onChange={(e) =>
                              setEmail(e.target.value)
                            }
                          />

                        </div>


                        {error && (
                          <p className="text-danger mt-2">
                            {error}
                          </p>
                        )}


                        {success && (
                          <p className="text-success mt-2">
                            {success}
                          </p>
                        )}


                        <button
                          className="btn-all"
                          id="submitBtn"
                          type="submit"
                          disabled={loading}
                        >
                          {loading
                            ? "Sending..."
                            : "Send Reset Link"}
                        </button>

                      </form>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      <footer className="form-footer">

        <div className="container">

          <div className="row justify-content-between">

            <div className="col-lg-4">

              <div className="form-fcard">

                <div className="form-footer-logo">

                  <Link
                    className="navbar-brand"
                    to="/"
                  >
                    <h1>TCI Dental Lab</h1>
                  </Link>

                </div>


                <div className="form-content">

                  <p>
                    TCI Dental Lab is a full-service dental
                    laboratory providing advanced dental
                    products and restorations. With facilities
                    in Beirut and Brussels, we combine
                    expertise with digital CAD/CAM technology.
                  </p>

                </div>

              </div>

            </div>


            <div className="col-lg-3">

              <div className="form-sicons">

                <ul className="list-unstyled d-flex gap-3">

                  <li>

                    <a href="#">

                      <svg
                        width="13"
                        height="22"
                        viewBox="0 0 13 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >

                        <path
                          d="M11.7224 1.55566H8.88905C7.63664 1.55566 6.43552 2.05318 5.54994 2.93877C4.66435 3.82436 4.16683 5.02548 4.16683 6.27789V9.11122H1.3335V12.889H4.16683V20.4446H7.94461V12.889H10.7779L11.7224 9.11122H7.94461V6.27789C7.94461 6.0274 8.04411 5.78718 8.22123 5.61006C8.39835 5.43295 8.63857 5.33344 8.88905 5.33344H11.7224V1.55566Z"
                          stroke="white"
                          strokeWidth="1.41667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                      </svg>

                    </a>

                  </li>


                  <li>

                    <a href="#">

                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >

                        <path
                          d="M10.0001 2.25724C12.5218 2.25724 12.8209 2.26668 13.8165 2.31233C14.8459 2.35955 15.906 2.59409 16.6561 3.34414C17.4132 4.10127 17.6407 5.15117 17.6879 6.18377C17.7335 7.17937 17.743 7.47844 17.743 10.0001C17.743 12.5218 17.7335 12.8209 17.6879 13.8165C17.6415 14.8404 17.4014 15.9108 16.6561 16.6561C15.899 17.4132 14.849 17.6407 13.8165 17.6879C12.8209 17.7335 12.5218 17.743 10.0001 17.743C7.47844 17.743 7.17937 17.7335 6.18377 17.6879C5.1677 17.6415 4.08316 17.3959 3.34414 16.6561C2.59094 15.9029 2.35955 14.8427 2.31233 13.8165C2.26668 12.8209 2.25724 12.5218 2.25724 10.0001C2.25724 7.43515 2.26668 7.11326 2.31233 6.18377C2.35877 5.16377 2.60117 4.0871 3.34414 3.34414C4.09969 2.58858 5.15353 2.35955 6.18377 2.31233ZM10.0001 0.555664C7.43515 0.555664 7.11326 0.566683 6.10585 0.612331C4.6459 0.679229 3.19617 1.08534 2.14076 2.14076C1.0814 3.20011 0.679229 4.64668 0.612331 6.10585C0.566683 7.11326 0.555664 7.43515 0.555664 10.0001C0.555664 12.5651 0.566683 12.887 0.612331 13.8944C0.679229 15.3527 1.08691 16.8064 2.14076 17.8595C3.19932 18.918 4.64826 19.321 6.10585 19.3879C7.11326 19.4335 7.43515 19.4446 10.0001 19.4446C12.5651 19.4446 12.887 19.4335 13.8944 19.3879C15.3535 19.321 16.8048 18.9141 17.8595 17.8595C18.9196 16.7993 19.321 15.3535 19.3879 13.8944C19.4335 12.887 19.4335 12.5651 19.3879 10.0001C19.4335 7.43515 19.321 7.11326 19.3879 13.8944C19.4335 12.887 19.4335 12.5651 19.3879 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 12.5651 19.4335 19.4335 12.887 19.3879 15.3535 19.321 16.8048 18.9141 17.8595 17.8595C18.9196 16.7993 19.321 15.3535 19.3879 13.8944 19.4335 12.887 19.4335 12.5651 19.4335 10.0001C19.4335 7.43515 19.4335 7.11326 19.3879 6.10585C19.321 4.6459 18.9141 3.19539 17.8595 2.14076C16.8025 1.08377 15.3496 0.678442 13.8944 0.612331C12.887 0.566683 12.5651 0.555664 10.0001 0.555664Z"
                          fill="white"
                        />

                      </svg>

                    </a>

                  </li>


                  <li>

                    <a href="#">

                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >

                        <path
                          d="M15.3639 2.63602C13.664 0.936141 11.4039 0 8.99993 0H8.99986C6.59609 0 4.33582 0.936246 2.63602 2.63602C0.936176 4.33589 0 6.59598 0 9C7.03125e-05 10.5303 0.389531 12.0344 1.12823 13.3647L0.0194766 17.3306C-0.00570118 17.4207 -0.00646618 17.5159 0.0172582 17.6063C0.0409832 17.6968 0.0883452 17.7794 0.154488 17.8455C0.22063 17.9116 0.303173 17.959 0.393652 17.9827C0.484132 18.0064 0.579292 18.0057 0.669375 17.9805L4.63539 16.8717C5.96556 17.6105 7.46958 18 8.99996 18C11.404 18 13.6641 17.0638 15.364 15.3639C17.0639 13.6641 18 11.4039 18 8.99996C17.9999 6.59595 17.0637 4.33589 15.3639 2.63602Z"
                          fill="white"
                        />

                      </svg>

                    </a>

                  </li>

                </ul>

              </div>

            </div>


            <div className="col-12">

              <div className="formf-last d-flex justify-content-between flex-wrap">

                <p>
                  Copyright © 2026 TCI Dental Labs.
                  All Rights Reserved.
                </p>

                <p>
                  <a href="#">Privacy Policy</a>
                </p>

              </div>

            </div>

          </div>

        </div>

      </footer>
    </>
  );
}

export default ForgotPassword;