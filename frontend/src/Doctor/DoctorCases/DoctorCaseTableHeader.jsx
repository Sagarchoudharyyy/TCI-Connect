function DoctorCaseTableHeader({
  entriesPerPage,
  setEntriesPerPage,
  searchTerm,
  setSearchTerm,
  setCurrentPage,
}) {
  return (
    <div className="row mt-2 justify-content-between">

      <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto">

        <div className="dt-length">

          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="form-select"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>

          <label htmlFor="dt-length-0">
            {" "}entries per page
          </label>

        </div>

      </div>

      <div className="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto">

        <div className="dt-search">

          <label htmlFor="dt-search-0">
            Search:
          </label>

          <input
            type="search"
            className="form-control form-control-sm"
            id="dt-search-0"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

        </div>

      </div>

    </div>
  );
}

export default DoctorCaseTableHeader;