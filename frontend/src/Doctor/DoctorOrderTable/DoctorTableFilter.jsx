function DoctorTableFilter({
  statusFilter,
  setStatusFilter,
  deadlineFilter,
  setDeadlineFilter,
  setCurrentPage,
  handleReset
}) {

  return (

    <form
      className="row g-3 mb-3">
      <div className="col-md-3 ">
        <label className="form-label">
          Status
        </label>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="form-control"
        >
          <option value="">
            All
          </option>

          <option value="Submitted">
            Submitted
          </option>

          <option value="InProduction">
            InProduction
          </option>

          <option value="QualityCheck">
            QualityCheck
          </option>

          <option value="Shipped">
            Shipped
          </option>

          <option value="Delivered">
            Delivered
          </option>
        </select>
      </div>

      <div className="col-md-3">
        <label className="form-label">
          Delivery Deadline
        </label>

        <input
          type="date"
          value={deadlineFilter}
          onChange={(e) => {
            setDeadlineFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="form-control"
        />
      </div>
      <div className="col-lg-3 col-md-12 col-12">

        <div className="doctor-filter-buttons">

          <button
            type="submit"
            className="btn btn-primary fltr-btn"
            style={{
              backgroundColor: "#0152a8",
              border: "none"
            }}
          >
            Apply
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary fltr-btn"
            style={{
              backgroundColor: "#0152a8",
              border: "none"
            }}
          >
            Reset
          </button>

        </div>
      </div>
    </form>
  );
}

export default DoctorTableFilter;