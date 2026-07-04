import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

/* ==========================
   Fetch Cases
========================== */

export const fetchCases = async (params) => {
    const response = await axios.get(`${API_URL}/cases`, {
        params,
    });

    return response.data;
};

/* ==========================
   Preview Files
========================== */

export const getPreviewFiles = async (caseId) => {
    const response = await axios.get(
        `${API_URL}/case_files/${caseId}`
    );

    return response.data.filter(
        (file) => file.file_category === "preview_file"
    );
};

/* ==========================
   Digital Files
========================== */

export const getDigitalFiles = async (caseId) => {
    const response = await axios.get(
        `${API_URL}/case_files/${caseId}`
    );

    return response.data.filter(
        (file) => file.file_category === "digital_file"
    );
};

/* ==========================
   Case Document
========================== */

export const getCaseDocument = async (caseId) => {
    const response = await axios.get(
        `${API_URL}/case_files/${caseId}`
    );

    return response.data.find(
        (file) => file.file_category === "case_document"
    );
};

/* ==========================
   Download Case Document
========================== */

export const downloadCaseDocument = async (caseId) => {
    const caseDocument = await getCaseDocument(caseId);

    if (!caseDocument) {
        throw new Error("No case document found");
    }

    window.open(
        `${API_URL}/download-file?file_path=${encodeURIComponent(
            caseDocument.file_path
        )}`,
        "_blank"
    );
};

/* ==========================
   View Case Document
========================== */

export const viewCaseDocument = async (caseId) => {
    const caseDocument = await getCaseDocument(caseId);

    if (!caseDocument) {
        throw new Error("No case document found");
    }

    window.location.href =
        `http://127.0.0.1:8000/${caseDocument.file_path.replace(/\\/g, "/")}`;
};

/* ==========================
   Update Status
========================== */

export const updateCaseStatus = async (
    caseId,
    status
) => {
    return axios.put(
        `${API_URL}/cases/${caseId}/status`,
        {
            status,
        }
    );
};

/* ==========================
   Delete Case
========================== */

export const deleteCase = async (caseId) => {
    return axios.delete(
        `${API_URL}/cases/${caseId}`
    );
};