import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BiShow, BiHide } from "react-icons/bi";
import "../../styles/login.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();


        if (!trimmedUsername || !trimmedPassword) {
            setError("All fields are required");
            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const mobileRegex =
            /^[6-9]\d{9}$/;

        const isEmail =
            emailRegex.test(trimmedUsername);

        const isMobile =
            mobileRegex.test(trimmedUsername);

        if (!isEmail && !isMobile) {
            setError(
                "Enter a valid email or 10-digit mobile number"
            );
            return;
        }


        if (trimmedPassword.length < 8) {
            setError(
                "Password must be at least 8 characters"
            );
            return;
        }

        if (
            trimmedPassword.includes(" ")
        ) {
            setError(
                "Password cannot contain spaces"
            );
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                {
                    username: trimmedUsername,
                    password: trimmedPassword,
                }
            );

            console.log(response.data);

            if (!response.data.access_token) {
                setError(
                    response.data.message ||
                    "Login failed"
                );
                return;
            }

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(
                    response.data.user
                )
            );

            const userRole =
                response.data.user?.role;

            if (userRole === "admin") {
                navigate("/admin/dashboard");
            }
            else if (userRole === "doctor") {
                navigate("/client/dashboard");
            } else {
                navigate("/login");
            }

        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Invalid username or password"
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
                        <nav className="navbar navbar-expand-lg ">
                            <a className="navbar-brand" href="">
                                <h1>TCI Connet</h1>
                            </a>
                            <div className="formheader-right">
                                <ul>
                                    <li>
                                        <a href="#">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.1111 15.2222C12.0385 15.2222 15.2222 12.0385 15.2222 8.1111C15.2222 4.18375 12.0385 1 8.1111 1C4.18375 1 1 4.18375 1 8.1111C1 12.0385 4.18375 15.2222 8.1111 15.2222Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M17.0001 17L13.1334 13.1333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
            <section className="login-form-section" style={{
                backgroundImage:
                    "url('https://mediumseagreen-herring-541085.hostingersite.com/assets/images/login-bgimg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}>
                <div className="container">
                    <div className="login-formsec-main">
                        <div className="row">
                            <div className="col-sm-12 col-md-7 col-lg-6">
                                <div className="login-formbxx-warrper">
                                    <div className="login-section-heading">
                                        <h1 className="login-main-heading">
                                            TCI Connect Login
                                        </h1>
                                        <br />
                                    </div>
                                    <div className="login-formsec-bxx">
                                        <form onSubmit={handleSubmit}>
                                            <div className="login-form-group mb-3">
                                                <input
                                                    type="email"
                                                    className="login-form-control"
                                                    name="email"
                                                    placeholder="Enter your email"
                                                    required
                                                    autoComplete="off"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                            </div>
                                            <div className="login-form-group mb-3">
                                                <div className="login-password-wrapper">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter your password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className={`form-control ${error ? "is-invalid" : ""}`}
                                                    />
                                                    {showPassword ? (
                                                        <FiEyeOff
                                                            className="password-eye"
                                                            onClick={() => setShowPassword(false)}
                                                        />
                                                    ) : (
                                                        <FiEye
                                                            className="password-eye"
                                                            onClick={() => setShowPassword(true)}
                                                        />
                                                    )}

                                                </div>

                                                {error && (
                                                    <small className="text-danger d-block mt-2">
                                                        {error}
                                                    </small>
                                                )}
                                            </div>

                                            <div className="login-form-group text-end mb-3">
                                                <p>
                                                    <a href="/forgot-password" className="login-forgot">
                                                        Forgot Password?
                                                    </a>
                                                </p>
                                            </div>

                                            <button className="btn-all w-100" type="submit">
                                                {loading ? "Logging in..." : "Login"}
                                            </button>
                                        </form>
                                        <p className="login-form-para">New to TCI Dental Lab?  <Link to="/register">
                                            Create your account here.
                                        </Link></p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

            </section >
            <footer className="form-footer">
                <div className="container">
                    <div className="row justify-content-between">

                        <div className="col-lg-4">
                            <div className="form-fcard">
                                <div className="form-footer-logo">
                                    <Link className="navbar-brand" to="/">
                                        <h1>TCI Connect</h1>
                                    </Link>
                                </div>

                                <div className="form-content">
                                    <p>
                                        TCI Dental Lab is a full-service dental laboratory
                                        providing advanced dental products and restorations.
                                        With facilities in Beirut and Brussels, we combine
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
                                                <path d="M11.7224 1.55566H8.88905C7.63664 1.55566 6.43552 2.05318 5.54994 2.93877C4.66435 3.82436 4.16683 5.02548 4.16683 6.27789V9.11122H1.3335V12.889H4.16683V20.4446H7.94461V12.889H10.7779L11.7224 9.11122H7.94461V6.27789C7.94461 6.0274 8.04411 5.78718 8.22123 5.61006C8.39835 5.43295 8.63857 5.33344 8.88905 5.33344H11.7224V1.55566Z" stroke="white" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#">

                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.0001 2.25724C12.5218 2.25724 12.8209 2.26668 13.8165 2.31233C14.8459 2.35955 15.906 2.59409 16.6561 3.34414C17.4132 4.10127 17.6407 5.15117 17.6879 6.18377C17.7335 7.17937 17.743 7.47844 17.743 10.0001C17.743 12.5218 17.7335 12.8209 17.6879 13.8165C17.6415 14.8404 17.4014 15.9108 16.6561 16.6561C15.899 17.4132 14.8498 17.6407 13.8165 17.6879C12.8209 17.7335 12.5218 17.743 10.0001 17.743C7.47844 17.743 7.17937 17.7335 6.18377 17.6879C5.1677 17.6415 4.08316 17.3959 3.34414 16.6561C2.59094 15.9029 2.35955 14.8427 2.31233 13.8165C2.26668 12.8209 2.25724 12.5218 2.25724 10.0001C2.25724 7.47844 2.26668 7.17937 2.31233 6.18377C2.35877 5.16377 2.60117 4.0871 3.34414 3.34414C4.09969 2.58858 5.15353 2.35955 6.18377 2.31233C7.17937 2.26668 7.47844 2.25724 10.0001 2.25724ZM10.0001 0.555664C7.43515 0.555664 7.11326 0.566683 6.10585 0.612331C4.6459 0.679229 3.19617 1.08534 2.14076 2.14076C1.0814 3.20011 0.679229 4.64668 0.612331 6.10585C0.566683 7.11326 0.555664 7.43515 0.555664 10.0001C0.555664 12.5651 0.566683 12.887 0.612331 13.8944C0.679229 15.3527 1.08691 16.8064 2.14076 17.8595C3.19932 18.918 4.64826 19.321 6.10585 19.3879C7.11326 19.4335 7.43515 19.4446 10.0001 19.4446C12.5651 19.4446 12.887 19.4335 13.8944 19.3879C15.3535 19.321 16.8048 18.9141 17.8595 17.8595C18.9196 16.7993 19.321 15.3535 19.3879 13.8944C19.4335 12.887 19.4446 12.5651 19.4446 10.0001C19.4446 7.43515 19.4335 7.11326 19.3879 6.10585C19.321 4.6459 18.9141 3.19539 17.8595 2.14076C16.8025 1.08377 15.3496 0.678442 13.8944 0.612331C12.887 0.566683 12.5651 0.555664 10.0001 0.555664Z" fill="white"></path>
                                                <path d="M10.0006 5.15002C7.32228 5.15002 5.15084 7.32146 5.15084 9.99975C5.15084 12.678 7.32228 14.8495 10.0006 14.8495C12.6789 14.8495 14.8503 12.678 14.8503 9.99975C14.8503 7.32146 12.6789 5.15002 10.0006 5.15002ZM10.0006 13.1479C8.262 13.1479 6.85242 11.7383 6.85242 9.99975C6.85242 8.26118 8.262 6.8516 10.0006 6.8516C11.7391 6.8516 13.1487 8.26118 13.1487 9.99975C13.1487 11.7383 11.7391 13.1479 10.0006 13.1479Z" fill="white"></path>
                                                <path d="M15.042 6.09137C15.6679 6.09137 16.1753 5.58396 16.1753 4.95804C16.1753 4.33212 15.6679 3.82471 15.042 3.82471C14.416 3.82471 13.9086 4.33212 13.9086 4.95804C13.9086 5.58396 14.416 6.09137 15.042 6.09137Z" fill="white"></path>
                                            </svg>


                                        </a>
                                    </li>

                                    <li>
                                        <a href="#">

                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.3639 2.63602C13.664 0.936141 11.4039 0 8.99993 0H8.99986C6.59609 0 4.33582 0.936246 2.63602 2.63602C0.936176 4.33589 0 6.59598 0 9C7.03125e-05 10.5303 0.389531 12.0344 1.12823 13.3647L0.0194766 17.3306C-0.00570118 17.4207 -0.00646679 17.5159 0.0172582 17.6063C0.0409832 17.6968 0.0883452 17.7794 0.154488 17.8455C0.22063 17.9116 0.303173 17.959 0.393652 17.9827C0.484132 18.0064 0.579292 18.0057 0.669375 17.9805L4.63539 16.8717C5.96556 17.6105 7.46958 18 8.99996 18C11.404 18 13.6641 17.0638 15.364 15.3639C17.0639 13.6641 18 11.4039 18 8.99996C17.9999 6.59595 17.0637 4.33589 15.3639 2.63602ZM8.99993 16.9453C7.58152 16.9453 6.18922 16.5666 4.97345 15.8502C4.91229 15.8141 4.84447 15.7908 4.77406 15.7816C4.70365 15.7724 4.63212 15.7775 4.56374 15.7966L1.28739 16.7126L2.20335 13.4363C2.22246 13.368 2.22758 13.2964 2.21838 13.226C2.20919 13.1556 2.18588 13.0878 2.14984 13.0267C1.43343 11.8107 1.05476 10.4183 1.05469 8.99996C1.05469 6.87769 1.88114 4.88246 3.38182 3.38179C4.8825 1.88111 6.87772 1.05469 8.99993 1.05469C13.3809 1.05469 16.9452 4.61893 16.9453 8.99996C16.9453 13.381 13.381 16.9453 8.99993 16.9453Z" fill="white"></path>
                                                <path d="M12.885 9.67434C12.5627 9.35196 12.1328 9.17442 11.6746 9.17442C11.2165 9.17442 10.7867 9.35196 10.4644 9.67431L10.2199 9.91875C10.1596 9.97901 10.0786 10.0122 9.99179 10.0122C9.90492 10.0122 9.82388 9.97901 9.76349 9.91861L8.08045 8.23561C8.02016 8.17535 7.98697 8.09428 7.98693 8.00741C7.98693 7.92054 8.02009 7.83954 8.08031 7.77931L8.32486 7.5348C8.99223 6.86743 8.99223 5.78153 8.32489 5.11415L7.83583 4.62495C7.51341 4.30268 7.08359 4.12524 6.62547 4.12524C6.16735 4.12524 5.73753 4.30271 5.41515 4.6251L5.05051 4.98981C4.27957 5.76075 3.99972 6.90881 4.26245 8.2226C4.5097 9.45883 5.21645 10.7103 6.25254 11.7465C7.5582 13.052 9.22109 13.8315 10.7009 13.8316H10.7011C11.6335 13.8316 12.4317 13.5263 13.0093 12.9488L13.374 12.5841C14.0414 11.9167 14.0414 10.8307 13.374 10.1633L12.885 9.67434ZM12.6283 11.8383L12.2636 12.203C11.888 12.5785 11.3478 12.777 10.7012 12.777H10.701C9.49472 12.7769 8.11054 12.1129 6.99838 11.0008C6.10787 10.1102 5.50353 9.05011 5.29671 8.01578C5.10535 7.05893 5.28279 6.24917 5.79635 5.73558L6.16095 5.3709C6.28411 5.24778 6.44906 5.17997 6.62551 5.17997C6.80203 5.17997 6.96705 5.24778 7.09013 5.37083L7.57912 5.85992C7.83527 6.11611 7.83527 6.53288 7.57916 6.78903L7.33461 7.03354C7.07512 7.293 6.93225 7.63894 6.93228 8.00758C6.93232 8.37616 7.07526 8.72206 7.33472 8.98148L9.01775 10.6644C9.27727 10.924 9.62321 11.067 9.99183 11.067C10.3604 11.067 10.7062 10.9241 10.9657 10.6646L11.2102 10.4201C11.3333 10.297 11.4983 10.2292 11.6747 10.2292C11.8511 10.2292 12.0161 10.297 12.1393 10.4202L12.6283 10.9092C12.8844 11.1653 12.8844 11.5821 12.6283 11.8383Z" fill="white"></path>
                                            </svg>
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="formf-last d-flex justify-content-between flex-wrap">
                                <p>
                                    Copyright © 2022 TCI Dental Labs.
                                    All Rights Reserved.
                                </p>

                                <p>
                                    <a href="#">Privacy Policy</a>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </footer >
        </>
    );
}

export default Login;