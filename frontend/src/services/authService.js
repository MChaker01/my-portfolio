import api from "./api";

/**
 * Admin login
 * @param {Object} credentials - { email, password }
 * @returns {Promise} { message, username, email, token }
 */

export const login = async (credentials) => {
  const response = await api.post("/admin/login", credentials);

  return response.data;
};

/**
 * Admin logout (client-side only)
 * Clears localStorage and redirects
 */

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
  window.location.href = "/";
};
