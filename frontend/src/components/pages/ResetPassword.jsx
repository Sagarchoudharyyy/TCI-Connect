import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import api from "../../services/api";
import "../../styles/resetpassword.css";
import loginBg from "../../assets/login-bgimg.png";


function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");


    if (!token) {
      setError(
        "Invalid or missing password reset link."
      );
      return;
    }


    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters"
      );
      return;
    }


    if (password.includes(" ")) {
      setError(
        "Password cannot contain spaces"
      );
      return;
    }


    if (password !== confirmPassword) {
      setError(
        "Passwords do not match"
      );
      return;
    }


    setLoading(true);


    try {
      const response = await api.post(
        "/reset-password",
        {
          token: token,
          password: password,
        }
      );


      if (response.data.success) {

        setSuccess(
          "Password updated successfully. Redirecting to login..."
        );

        setTimeout(() => {
          navigate("/login");
        }, 2000);

      } else {

        setError(
          response.data.message ||
          "Unable to update password"
        );

      }

    } catch (error) {

      console.log(error);

      setError(
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Invalid or expired password reset link."
      );

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

              <a
                className="navbar-brand"
                href=""
              >
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


      <section className="reset-form-section" style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}>

        <div className="container">

          <div className="reset-formsec-main">

            <div className="row">

              <div className="col-lg-11">

                <div className="reset-formbxx-warrper">

                  <div className="reset-formsec-bxx">

                    <h3 className="reset-form-heading">
                      Reset Password
                    </h3>


                    <form onSubmit={handleSubmit}>

                      <div className="reset-form-group mb-3">

                        <input
                          type="password"
                          className="reset-form-control"
                          placeholder="Enter New Password"
                          value={password}
                          onChange={(e) =>
                            setPassword(e.target.value)
                          }
                          required
                          autoComplete="new-password"
                        />

                      </div>


                      <div className="reset-form-group mb-3">

                        <input
                          type="password"
                          className="reset-form-control"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) =>
                            setConfirmPassword(
                              e.target.value
                            )
                          }
                          required
                          autoComplete="new-password"
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
                        className="reset-btn-all"
                        type="submit"
                        disabled={loading || !token}
                      >

                        {loading
                          ? "Updating..."
                          : "Update Password"}

                      </button>

                    </form>


                    {!token && (

                      <p className="text-danger mt-3">
                        This password reset link is
                        invalid or incomplete.
                      </p>

                    )}

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
                          d="M10.0001 2.25724C12.5218 2.25724 12.8209 2.26668 13.8165 2.31233C14.8459 2.35955 15.906 2.59409 16.6561 3.34414C17.4132 4.10127 17.6407 5.15117 17.6879 6.18377C17.7335 7.17937 17.743 7.47844 17.743 10.0001C17.743 12.5218 17.7335 12.8209 17.6879 13.8165C17.6415 14.8404 17.4014 15.9108 16.6561 16.6561C15.899 17.4132 14.849 17.6407 13.8165 17.6879C12.8209 17.7335 12.743 17.743 10.0001 17.743C7.47844 17.743 7.17937 17.7335 6.18377 17.6879C5.1677 17.6415 4.08316 17.3959 3.34414 3.34414C4.09969 2.58858 5.15353 2.35955 6.18377 2.31233Z"
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
                          d="M15.3639 2.63602C13.664 0.936141 11.4039 0 8.99993 0C6.59609 0 4.33582 0.936246 2.63602 2.63602C0.936176 4.33589 0 6.59598 0 9C0 10.5303 0.389531 12.0344 1.12823 13.3647L0.0194766 17.3306C-0.00570118 17.4207 -0.00646618 17.5159 0.0172582 17.6063C0.0409832 17.6968 0.0883452 17.7794 0.154488 17.8455C0.22063 17.9116 0.303173 17.959 0.393652 17.9827C0.484132 18.0064 0.579292 18.0057 0.669375 17.9805L4.63539 16.8717C5.96556 17.6105 7.46999 18 8.99996 18C11.404 18 13.6641 17.0638 15.364 15.3639C17.0639 13.6641 18 11.4039 18 8.99996C18 6.59595 17.0637 4.33589 15.3639 2.63602Z"
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
                  <a href="#">
                    Privacy Policy
                  </a>
                </p>

              </div>

            </div>

          </div>

        </div>

      </footer>

    </>
  );
}

export default ResetPassword;