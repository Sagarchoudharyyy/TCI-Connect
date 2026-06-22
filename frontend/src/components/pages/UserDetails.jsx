import Sidebar from "../Sidebar";
import Header from "../Header";
import { useState } from "react";
import { Link } from "react-router-dom";

function UserDetails() {

    const [showSidebar, setShowSidebar] = useState(false);

    const fetchDoctors = async () => {
        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/doctors"
            );

            setDoctors(response.data);

        } catch (error) {
            console.log("Error fetching doctors", error);
        }
    };
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
                                                        <span className="badge bg-danger">
                                                            Inactive
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="col-lg-9 col-md-8 col-sm-12">
                                                    <div className="table-responsive">
                                                        <table className="table table-bordered table-striped align-middle mb-0">
                                                            <tbody>
                                                                <tr>
                                                                    <th>Full Name</th>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Email</th>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Phone</th>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Business Name</th>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Business Type</th>
                                                                    <td></td>
                                                                </tr>

                                                                <tr>
                                                                    <th>Country </th>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Address</th>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Register Number</th>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <th>VAT/ TAX ID</th>
                                                                    <td></td>
                                                                </tr>

                                                                <tr>
                                                                    <th>Accepted Terms </th>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Created At </th>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Last Updated </th>
                                                                    <td></td>
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