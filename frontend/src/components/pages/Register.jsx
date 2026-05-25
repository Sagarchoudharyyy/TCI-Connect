import { useState } from "react";

function Register() {

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Form Submitted");
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

              <div className="row mb-3 align-items-center">

                <label className="col-sm-4 col-form-label">
                  Email
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
              <div className="row mb-3 align-items-center">

                <label className="col-sm-4 col-form-label">
                  Phone
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
              <div className="row mb-3 align-items-center">

                <label className="col-sm-4 col-form-label">
                  Business Name
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

              <div className="row mb-3 align-items-center">

                <label className="col-sm-4 col-form-label">
                  License Number  </label>

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

              <div className="row mb-3 align-items-center">

                <label className="col-sm-4 col-form-label">
                  VAT ID  </label>

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
              <div className="row mb-3 align-items-center">

                <label className="col-sm-4 col-form-label">
                  Country </label>

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
              <div className="row mb-3 align-items-center">

                <label className="col-sm-4 col-form-label">
                  Password </label>

                <div className="col-sm-8">

                  <input
                    type="password"
                    name="full_name"
                    className="form-control"
                    value={formData.full_name}
                    onChange={handleChange}
                  />

                </div>

              </div>
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