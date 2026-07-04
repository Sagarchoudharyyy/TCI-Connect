import Sidebar from "../Sidebar";
import Header from "../Header";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import "../../styles/UserDetails.css";


function UserDetails() {

    const [showSidebar, setShowSidebar] = useState(false);
    const { id } = useParams();
    const [doctor, setDoctors] = useState(null);

    const fetchDoctors = async () => {

        try {

            const response = await axios.get(
                `http://127.0.0.1:8000/api/doctors/${id}`
            );

            setDoctors(response.data);

        } catch (error) {
            console.log("Error fetching doctors", error);
        }
    };
    useEffect(() => {
        fetchDoctors();
    }, []);
    return (
        <>
            <div className="container-fluid p-0">
                <div className="dashboard-main">
                    <div className="row g-0">
                        <>
                            {showSidebar && (
                                <div
                                    className="sidebar-overlay"
                                    onClick={() => setShowSidebar(false)}
                                />
                            )}
                            <Sidebar
                                showSidebar={showSidebar}
                            />
                        </>
                        <div className=" main-content">
                            <Header
                                title="Dashboard"
                                setShowSidebar={setShowSidebar}
                            />
                            <div className="main-c-inner">

                                <div className="container mt-5 mb-5">
                                    <div className="card shadow border-0">
                                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center flex-wrap">
                                            <h4 className="mb-0">
                                                User Details
                                            </h4>
                                            <Link rel="stylesheet" to="/admin/all-doctors"
                                                className="btn btn-light btn-sm mt-2 mt-md-0"
                                            >
                                                Back

                                            </Link>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-4 align-items-start">
                                                <div className="col-lg-3 col-md-4 col-sm-12">
                                                    <div className="profile-section">
                                                        <img src="" alt="" />
                                                        <h5 className="mt-3 mb-0 text-dark">
                                                            { }
                                                        </h5>
                                                        <p className="text-muted mb-2">Dentist</p>
                                                        <span className="badge bg-success">
                                                            {doctor?.status}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="col-lg-9 col-md-8 col-sm-12">
                                                    <div className="table-responsive">
                                                        <table className="table table-bordered table-striped align-middle mb-0">
                                                            <tbody>
                                                                <tr>
                                                                    <th>Full Name</th>
                                                                    <td>{doctor?.full_name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Email</th>
                                                                    <td>{doctor?.email}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Phone</th>
                                                                    <td>{doctor?.phone}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Business Name</th>
                                                                    <td>{doctor?.business_name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Business Type</th>
                                                                    <td>{doctor?.business_type || "NA"}</td>
                                                                </tr>

                                                                <tr>
                                                                    <th>Country </th>
                                                                    <td>{doctor?.country}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Address</th>
                                                                    <td>{doctor?.address || "NA"}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Register Number</th>
                                                                    <td>{doctor?.license_number}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>VAT/ TAX ID</th>
                                                                    <td>{doctor?.vat_id}</td>
                                                                </tr>

                                                                <tr>
                                                                    <th>Accepted Terms </th>
                                                                    <td className="badge bg-success">Yes</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Created At </th>
                                                                    <td>
                                                                        {doctor?.created_at
                                                                            ? new Date(
                                                                                doctor.created_at
                                                                            ).toLocaleString()
                                                                            : "N/A"}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Last Updated </th>
                                                                    <td>
                                                                        {doctor?.Last_updated
                                                                            ? new Date(
                                                                                doctor.Last_updated
                                                                            ).toLocaleString()
                                                                            : "N/A"}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserDetails;