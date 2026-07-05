function DoctorPagination({
  cases,
  currentPage,
  entriesPerPage,
  totalCases,
  totalPages,
  setCurrentPage,
}) {
  return (
    <div className="row mt-2 justify-content-between">

      <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto">

        <div
          className="dt-info"
          aria-live="polite"
          role="status"
        >
          Showing{" "}
          {cases.length === 0
            ? 0
            : (currentPage - 1) * entriesPerPage + 1}
          {" "}to{" "}
          {(currentPage - 1) * entriesPerPage + cases.length}
          {" "}of{" "}
          {totalCases} entries
        </div>

      </div>

      <div className="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto">

        <div className="dt-paging">

          <nav aria-label="pagination">

            <ul className="pagination">

              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(1)}
                >
                  «
                </button>
              </li>

              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  ‹
                </button>
              </li>

              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  ›
                </button>
              </li>

              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  »
                </button>
              </li>

            </ul>

          </nav>

        </div>

      </div>

    </div>
  );
}

export default DoctorPagination;