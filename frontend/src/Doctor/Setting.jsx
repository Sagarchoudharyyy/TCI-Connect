import DoctorSideBar from "../components/DoctorSideBar";
import DoctorHeader from "../components/DoctorHeader";
import { FaPencilAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Profile() {


    const [showEmailForm, setShowEmailForm] =
        useState(false);

    const [showPassword, setShowPassword] =
        useState(false);
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
                                            <form action="https://mediumseagreen-herring-541085.hostingersite.com/client/update-profile"
                                                method="post"
                                                encType="multipart/form-data">
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
                                                                        border: "2px solid white"
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
                                                            defaultValue="Nikhil Patidar"
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
                                                            nikhilpixler@gmail.com
                                                        </p>

                                                        <span
                                                            id="editEmailBtn"
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            <div
                                                                className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                                                                style={{
                                                                    width: "30px",
                                                                    height: "30px"
                                                                }}
                                                            >
                                                                <MdEdit size={16} color="#fff" />
                                                            </div>
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