import { useEffect, useState } from "react";
import axios from "axios";

import "../../styles/dashboard.css";
import "../../styles/sidebar.css";
import "../../styles/header.css";
import "../../styles/tables.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Sidebar from "../Sidebar";
import Header from "../Header";

import { FaEye, FaTrash } from "react-icons/fa";

function AllDoctors() {

  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/doctors"
      );

      setDoctors(response.data);

    } catch (error) {
      console.log("Error fetching doctors", error);
    }
  };
  const deleteDoctor = async (doctorId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://127.0.0.1:8000/doctors/${doctorId}`
      );

      alert("Doctor deleted successfully");

      fetchDoctors();

    } catch (error) {

      console.log("Delete Error", error);

    }
  };

  const filteredDoctors = doctors.filter((doctor) => {

    return (
      doctor.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.business_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const visibleDoctors = filteredDoctors.slice(0, entriesPerPage);

  return (
    <div className="container-fluid">

      <div className="dashboard-main">

        <div className="row g-0">

          <Sidebar />

          <div
            className="
                        offset-2 
                        col-12 
                        col-md-9 
                        col-lg-9
                        offset-lg-3 
                        col-xl-9
                        col-xxl-10
                        offset-xl-3
                        offset-xxl-2
                        main-content
                        "
          >

            <Header title="All Doctors" />

            <div className="main-c-inner">

              <div className="table-responsive">

                <div className="card border-0 shadow-sm p-3">



                  <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">

                    <div className="d-flex align-items-center gap-2">

                      <select
                        className="form-select"
                        style={{ width: "90px" }}
                        value={entriesPerPage}
                        onChange={(e) =>
                          setEntriesPerPage(
                            Number(e.target.value)
                          )
                        }
                      >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>

                      <span>entries per page</span>

                    </div>

                    <div className="d-flex align-items-center gap-2">

                      <label>Search:</label>

                      <input
                        type="text"
                        className="form-control"
                        value={searchTerm}
                        onChange={(e) =>
                          setSearchTerm(e.target.value)
                        }
                      />

                    </div>

                  </div>

                  {/* Table */}

                  <table className="table table-striped custom-table">

                    <thead>

                      <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Business Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>

                    </thead>

                    <tbody>

                      {visibleDoctors.length > 0 ? (

                        visibleDoctors.map((doctor) => (

                          <tr key={doctor.id}>

                            <td>
                              {doctor.full_name}
                            </td>

                            <td>
                              {doctor.email}
                            </td>

                            <td>
                              {doctor.phone}
                            </td>

                            <td>
                              {doctor.business_name}
                            </td>

                            <td>

                              <span
                                style={{
                                  color: "green",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                }}
                              >
                                {doctor.is_active ? "Approved" : "Pending"}
                              </span>

                            </td>

                            <td>

                              <div className="d-flex gap-3">

                                <FaEye
                                  style={{
                                    color: "#0d6efd",
                                    cursor: "pointer",
                                  }}
                                />

                                <FaTrash
                                  onClick={() => deleteDoctor(doctor.id)}
                                  style={{
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                />

                              </div>

                            </td>

                          </tr>

                        ))

                      ) : (

                        <tr>

                          <td
                            colSpan="6"
                            className="text-center"
                          >
                            No Doctors Found
                          </td>

                        </tr>

                      )}

                    </tbody>

                  </table>

                  {/* Footer */}

                  <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">

                    <div>

                      Showing 1 to {visibleDoctors.length} of{" "}
                      {filteredDoctors.length} entries

                    </div>

                    <nav>

                      <ul className="pagination mb-0">

                        <li className="page-item disabled">
                          <button className="page-link">
                            «
                          </button>
                        </li>

                        <li className="page-item disabled">
                          <button className="page-link">
                            ‹
                          </button>
                        </li>

                        <li className="page-item active">
                          <button className="page-link">
                            1
                          </button>
                        </li>

                        <li className="page-item disabled">
                          <button className="page-link">
                            ›
                          </button>
                        </li>

                        <li className="page-item disabled">
                          <button className="page-link">
                            »
                          </button>
                        </li>

                      </ul>

                    </nav>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AllDoctors;