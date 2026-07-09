import api from "./api";

export const getCases = (params) => {
  return api.get("/cases", {
    params,
  });
};

export const getCaseById = (id) => {
  return api.get(`/cases/${id}`);
};

export const createCase = (data) => {
  return api.post("/cases", data);
};

export const updateCase = (id, data) => {
  return api.put(`/cases/${id}`, data);
};

export const deleteCase = (id) => {
  return api.delete(`/cases/${id}`);
};

export const uploadCaseFile = (caseId, formData) => {
  return api.post(`/cases/${caseId}/upload`, formData);
};

export const getCaseFiles = () => {
  return api.get("/case_files");
};

export const updatePreviewStatus = (caseId, preview_status) => {
  return api.put(`/cases/${caseId}/preview-status`, {
    preview_status,
  });
};