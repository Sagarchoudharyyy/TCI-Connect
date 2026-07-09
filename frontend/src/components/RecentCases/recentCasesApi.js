import api from "../../services/api"; // adjust the path
const FILE_URL = import.meta.env.VITE_FILE_URL;

export const fetchCases = async (params) => {
    const response = await api.get("/cases", {
        params,
    });

    return response.data;
};

export const getPreviewFiles = async (caseId) => {
    const response = await api.get(`/case_files/${caseId}`);

    return response.data.filter(
        (file) => file.file_category === "preview_file"
    );
};

export const getDigitalFiles = async (caseId) => {
    const response = await api.get(`/case_files/${caseId}`);

    return response.data.filter(
        (file) => file.file_category === "digital_file"
    );
};

export const getCaseDocument = async (caseId) => {
    const response = await api.get(`/case_files/${caseId}`);

    return response.data.find(
        (file) => file.file_category === "case_document"
    );
};

export const downloadCaseDocument = async (caseId) => {
    const caseDocument = await getCaseDocument(caseId);

    if (!caseDocument) {
        throw new Error("No case document found");
    }

    window.open(
        `${import.meta.env.VITE_API_URL}/download-file?file_path=${encodeURIComponent(
            caseDocument.file_path
        )}`,
        "_blank"
    );
};

export const viewCaseDocument = async (caseId) => {
    const caseDocument = await getCaseDocument(caseId);

    if (!caseDocument) {
        throw new Error("No case document found");
    }
    window.location.href = `${FILE_URL}/${caseDocument.file_path.replace(/\\/g, "/")}`;
};

export const updateCaseStatus = async (caseId, status) => {
    return api.put(`/cases/${caseId}/status`, {
        status,
    });
};

export const deleteCase = async (caseId) => {
    return api.delete(`/cases/${caseId}`);
};