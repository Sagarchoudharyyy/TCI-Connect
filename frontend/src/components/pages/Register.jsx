import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    business_name: "",
    license_number: "",
    vat_id: "",
    country: "",
    password: "",
    role: ""
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register",
        formData
      );

      setMessage(response.data.message);

      // Reset form
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        business_name: "",
        license_number: "",
        vat_id: "",
        country: "",
        password: "",
        role: ""
      });

      navigate("/login");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">

          <div
            className="card shadow border-0 p-4 rounded-4"
          >
            <h2 className="text-center mb-4">
              Register
            </h2>

            {/* Success Message */}
            {message && (
              <div className="alert alert-success">
                {message}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  name="full_name"
                  className="form-control"
                  placeholder="Enter full name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Business Name */}
              <div className="mb-3">
                <label className="form-label">
                  Business Name
                </label>

                <input
                  type="text"
                  name="business_name"
                  className="form-control"
                  placeholder="Enter business name"
                  value={formData.business_name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* License Number */}
              <div className="mb-3">
                <label className="form-label">
                  License Number
                </label>

                <input
                  type="text"
                  name="license_number"
                  className="form-control"
                  placeholder="Enter license number"
                  value={formData.license_number}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* VAT ID */}
              <div className="mb-3">
                <label className="form-label">
                  VAT ID
                </label>

                <input
                  type="text"
                  name="vat_id"
                  className="form-control"
                  placeholder="Enter VAT ID"
                  value={formData.vat_id}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Country */}
              <div className="mb-3">
                <label className="form-label">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  className="form-control"
                  placeholder="Enter country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  className="form-control"
                  placeholder="Enter role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-center mt-3">
                <span>Already have an account? </span>
                <Link
                  to="/login"
                  className="text-decoration-none fw-bold"
                >
                  Login
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 rounded-pill"
                disabled={loading}
              >
                {loading
                  ? "Registering..."
                  : "Register"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;