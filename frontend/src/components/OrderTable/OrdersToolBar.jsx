import React from "react";

function OrdersToolbar({
    entriesPerPage,
    setEntriesPerPage,
    searchTerm,
    setSearchTerm
}) {
    return (

        <div className="row align-items-center gy-3 mb-3">

            <div className="col-12 col-md-6">

                <div className="d-flex align-items-center gap-2">

                    <select
                        className="form-select"
                        style={{ width: "90px" }}
                        value={entriesPerPage}
                        onChange={(e) =>
                            setEntriesPerPage(Number(e.target.value))
                        }
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>

                    <span>entries per page</span>

                </div>

            </div>

            <div className="col-12 col-md-6">

                <div className="d-flex justify-content-md-end align-items-center gap-2">

                    <label className="mb-0">
                        Search
                    </label>

                    <input
                        type="search"
                        className="form-control"
                        style={{ maxWidth: "250px" }}
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>

            </div>

        </div>

    );
}

export default OrdersToolbar;