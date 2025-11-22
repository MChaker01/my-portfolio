// Import configured axios instance
import api from "./api";

// ==================== PUBLIC ROUTES ====================

/**
 * Get all projects (public access)
 * @returns {Promise} Array of projects
 */

export const getAllProjects = async () => {
  const response = await api.get("/projects");
  return response.data.Projects; // Return projects array from backend response
};

/**
 * Get single project by ID (public access)
 * @param {string} id - Project ID
 * @returns {Promise} Single project object
 */

export const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}`);

  return response.data.Project;
};

// ==================== ADMIN ROUTES (Protected) ====================

/**
 * Create new project (admin only)
 * @param {FormData} formData - Project data with image
 * @returns {Promise} Created project
 */

export const createProject = async (formData) => {
  const response = await api.post("/admin/projects/createProject", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

/**
 * Update existing project (admin only)
 * @param {string} id - Project ID
 * @param {FormData} formData - Updated project data
 * @returns {Promise} Updated project
 */

export const updateProject = async (id, formData) => {
  const response = await api.put(`/admin/projects/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

/**
 * Delete project (admin only)
 * @param {string} id - Project ID
 * @returns {Promise} Deletion confirmation
 */

export const deleteProject = async (id) => {
  const response = await api.delete(`/admin/projects/${id}`);

  return response.data;
};
