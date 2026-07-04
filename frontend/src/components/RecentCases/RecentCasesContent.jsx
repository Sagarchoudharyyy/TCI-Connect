import RecentCasesRow from "./RecentCasesRow";

function RecentCasesContent({
    cases,
    previewFilesMap,
    digitalFilesMap,
    loadDigitalFiles,
    handleViewCaseDocument,
    handleDownloadCaseDocument,
    handleStatusChange,
    handleDelete,
    navigate,
}) {
    return (
        <tbody>
            {cases.map((item) => (
                <RecentCasesRow
                    key={item.id}
                    item={item}
                    previewFiles={previewFilesMap[item.id] || []}
                    digitalFiles={digitalFilesMap[item.id] || []}
                    loadDigitalFiles={loadDigitalFiles}
                    handleViewCaseDocument={handleViewCaseDocument}
                    handleDownloadCaseDocument={handleDownloadCaseDocument}
                    handleStatusChange={handleStatusChange}
                    handleDelete={handleDelete}
                    navigate={navigate}
                />
            ))}
        </tbody>
    );
}

export default RecentCasesContent;