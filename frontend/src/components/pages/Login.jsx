import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!username || !password) {
            setError("All fields are required");
            return;
        }

        if (password.length < 8) {
            setError(
                "Password should be at least 8 characters"
            );
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/login",
                {
                    username,
                    password,
                }
            );

            console.log(response.data);

            // Backend invalid login message
            if (
                response.data.message ===
                "Invalid email/mobile or password"
            ) {
                setError(
                    "Invalid email/mobile number or password"
                );
                return;
            }

            // Save token
            localStorage.setItem(
                "token",
                response.data.access_token
            );

            // Save user info
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            // Redirect to dashboard
            navigate("/dashboard");

        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow p-4 mt-5 border-0 rounded-4">

                        <div className="text-center mb-4">
                            <h2>Login</h2>

                            <p>
                                Welcome back to{" "}
                                <strong>TCI Connect</strong>
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            {/* Email / Mobile */}
                            <div className="mb-3 text-start">
                                <label className="form-label">
                                    Email or Mobile Number
                                </label>

                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter email or mobile number"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-3 text-start">
                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            {/* Login Button */}
                            <button
                                className="btn btn-primary w-100 mt-3 rounded-pill"
                                type="submit"
                                disabled={loading}
                            >
                                {loading
                                    ? "Logging in..."
                                    : "Login"}
                            </button>

                            {/* Register Link */}
                            <p className="text-center mt-3">
                                Don't have an account?{" "}

                                <Link
                                    to="/register"
                                    className="text-decoration-none fw-bold"
                                >
                                    Register
                                </Link>
                            </p>

                        </form>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Login;