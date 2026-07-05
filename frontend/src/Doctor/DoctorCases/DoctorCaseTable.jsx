import DoctorCaseTableHead from "./DoctorCaseTableHead";
import DoctorCaseTableContent from "./DoctorCaseTableContent";

function DoctorCaseTable({
    cases,
    previewFilesMap,
    digitalFilesMap,
    loadDigitalFiles,
    handleViewCaseDocument,
    handlePreviewStatus,
    handleDelete
}) {
    return (
        <div className="table-responsive">
            <table
                id="data-table"
                className="table table-striped custom-table dataTable p-2"
            >
                <colgroup>
                    <col style={{ width: "64.2625px" }} />
                    <col style={{ width: "142.625px" }} />
                    <col style={{ width: "155.5px" }} />
                    <col style={{ width: "51.65px" }} />
                    <col style={{ width: "73.825px" }} />
                    <col style={{ width: "153.2px" }} />
                    <col style={{ width: "124.812px" }} />
                    <col style={{ width: "106.8px" }} />
                    <col style={{ width: "79.7625px" }} />
                    <col style={{ width: "75.0625px" }} />
                </colgroup>

                <DoctorCaseTableHead />

                <DoctorCaseTableContent
                    cases={cases}
                    previewFilesMap={previewFilesMap}
                    digitalFilesMap={digitalFilesMap}
                    loadDigitalFiles={loadDigitalFiles}
                    handleViewCaseDocument={handleViewCaseDocument}
                    handlePreviewStatus={handlePreviewStatus}
                    handleDelete={handleDelete}
                />
            </table>
        </div>
    );
}

export default DoctorCaseTable;