import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { FaEdit, FaTrash } from "react-icons/fa";

function Category() {
    const [formData, setFormData] = useState({
        category_name: ""
    });
    const [editId, setEditId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const getCategories = () => {
        axios
            .get("http://127.0.0.1:8000/api/category")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                await axios.put(
                    `http://127.0.0.1:8000/api/category/${editId}`,
                    formData
                );

                setMessage("Category updated successfully");
            }
            else {
                await axios.post(
                    "http://127.0.0.1:8000/api/category",
                    formData
                );
                setMessage("Category added successfully")
            }
            setFormData({
                category_name: ""
            });
            setEditId(null)
            getCategories();
            setTimeout(() => {
                setMessage("");
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (item) => {
        setFormData({
            category_name: item.category_name
        });
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this category?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await axios.delete(
                `http://127.0.0.1:8000/api/category/${id}`
            );

            setMessage("Category deleted successfully");

            getCategories();
            setTimeout(() => {
                setMessage("");
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <div className="card p-4 shadow-sm mb-5">
            <h5 className="mb-3 border-bottom pb-2">
                Add Category
            </h5>
            {message && (
                <div className="alert alert-success">
                    {message}
                </div>
            )}
            <form
                onSubmit={handleSubmit}
                className="row g-3"
            >
                <div className="col-md-8">
                    <label className="form-label">
                        Category Name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={formData.category_name || ""}
                        onChange={handleChange}
                        name="category_name"
                        placeholder="Category Name"
                        required
                    />
                </div>

                <div className="col-md-4 d-flex align-items-end">
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        {editId
                            ? "Update Category"
                            : "Add Category"}
                    </button>
                </div>
            </form>

            <table className="table table-bordered align-middle mt-4">
                <thead className="table-light">
                    <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th width="120">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map(
                        (item) => (
                            <tr
                                key={item.id}
                            >
                                <td>
                                    {item.id}
                                </td>

                                <td>
                                    {
                                        item.category_name
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


    );
}

export default Category;