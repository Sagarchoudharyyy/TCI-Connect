import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Sidebar from "../Sidebar";
import Header from "../Header";
import "../../styles/tables.css";

import { FaEye, FaTrash } from "react-icons/fa";

function AllDoctors() {

  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchDoctors();
  }, []);

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
  const toggleDoctorStatus =
    async (doctorId) => {

      try {

        const response =
          await axios.put(
            `http://127.0.0.1:8000/api/toggle-doctor-status/${doctorId}`
          );

        console.log(
          response.data
        );

        fetchDoctors();

      } catch (error) {

        console.log(
          "Status Update Error",
          error
        );
      }
    };
  const deleteDoctor = async (doctorId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/doctors/${doctorId}`
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
  const totalEntries = filteredDoctors.length;

  const startEntry =
    totalEntries === 0
      ? 0
      : (currentPage - 1) * entriesPerPage + 1;

  const endEntry = Math.min(
    currentPage * entriesPerPage,
    totalEntries
  );

  return (
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
              <div className="table-responsive">
                <div className="row mt-2 justify-content-between">
                  <div className="d-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto">
                    <div className="d-flex align-items-center gap-2">
                      <select
                        value={entriesPerPage}
                        style={{ width: "90px" }}
                        onChange={(e) =>
                          setEntriesPerPage(Number(e.target.value))
                        }
                        className="form-select form-select-sm"
                      >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <span>entries per page</span>
                    </div>
                  </div>
                  <div className="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto">
                    <div className="d-flex align-items-center gap-2">
                      <label htmlFor="dt-search-0">Search:</label>
                      <input
                        type="search"
                        className="form-control form-control-sm"
                        id="dt-search-0"
                        placeholder=""
                        value={searchTerm}
                        onChange={(e) =>
                          setSearchTerm(
                            e.target.value
                          )
                        }
                      />
                    </div>
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
                              onClick={() =>
                                toggleDoctorStatus(
                                  doctor.id
                                )
                              }
                              style={{
                                color:
                                  doctor.status ===
                                    "approved"
                                    ? "green"
                                    : "orange",
                                fontWeight: "bold",
                                cursor: "pointer",
                              }}
                            >
                              {doctor.status ===
                                "approved"
                                ? "Approved"
                                : "Pending"}
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

                  <div
                    className="dt-info"
                    aria-live="polite"
                    id="data-table_info"
                    role="status"
                  >
                    Showing {startEntry} to {endEntry} of {totalEntries} entries
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

  );
}

export default AllDoctors;