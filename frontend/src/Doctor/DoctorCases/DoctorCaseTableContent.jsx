import DoctorCaseRow from "./DoctorCaseRow";

function DoctorCaseTableContent({
    cases,
    previewFilesMap,
    digitalFilesMap,
    loadDigitalFiles,
    handleViewCaseDocument,
    handlePreviewStatus,
    handleDelete,
}) {
    return (
        <tbody>
            {cases.map((item) => (
                <DoctorCaseRow
                    key={item.id}
                    item={item}
                    previewFiles={previewFilesMap[item.id] || []}
                    digitalFiles={digitalFilesMap[item.id] || []}
                    loadDigitalFiles={loadDigitalFiles}
                    handleViewCaseDocument={handleViewCaseDocument}
                    handlePreviewStatus={handlePreviewStatus}
                    handleDelete={handleDelete}
                />
            ))}
        </tbody>
    );
}

export default DoctorCaseTableContent;