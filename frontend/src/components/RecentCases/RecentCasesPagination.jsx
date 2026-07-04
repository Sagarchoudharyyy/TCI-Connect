function RecentCasesPagination({
    currentPage,
    setCurrentPage,
    totalPages,
    totalCases,
    startEntry,
    endEntry
}) {
    return (
        <div className="row mt-3 align-items-center">

            {/* Showing Entries */}
            <div className="col-12 col-md-6 mb-2 mb-md-0">
                <div
                    className="dt-info"
                    aria-live="polite"
                    role="status"
                >
                    Showing {startEntry} to {endEntry} of {totalCases} entries
                </div>
            </div>

            {/* Pagination */}
            <div className="col-12 col-md-6 d-flex justify-content-md-end">
                <nav aria-label="pagination">
                    <ul className="pagination mb-0">

                        {/* First */}
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button
                                type="button"
                                className="page-link"
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                            >
                                &laquo;
                            </button>
                        </li>

                        {/* Previous */}
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button
                                type="button"
                                className="page-link"
                                onClick={() => {
                                    if (currentPage > 1) {
                                        setCurrentPage(currentPage - 1);
                                    }
                                }}
                                disabled={currentPage === 1}
                            >
                                &lsaquo;
                            </button>
                        </li>

                        {/* Page Numbers */}
                        {[...Array(totalPages)].map((_, index) => (
                            <li
                                key={index}
                                className={`page-item ${currentPage === index + 1 ? "active" : ""
                                    }`}
                            >
                                <button
                                    type="button"
                                    className="page-link"
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}

                        {/* Next */}
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button
                                type="button"
                                className="page-link"
                                onClick={() => {
                                    if (currentPage < totalPages) {
                                        setCurrentPage(currentPage + 1);
                                    }
                                }}
                                disabled={currentPage === totalPages}
                            >
                                &rsaquo;
                            </button>
                        </li>

                        {/* Last */}
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button
                                type="button"
                                className="page-link"
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                            >
                                &raquo;
                            </button>
                        </li>

                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default RecentCasesPagination;