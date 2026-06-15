import DoctorSideBar from "../components/DoctorSideBar";
import DoctorHeader from "../components/DoctorHeader";
import { FaPencilAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../DoctorStyle/Setting.css"
import { FaEdit } from "react-icons/fa";
import axios from "axios";
function Profile() {


    const [showEmailForm, setShowEmailForm] =
        useState(false);

    const [showPassword, setShowPassword] =
        useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const handleSubmit = (e) => {
        e.preventDefault();

        const fullName =
            document.getElementById("username").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const businessName =
            document.getElementById("businessName").value.trim();

        const licenseNumber =
            document.getElementById("licenseNumber").value.trim();

        const vatId =
            document.getElementById("vatId").value.trim();

        const country =
            document.getElementById("country").value;

        const address =
            document.getElementById("address").value.trim();

        // Full Name
        if (!fullName) {
            alert("Full Name is required");
            return;
        }

        // Phone
        if (!/^\d{10}$/.test(phone)) {
            alert("Phone number must be 10 digits");
            return;
        }

        // Business Name
        if (!businessName) {
            alert("Business Name is required");
            return;
        }

        // License Number
        if (!licenseNumber) {
            alert("License Number is required");
            return;
        }

        // VAT ID
        if (!vatId) {
            alert("VAT ID is required");
            return;
        }

        // Country
        if (!country) {
            alert("Please select a country");
            return;
        }

        // Address
        if (!address) {
            alert("Address is required");
            return;
        }
        if (showEmailForm) {

            const email =
                document.getElementById("newEmail").value.trim();

            const password =
                document.getElementById("confirmPassword").value.trim();

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                alert("Enter a valid email");
                return;
            }

            if (!password) {
                alert("Please enter your password");
                return;
            }
        }

        const token = localStorage.getItem("token");

        const profileData = {
            full_name: fullName,
            phone: phone,
            business_name: businessName,
            license_number: licenseNumber,
            vat_id: vatId,
            country: country,
            address: address
        };

        axios.put(
            "http://127.0.0.1:8000/profile",
            profileData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((response) => {

                alert(response.data.message);

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );

            })
            .catch((error) => {

                console.log(error);

                alert(
                    error.response?.data?.message ||
                    "Profile update failed"
                );

            });
    };
    return (
        <div className="container-fluid p-0">
            <div className="row g-0 doctor-dashboard-main">
                <DoctorSideBar />
                <div className="col-md-9 doctor-main-content">

                    <DoctorHeader title="Dashboard" />
                    <div className="mc-btm-bxx">
                        <div className="pagetitle">
                            <h1>Profile</h1>
                        </div>
                        <section className="section">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-body">
                                            {/* <form action="https://mediumseagreen-herring-541085.hostingersite.com/client/update-profile"
                                                method="post"
                                                encType="multipart/form-data"> */}
                                            <form onSubmit={handleSubmit}>
                                                <div className="row mb-3">
                                                    <label
                                                        htmlFor="profileFileInput"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        Profile
                                                    </label>

                                                    <div className="col-sm-9">
                                                        <div className="position-relative" style={{ width: "150px", height: "150px" }}>
                                                            <img id="profilePreview" src="https://mediumseagreen-herring-541085.hostingersite.com/uploads/profile/1763620087_489949f1a5c1780dbb22.jpg" alt="Profile Image" className="rounded-circle border" style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "cover"
                                                            }} />
                                                            <label
                                                                htmlFor="profileFileInput"
                                                                className="position-absolute"
                                                                style={{
                                                                    bottom: 0,
                                                                    right: 0,
                                                                    cursor: "pointer"
                                                                }}
                                                            >
                                                                <div
                                                                    className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                                                                    style={{
                                                                        width: "40px",
                                                                        height: "40px",
                                                                        border: "2px solid white",
                                                                    }}
                                                                >
                                                                    <FaPencilAlt
                                                                        style={{
                                                                            color: "#fff",
                                                                            fontSize: "16px"
                                                                        }}
                                                                    />
                                                                </div>
                                                            </label>
                                                            <input
                                                                type="file"
                                                                name="profile"
                                                                id="profileFileInput"
                                                                className="d-none"
                                                                accept="image/*"
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label
                                                        htmlFor="username"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        Full Name
                                                    </label>

                                                    <div className="col-sm-9">
                                                        <input
                                                            type="text"
                                                            id="username"
                                                            name="username"
                                                            defaultValue={user?.full_name}
                                                            className="form-control"
                                                        />
                                                    </div>

                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label">
                                                        Email
                                                    </label>

                                                    <div className="col-sm-9 d-flex align-items-center">
                                                        <p className="form-control-plaintext mb-0 me-2">
                                                            {user?.email}                                                        </p>

                                                        <span
                                                            id="editEmailBtn"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() =>
                                                                setShowEmailForm(!showEmailForm)
                                                            }
                                                        >
                                                            <div
                                                                className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                                                                style={{
                                                                    width: "30px",
                                                                    height: "30px",
                                                                    border: "1px solid white"
                                                                }}
                                                            >
                                                                <FaEdit
                                                                    style={{
                                                                        color: "#fff",
                                                                        fontSize: "18px"
                                                                    }}
                                                                />
                                                            </div>
                                                            {/* <div
                                                                className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                                                                style={{
                                                                    width: "30px",
                                                                    height: "30px",
                                                                    border: "2px solid #dee2e6"
                                                                }}
                                                            >
                                                                <MdEdit size={16} color="#fff" />
                                                            </div> */}
                                                        </span>
                                                    </div>
                                                </div>
                                                {showEmailForm && (
                                                    <div id="emailEditForm">

                                                        {/* New Email */}
                                                        <div className="row mb-3">
                                                            <label
                                                                htmlFor="newEmail"
                                                                className="col-sm-3 col-form-label"
                                                            >
                                                                New Email
                                                            </label>

                                                            <div className="col-sm-9">
                                                                <input
                                                                    type="email"
                                                                    name="new_email"
                                                                    id="newEmail"
                                                                    className="form-control"
                                                                    placeholder="Enter new email"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Confirm Password */}
                                                        <div className="row mb-3">
                                                            <label
                                                                htmlFor="confirmPassword"
                                                                className="col-sm-3 col-form-label"
                                                            >
                                                                Confirm Password
                                                            </label>

                                                            <div className="col-sm-9">
                                                                <div className="position-relative">

                                                                    <input
                                                                        type={
                                                                            showPassword
                                                                                ? "text"
                                                                                : "password"
                                                                        }
                                                                        name="confirm_password"
                                                                        id="confirmPassword"
                                                                        className="form-control pe-5"
                                                                        placeholder="Enter password"
                                                                    />

                                                                    <button
                                                                        type="button"
                                                                        className="btn position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent"
                                                                        onClick={() =>
                                                                            setShowPassword(
                                                                                !showPassword
                                                                            )
                                                                        }
                                                                    >
                                                                        {showPassword ? (
                                                                            <FaEyeSlash />
                                                                        ) : (
                                                                            <FaEye />
                                                                        )}
                                                                    </button>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                )}

                                                <div className="row mb-3">
                                                    <label htmlFor="inputText" className="col-sm-3 col-form-label">Phone</label>
                                                    <div className="col-sm-9">
                                                        <input type="number" id="phone" name="phone" className="form-control" defaultValue={user?.phone} />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label
                                                        htmlFor="businessName"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        Business Name
                                                    </label>

                                                    <div className="col-sm-9">
                                                        <input
                                                            type="text"
                                                            id="businessName"
                                                            name="business_name"
                                                            className="form-control"
                                                            defaultValue={user?.business_name} />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label
                                                        htmlFor="licenseNumber"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        Registration or License Number
                                                    </label>

                                                    <div className="col-sm-9">
                                                        <input
                                                            type="text"
                                                            id="licenseNumber"
                                                            name="license_number"
                                                            className="form-control"
                                                            defaultValue={user?.license_number} />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label
                                                        htmlFor="vatId"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        VAT / TAX ID
                                                    </label>

                                                    <div className="col-sm-9">
                                                        <input
                                                            type="text"
                                                            id="vatId"
                                                            name="vat_id"
                                                            className="form-control"
                                                            defaultValue={user?.vat_id} />
                                                    </div>
                                                </div><div className="row mb-3">
                                                    <label
                                                        htmlFor="country"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        Country
                                                    </label>

                                                    <div className="col-sm-9">
                                                        <select
                                                            id="country"
                                                            name="country"
                                                            className="form-select"
                                                            defaultValue={user?.country}
                                                        >
                                                            <option value="">
                                                                Select Country
                                                            </option>

                                                            <option value="Belgium">
                                                                Belgium
                                                            </option>

                                                            <option value="Lebanon">
                                                                Lebanon
                                                            </option>

                                                            <option value="Other">
                                                                Other
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div><div className="row mb-3">
                                                    <label
                                                        htmlFor="address"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        Address
                                                    </label>

                                                    <div className="col-sm-9">
                                                        <input
                                                            type="text"
                                                            id="address"
                                                            name="address"
                                                            className="form-control"
                                                            defaultValue={user?.address} />
                                                    </div>
                                                </div><div className="row mb-3">
                                                    <div className="col-sm-10">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary" style={{
                                                                width: "140px",
                                                                borderRadius: "30px"
                                                            }}
                                                        >
                                                            Save Profile
                                                        </button>
                                                    </div>
                                                </div>


                                            </form>



                                        </div>

                                    </div>

                                </div>
                            </div>
                        </section >
                    </div >
                </div >
            </div >
        </div >
    )
}
export default Profile;