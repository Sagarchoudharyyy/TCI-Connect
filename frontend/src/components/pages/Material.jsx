import React from 'react';
import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
    FaEdit,
    FaTrash,
    FaPlus,
    FaSearch,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';

function Material() {
    const [formData, setFormData] = useState({
        material_name: ""
    });
    const [editId, setEditId] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [message, setMessage] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const getMaterial = async () => {
        try {
            const response = await api.get("/material");
            setMaterials(response.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getMaterial();
    }
        , []);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (editId) {
                await api.put(`/material/${editId}`, formData);

                setMessage("Material updated successfully");
            } else {
                await api.post("/material", formData);

                setMessage("Material added successfully");
            }

            setFormData({
                material_name: ""
            });

            setEditId(null);

            getMaterial();
            setTimeout(() => {
                setMessage("");
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    };
    const handleEdit = (item) => {
        setFormData({
            material_name: item.material_name
        });

        setEditId(item.id);
    };
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this material?"
        );
        if (!confirmDelete) {
            return;
        }
        try {
            await api.delete(`/material/${id}`);
            setMessage("Material deleted successfully");
            getMaterial();
            setTimeout(() => {
                setMessage("");
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="card p-4 shadow-sm mt-2">
            <h5 className="mb-3 border-bottom pb-2">
                Add Material
            </h5>
            {message && (
                <div className="alert alert-success">
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}
                className="row g-3">
                <div className="col-md-8">
                    <label htmlFor="Material Name" className="form-label">
                        Material Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.material_name}
                        onChange={handleChange}
                        name="material_name"
                        placeholder="Material Name"
                        required
                    />
                </div>
                <div className="col-md-4 d-flex align-items-end">
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        {editId ? "Update Material" : "Add Material"}
                    </button>
                </div>
            </form>
            <table className="table table-bordered align-middle mt-4">
                <thead className="table-light">
                    <tr>
                        <th>#</th>
                        <th>Material Name</th>
                        <th width="120">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map(
                        (item) => (
                            <tr
                                key={item.id}
                            >
                                <td>
                                    {item.id}
                                </td>

                                <td>
                                    {
                                        item.material_name
                                    }
                                </td>

                                <td>
                                    <button
                                        className="btn btn-sm"
                                        onClick={() => handleEdit(item)}
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        className="btn btn-sm text-danger"
                                        onClick={() =>
                                            handleDelete(
                                                item.id
                                            )
                                        }
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>

            </table>
        </div>
    )
}
export default Material;