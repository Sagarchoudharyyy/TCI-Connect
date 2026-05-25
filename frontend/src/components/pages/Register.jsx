import { useState } from "react";
import axios from "axios";

function Register() {

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    username: "",
    phone: "",
    business_name: "",
    license_number: "",
    vat_id: "",
    country: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/register",
        formData
      );

      console.log(response.data);

      alert("Registration Successful");

    } catch (error) {

      console.log(error.response?.data);

      alert("Registration Failed");

    }

  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-8">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Register Page
            </h2>

            <form onSubmit={handleSubmit}>

              {/* Full Name */}

              <div className="row mb-3 align-items-center">

                <label className="col-sm-4 col-form-label">
                  Full Name
                </label>

                <div className="col-sm-8">

                  <input
                    type="text"
                    name="full_name"
                    className="form-control"
                    value={formData.full_name}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* Email */}

              <div className="row mb-3 align-items-center">

                <label className="col-sm-4 col-form-label">
                  Email
                </label>

                <div className="col-sm-8">

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* Username */}

              <div className="row mb-3 align-items-center">

                <label className="col-sm-4 col-form-label">
                  Username
                </label>

                <div className="col-sm-8">

                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* Phone */}

              <div className="row mb-3 align-items-center">

                <label className="col-sm-4 col-form-label">
                  Phone
                </label>

                <div className="col-sm-8">

                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* Business Name */}

              <div className="row mb-3 align-items-center">

                <label className="col-sm-4 col-form-label">
                  Business Name
                </label>

                <div className="col-sm-8">

                  <input
                    type="text"
                    name="business_name"
                    className="form-control"
                    value={formData.business_name}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* License Number */}

              <div className="row mb-3 align-items-center">

                <label className="col-sm-4 col-form-label">
                  License Number
                </label>

                <div className="col-sm-8">

                  <input
                    type="text"
                    name="license_number"
                    className="form-control"
                    value={formData.license_number}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* VAT ID */}

              <div className="row mb-3 align-items-center">

                <label className="col-sm-4 col-form-label">
                  VAT ID
                </label>

                <div className="col-sm-8">

                  <input
                    type="text"
                    name="vat_id"
                    className="form-control"
                    value={formData.vat_id}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* Country */}

              <div className="row mb-3 align-items-center">

                <label className="col-sm-4 col-form-label">
                  Country
                </label>

                <div className="col-sm-8">

                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    value={formData.country}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* Password */}

              <div className="row mb-3 align-items-center">

                <label className="col-sm-4 col-form-label">
                  Password
                </label>

                <div className="col-sm-8">

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* Button */}

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: "200px",
                  borderRadius: "30px",
                  padding: "10px",
                  display: "block",
                  margin: "30px auto 0"
                }}
              >
                Register
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;