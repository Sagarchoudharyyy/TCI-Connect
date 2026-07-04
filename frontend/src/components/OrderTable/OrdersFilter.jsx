import React from "react";
function OrdersFilters({
    statusFilter,
    setStatusFilter,
    deadlineFilter,
    setDeadlineFilter,
    handleSubmit,
    handleReset
}) {
    return (
        <form onSubmit={handleSubmit} className="row g-3 mb-4">

            <div className="col-12 col-sm-6 col-lg-3">
                <label className="form-label">
                    Status
                </label>

                <select
                    className="form-control"
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                >
                    <option value="">All</option>
                    <option value="Submitted">Submitted</option>
                    <option value="InProduction">InProduction</option>
                    <option value="QualityCheck">QualityCheck</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">

                <label className="form-label">
                    Delivery Deadline
                </label>

                <input
                    type="date"
                    className="form-control"
                    value={deadlineFilter}
                    onChange={(e) =>
                        setDeadlineFilter(e.target.value)
                    }
                />

            </div>

            <div className="col-12 col-lg-3 d-flex align-items-end">

                <button
                    type="submit"
                    className="btn btn-primary me-2"
                >
                    Apply
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleReset}
                >
                    Reset
                </button>

            </div>

        </form>
    );
}

export default OrdersFilters;