import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const getCases = () => {
  return axios.get(`${API_URL}/cases`);
};

export const getCaseById = (id) => {
  return axios.get(`${API_URL}/cases/${id}`);
};

export const createCase = (data) => {
  return axios.post(`${API_URL}/cases`, data);
};

export const updateCase = (id, data) => {
  return axios.put(`${API_URL}/cases/${id}`, data);
};

export const deleteCase = (id) => {
  return axios.delete(`${API_URL}/cases/${id}`);
};

export const uploadCaseFile = (caseId, formData) => {
  return axios.post(
    `${API_URL}/cases/${caseId}/upload`,
    formData
  );
};

export const getCaseFiles = () => {
  return axios.get(`${API_URL}/case_files`);
};

export const updatePreviewStatus = (
  caseId,
  preview_status
) => {
  return axios.put(
    `${API_URL}/cases/${caseId}/preview-status`,
    {
      preview_status
    }
  );
};