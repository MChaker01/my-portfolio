import api from "./api";

// ==================== PUBLIC ROUTES ====================

/**
 * Get all skills (public access)
 * @returns {Promise} Array of skills
 */

export const getAllSkills = async () => {
  const response = await api.get("/skills");

  return response.data.Skills;
};

/**
 * Get single skill by ID (public access)
 * @param {string} id - Skill ID
 * @returns {Promise} Single skill object
 */

export const getSkillById = async (id) => {
  const response = await api.get(`/skills/${id}`);

  return response.data.Skill;
};

// ==================== ADMIN ROUTES (Protected) ====================

/**
 * Create new skill (admin only)
 * @param {FormData} formData - Skill data with image
 * @returns {Promise} Created skill
 */

export const createSkill = async (formData) => {
  const response = await api.post("/admin/skills/createSkill", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

/**
 * Update existing skill (admin only)
 * @param {string} id - Skill ID
 * @param {FormData} formData - Updated skill data
 * @returns {Promise} Updated skill
 */

export const updateSkill = async (id, formData) => {
  const response = await api.put(`/admin/skills/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

/**
 * Delete skill (admin only)
 * @param {string} id - Skill ID
 * @returns {Promise} Deletion confirmation
 */

export const deleteSkill = async (id) => {
  const response = await api.delete(`/admin/skills/${id}`);

  return response.data;
};
