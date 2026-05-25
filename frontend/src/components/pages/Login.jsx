import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        // Validation
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

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/login",
                {
                    username,
                    password
                }
            );
            console.log(response.data)
            if (
                response.data.message ===
                "Invalid username and password"
            ) {
                setError(
                    "Invalid username or password"
                );
                return;
            }


            navigate("/dashboard")
                ;
        }
        catch (error) {
            setError(
                " something went wrong"
            );
            console.log(error)

        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow p-4 mt-5">

                        <div className="text-center mb-4">
                            <h2>Login</h2>

                            <p>
                                Welcome back to
                                {" "}TCI Connect
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            {/* Username */}
                            <div className="mb-3 text-start">
                                <label className="form-label">
                                    Username
                                </label>

                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(
                                            e.target.value
                                        )
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
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            {/* Login Button */}
                            <button
                                className="btn btn-primary w-100 mt-3"
                                type="submit"
                            >
                                Login
                            </button>

                            {/* Signup Link */}
                            <p className="text-center mt-3">
                                Don't have an account?{" "}

                                <Link to="/signup">
                                    Signup
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