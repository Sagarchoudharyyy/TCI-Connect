import {
    useState,
    useEffect
} from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useLocation } from "react-router-dom";

import axios from "axios";

import {
    useParams,
    useNavigate,
} from "react-router-dom";
import Category from "./Category";
import Material from "./Material";
import {
    FaEye,
    FaEdit,
    FaDownload,
    FaUpload,
    FaTrash
} from "react-icons/fa";
import { Edit } from "lucide-react";


function UpdatePrice() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const isEditMode = !!id;
    const [formData,
        setFormData] =
        useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    console.log(id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(
                    `http://127.0.0.1:8000/pricing/${id}`,
                    formData
                );

            }
            else {
                await axios.post(
                    "http://127.0.0.1:8000/pricing",
                    formData
                );

            }

            navigate("/admin/pricing", {
                state: {
                    message: id
                        ? "Price updated successfully"
                        : "Price saved successfully"
                }
            });
        }
        catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {

        if (id) {
            axios
                .get(
                    `http://127.0.0.1:8000/pricing/${id}`
                )
                .then((res) => {
                    setFormData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }, [id]);

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
                            <div className="container">
                                <div className="card p-4 shadow-sm mb-5">
                                    <h5 className="mb-3 border-bottom pb-2">
                                        {isEditMode
                                            ? "Update Price"
                                            : "Add New Price"}
                                    </h5>

                                    <form onSubmit={handleSubmit}>
                                        <input type="hidden" name="id" value="52" />

                                        <div className="mb-3">
                                            <label className="form-label">Product Name</label>
                                            <input
                                                type="text"
                                                name="product"
                                                className="form-control"
                                                value={formData.product || ""}
                                                onChange={handleChange}
                                                required

                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Category</label>
                                            <select
                                                name="category"
                                                className="form-select"
                                                value={formData.category || ""}
                                                onChange={handleChange}
                                                required

                                            >
                                                <option value="">Select Category</option>
                                                <option value="3">Crown</option>
                                                <option value="4">Venner</option>
                                                <option value="7">Inlay/Onlay</option>
                                                <option value="8">Implant Crown</option>
                                                <option value="9">Implant</option>
                                                <option value="10">ALL on 4/6</option>
                                                <option value="11">Hybrid Bridge</option>
                                                <option value="12">Abutment</option>
                                                <option value="13">Pressed</option>
                                                <option value="14">Print</option>
                                                <option value="15">MILL ONLY</option>
                                                <option value="16">Design</option>
                                                <option value="17">Attachment</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Material</label>
                                            <select
                                                name="material"
                                                className="form-select"
                                                value={formData.material || ""}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Material</option>
                                                <option value="3">Zirconia</option>
                                                <option value="5">Metal</option>
                                                <option value="6">Titane</option>
                                                <option value="7">E-max</option>
                                                <option value="8">silicone</option>
                                                <option value="9">wax</option>
                                                <option value="10">ceramic</option>
                                                <option value="11">Titanium</option>
                                                <option value="12">PMMA</option>
                                                <option value="13">Various</option>
                                                <option value="14">Resin</option>
                                                <option value="15">STL</option>
                                                <option value="16">Metal / Zirconia / Ceramic</option>
                                            </select>
                                        </div>

                                        <div className="card mb-4">
                                            <div className="card-header fw-bold">
                                                Price Matrix
                                            </div>

                                            <div className="card-body">
                                                <div className="row g-3">
                                                    <div className="col-md-3">
                                                        <label className="form-label">
                                                            Belgium Dentist (€)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            name="belgium_dentist_price"
                                                            className="form-control"
                                                            value={formData.belgium_dentist_price || ""}
                                                            onChange={handleChange}
                                                        />
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label className="form-label">
                                                            Belgium Lab (€)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            name="belgium_lab_price"
                                                            className="form-control"
                                                            value={formData.belgium_lab_price || ""}
                                                            onChange={handleChange}
                                                        />
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label className="form-label">
                                                            Lebanon Dentist (USD)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            name="lebanon_dentist_price"
                                                            className="form-control"
                                                            value={formData.lebanon_dentist_price || ""}
                                                            onChange={handleChange}
                                                        />
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label className="form-label">
                                                            Lebanon Lab (USD)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            name="lebanon_lab_price"
                                                            className="form-control"
                                                            value={formData.lebanon_lab_price || ""}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-end">
                                            <button type="submit" className="btn btn-primary px-4">
                                                {isEditMode
                                                    ? "Update Price"
                                                    : "Save Price"}
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-secondary ms-2"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <Category />
                                <Material />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdatePrice;