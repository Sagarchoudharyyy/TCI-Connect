function RecentCasesTopBar({
    entriesPerPage,
    setEntriesPerPage,
    searchTerm,
    setSearchTerm,
}) {
    return (
        <div className="row mt-2 justify-content-between">
            <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto">
                <div className="d-flex align-items-center gap-2">
                    <select
                        value={entriesPerPage}
                        onChange={(e) =>
                            setEntriesPerPage(Number(e.target.value))
                        }
                        className="form-select"
                        style={{ width: "90px" }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>

                    <label htmlFor="entries-select" className="mb-0">
                        entries per page
                    </label>
                </div>
            </div>

            <div className="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto">
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="search-input" className="mb-0">
                        Search:
                    </label>

                    <input
                        id="search-input"
                        type="search"
                        className="form-control form-control-sm"
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

export default RecentCasesTopBar;