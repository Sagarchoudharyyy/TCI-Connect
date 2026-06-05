import DoctorSideBar from "../components/DoctorSideBar";
import DoctorHeader from "../components/DoctorHeader";
import "../DoctorStyle/doctor-dashboard.css";
import "../DoctorStyle/Cases.css";
import { FaEdit, FaTrash, FaDownload, FaFile } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getCases, deleteCase } from "../services/caseService";

function DoctorCases() {

    const [cases, setCases] = useState([]);

    const fetchCases = async () => {
        try {
            const response = await getCases();
            console.log("API Response:", response.data);
            setCases(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this case?"
        );

        if (!confirmDelete) return;

        try {

            await deleteCase(id);

            fetchCases();

        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        fetchCases();
    }, []);
    return (
        <div className="container-fluid p-0">
            <div className="row g-0 doctor-dashboard-main">
                <DoctorSideBar />
                <div className="col-md-9 doctor-main-content">

                    <DoctorHeader title="Dashboard" />
                    <div className="cases-container">

                        <div className="case-heading">
                            <div className="section-heading">
                                <h4 className="sub-heading">
                                    All Cases
                                </h4>
                            </div>

                            <div className="case-btn">
                                <button className="btn">
                                    Submit a Case
                                </button>
                            </div>
                        </div>

                        <div className="case-filter-section">

                            <div className="filter-group">
                                <label>Status</label>

                                <select className="form-control">
                                    <option value="">All</option>
                                    <option value="Submitted">Submitted</option>
                                    <option value="InProduction">InProduction</option>
                                    <option value="QualityCheck">QualityCheck</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>

                            <div className="filter-group">
                                <label>Delivery Deadline</label>

                                <input
                                    type="date"
                                    className="form-control"
                                />
                            </div>

                            <div className="filter-buttons">
                                <button className="apply-btn">
                                    Apply
                                </button>

                                <button className="reset-btn">
                                    Reset
                                </button>
                            </div>

                        </div>

                        <div className="table-top">

                            <div className="table-length">
                                <select className="entries-select">
                                    <option>10</option>
                                    <option>25</option>
                                    <option>50</option>
                                    <option>100</option>
                                </select>

                                <label>entries per page</label>
                            </div>

                            <div className="table-search">
                                <label>Search:</label>

                                <input
                                    type="search"
                                    className="search-input"
                                />
                            </div>

                        </div>

                        <div className="table-responsive">

                            <table className="cases-table">

                                <thead>
                                    <tr>
                                        <th>Case Id</th>
                                        <th>Patient Name</th>
                                        <th>Appointment Date</th>
                                        <th>Age</th>
                                        <th>Case Pdf</th>
                                        <th>Digital Files</th>
                                        <th>Delivery Deadline</th>
                                        <th>Preview Status</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {cases.map((item) => (
                                        <tr key={item.id}>

                                            <td>{item.case_id}</td>

                                            <td>{item.patient_name}</td>

                                            <td>
                                                {item.appointment_date
                                                    ? item.appointment_date.split("T")[0]
                                                    : ""}
                                            </td>

                                            <td>{item.age}</td>

                                            <td>
                                                <FaFile className="pdf-icon" />
                                            </td>

                                            <td>
                                                Preview File 1{" "}
                                                <FaDownload className="download-icon" />
                                            </td>

                                            <td>{item.delivery_deadline}</td>

                                            <td>{item.preview_status}</td>

                                            <td>{item.status}</td>

                                            <td>
                                                <FaEdit className="edit-icon me-3" />
                                                <FaTrash
                                                    className="delete-icon"
                                                    onClick={() => handleDelete(item.id)}
                                                />                </td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                        </div>

                        <div className="table-footer">

                            <div className="table-info">
                                Showing 1 to {cases.length} of {cases.length} entries
                            </div>

                            <div className="table-pagination">

                                <button className="page-link-btn">
                                    &laquo;
                                </button>

                                <button className="page-link-btn">
                                    &lsaquo;
                                </button>

                                <button className="page-link-btn active-page">
                                    1
                                </button>

                                <button className="page-link-btn">
                                    &rsaquo;
                                </button>

                                <button className="page-link-btn">
                                    &raquo;
                                </button>

                            </div>

                        </div>

                    </div>


                </div>
            </div>
        </div>
    )
}
export default DoctorCases;
