import api from "./api";

export const getAllExperience = async () => {
  const response = await api.get("/experience");
  return response.data.Experience;
};

export const createExperience = async (data) => {
  const response = await api.post("/admin/experience", data);
  return response.data;
};

export const updateExperience = async (id, data) => {
  const response = await api.put(`/admin/experience/${id}`, data);
  return response.data;
};

export const deleteExperience = async (id) => {
  const response = await api.delete(`/admin/experience/${id}`);
  return response.data;
};
