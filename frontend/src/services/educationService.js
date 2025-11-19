import api from "./api";

export const getAllEducation = async () => {
  const response = await api.get("/education");
  return response.data.Education;
};

export const createEducation = async (data) => {
  const response = await api.post("/admin/education", data);
  return response.data;
};

export const updateEducation = async (id, data) => {
  const response = await api.put(`/admin/education/${id}`, data);
  return response.data;
};

export const deleteEducation = async (id) => {
  const response = await api.delete(`/admin/education/${id}`);
  return response.data;
};
