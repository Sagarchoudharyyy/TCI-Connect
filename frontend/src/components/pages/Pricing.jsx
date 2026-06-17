import { useEffect, useState } from "react";
import axios from "axios";

import "../../styles/dashboard.css";
import "../../styles/sidebar.css";
import "../../styles/header.css";
import "../../styles/tables.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaEye,
  FaEdit,
  FaDownload,
  FaUpload,
  FaTrash
} from "react-icons/fa";

import Sidebar from "../Sidebar";
import Header from "../Header";
import "../../styles/pricing.css";

function Pricing() {
  const navigate = useNavigate();
  const [prices, setPrices] = useState([]);
  const [pricingData, setPricingData] = useState([]);
  const [message, setMessage] = useState("");
  const location = useLocation();

  const categoryMap = {
    3: "Crown",
    4: "Venner",
    7: "Inlay/Onlay",
    8: "Implant Crown",
    9: "Implant",
    10: "ALL on 4/6",
    11: "Hybrid Bridge",
    12: "Abutment",
    13: "Pressed",
    14: "Print",
    15: "MILL ONLY",
    16: "Design",
    17: "Attachment"
  };

  const materialMap = {
    3: "Zirconia",
    5: "Metal",
    6: "Titane",
    7: "E-max",
    8: "silicone",
    9: "wax",
    10: "ceramic",
    11: "Titanium",
    12: "PMMA",
    13: "Various",
    14: "Resin",
    15: "STL",
    16: "Metal / Zirconia / Ceramic"
  };

  useEffect(() => {
    console.log("Pricing page loaded");
    fetchPrices();
  }, []);

  useEffect(() => {

    if (
      location.state &&
      location.state.message
    ) {

      setMessage(
        location.state.message
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);

      window.history.replaceState(
        {},
        document.title
      );
    }

  }, [location]);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this price?")) {
      return;
    }
    try {
      await axios.delete(`http://127.0.0.1:8000/pricing/${id}`);
      setMessage("Price deleted successfully");
      setTimeout(() => {
        setMessage("")
      }, 3000);
      fetchPrices();
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error deleting price:", error);
      setMessage("Failed to delete price");
    }
  }

  const fetchPrices = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/pricing"
      );

      console.log("Pricing Data:", response.data);
      setPrices(response.data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };
  const getPricingData = async () => {
    try {
      axios.get("http://127.0.0.1:8000/api/pricing").then((response) => {
        setPricingData(response.data);
      });
    }
    catch (error) {
      console.error("Error fetching pricing data:", error);
    }
  };
  return (
    <div className="container-fluid">
      <div className="dashboard-main">
        <div className="row g-0">

          <Sidebar />

          <div className="offset-2 col-12 col-md-9 col-lg-9 
                    offset-lg-3 col-xl-9 col-xxl-10 offset-xl-3 offset-xxl-2 
                    main-content">

            <Header title="Dashboard" />
            <div className="main-c-inner">
              {message && (
                <div className="alert alert-success">
                  {message}
                </div>
              )}
              <button
                className="btn btn-primary mb-3"
                onClick={() => navigate("/add-price")}
              >
                Add Price
              </button>

              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Material</th>
                      <th>Belgium Dentist (€)</th>
                      <th>Belgium Lab (€)</th>
                      <th>Lebanon Dentist ($)</th>
                      <th>Lebanon Lab ($)</th>
                      <th width="120">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prices.map((price) => (
                      <tr key={price.id}>
                        <td>{price.product}</td>
                        <td>
                          {categoryMap[price.category] || price.category}
                        </td>
                        <td>
                          {materialMap[price.material] || price.material}
                        </td>
                        <td>€ {price.belgium_dentist_price}</td>
                        <td>€ {price.belgium_lab_price}</td>
                        <td>$ {price.lebanon_dentist_price}</td>
                        <td>$ {price.lebanon_lab_price}</td>
                        <td>
                          <button
                            className="btn btn-md"
                            onClick={() =>
                              navigate(
                                `/update-price/${price.id}`
                              )
                            }
                          >
                            <FaEdit />
                          </button>
                          <button className="btn btn-md " onClick={() => handleDelete(price.id)}>
                            <FaTrash className="text-danger" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>
              <div className="card mt-4 ">
                <div className="card-body small">

                  <p className="mb-2 fw-semibold">
                    Prices & Order Information
                  </p>

                  <ul className="mb-3">
                    <li>
                      Prices are exclusive of VAT.
                    </li>

                    <li>
                      Shipping is free for orders of{" "}
                      <strong>€150 or more</strong>.
                    </li>

                    <li>
                      Orders below €150 are subject to a fixed shipping fee of{" "}
                      <strong>€9</strong>.
                    </li>

                    <li>
                      Prices are for reference only.
                      Orders must be submitted via the{" "}
                      <strong>RX form</strong>.
                    </li>
                  </ul>

                  <hr />

                  <ul className="list-unstyled mb-3">
                    <li>
                      <strong>
                        Temporaries (PMMA)
                      </strong>
                    </li>

                    <li>
                      <strong>
                        3D Printing & Models
                      </strong>
                    </li>

                    <li>
                      <strong>
                        Mill Only
                      </strong>{" "}
                      (No CAD design included)
                    </li>

                    <li>
                      <strong>
                        CAD Services
                      </strong>
                    </li>

                    <li>
                      <strong>
                        Abutments & Attachments
                      </strong>
                    </li>

                    <li>
                      <strong>
                        Implant Restorations
                      </strong>
                    </li>
                  </ul>

                  <hr />

                  <p className="mb-0">
                    <strong>
                      Fixed Prosthetics – Crowns /
                      Veneers / Inlay-Onlay
                    </strong>
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Pricing;