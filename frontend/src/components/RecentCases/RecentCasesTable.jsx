import RecentCasesRow from "./RecentCasesRow";
function RecentCasesTable({
    cases,
    previewFilesMap,
    digitalFilesMap,
    loadDigitalFiles,
    handleDownloadCaseDocument,
    handleViewCaseDocument,
    handleStatusChange,
    handleDelete,
    navigate
}) {
    return (
        <div className="table-responsive">
            <table id="data-table" className="table table-striped custom-table dataTable">
                <colgroup>
                    <col data-dt-column="0" style={{ width: "94px" }} />
                    <col data-dt-column="1" style={{ width: "73.0972px" }} />
                    <col data-dt-column="2" style={{ width: "100.944px" }} />
                    <col data-dt-column="3" style={{ width: "110.694px" }} />
                    <col data-dt-column="4" style={{ width: "102.306px" }} />
                    <col data-dt-column="5" style={{ width: "118.389px" }} />
                    <col data-dt-column="6" style={{ width: "150.847px" }} />
                    <col data-dt-column="7" style={{ width: "125.639px" }} />
                    <col data-dt-column="8" style={{ width: "189.347px" }} />
                    <col data-dt-column="9" style={{ width: "136px" }} />
                    <col data-dt-column="10" style={{ width: "93.3194px" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th data-dt-column="0" className="dt-orderable-none" rowSpan="1" colSpan="1">
                            <div className="dt-column-header">
                                <span className="dt-column-title">
                                    Profile
                                </span>
                            </div>
                        </th>

                        <th data-dt-column="1" className="dt-orderable-none dt-type-numeric" rowSpan="1" colSpan="1">
                            <div className="dt-column-header">
                                <span className="dt-column-title">
                                    Case Id
                                </span>
                            </div>
                        </th>

                        <th data-dt-column="2" className="dt-orderable-none" rowSpan="1" colSpan="1">
                            <div className="dt-column-header">
                                <span className="dt-column-title">
                                    Doctor Name
                                </span>
                            </div>
                        </th>

                        <th data-dt-column="3" className="dt-orderable-none dt-type-numeric" rowSpan="1" colSpan="1">
                            <div className="dt-column-header">
                                <span className="dt-column-title">
                                    Phone
                                </span>
                            </div>
                        </th>

                        <th data-dt-column="4" className="dt-orderable-none" rowSpan="1" colSpan="1">
                            <div className="dt-column-header">
                                <span className="dt-column-title">
                                    Patient Name
                                </span>
                            </div>
                        </th>

                        <th data-dt-column="5" className="dt-orderable-none" rowSpan="1" colSpan="1">
                            <div className="dt-column-header">
                                <span className="dt-column-title">
                                    Case Document
                                </span>
                            </div>
                        </th>

                        <th data-dt-column="6" className="dt-orderable-none" rowSpan="1" colSpan="1">
                            <div className="dt-column-header">
                                <span className="dt-column-title">
                                    Digital Files
                                </span>
                            </div>
                        </th>

                        <th data-dt-column="7" className="dt-orderable-none" rowSpan="1" colSpan="1">
                            <div className="dt-column-header">
                                <span className="dt-column-title">
                                    Delivery Deadline
                                </span>
                            </div>
                        </th>

                        <th data-dt-column="8" className="dt-orderable-none" rowSpan="1" colSpan="1">
                            <div className="dt-column-header">
                                <span className="dt-column-title">
                                    Preview Status
                                </span>
                            </div>
                        </th>

                        <th data-dt-column="9" className="dt-orderable-none" rowSpan="1" colSpan="1">
                            <div className="dt-column-header">
                                <span className="dt-column-title">
                                    Status
                                </span>
                            </div>
                        </th>

                        <th data-dt-column="10" className="dt-orderable-none" rowSpan="1" colSpan="1">
                            <div className="dt-column-header">
                                <span className="dt-column-title">
                                    Action
                                </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cases.map((item) => (
                        <RecentCasesRow
                            key={item.id}
                            item={item}
                            previewFilesMap={previewFilesMap[item.id] || []}
                            digitalFilesMap={digitalFilesMap[item.id] || []}
                            loadDigitalFiles={loadDigitalFiles}
                            handleViewCaseDocument={handleViewCaseDocument}
                            handleDownloadCaseDocument={handleDownloadCaseDocument}
                            handleStatusChange={handleStatusChange}
                            handleDelete={handleDelete}
                            navigate={navigate}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default RecentCasesTable;