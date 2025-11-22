import axios from "axios";

// we use the environment variable, or fallback to localhost for safety
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
// Runs BEFORE every request is sent
// Purpose: Attach JWT token to protected routes

api.interceptors.request.use(
  (config) => {
    // Get token from localStorage (stored after login)
    const token = localStorage.getItem("token");

    // If token exists, add it to Authorization header
    // Format: "Bearer <token>" (standard JWT format)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // Send modified request
  },
  (error) => {
    // Handle request errors (network issues, etc.)
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR
// Runs AFTER every response is received
// Purpose: Handle authentication errors globally
api.interceptors.response.use(
  (response) => {
    // If response is successful (200-299), just return it
    return response;
  },
  (error) => {
    // If token is invalid/expired (401), clear localStorage and redirect
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      if (window.location.pathname.startsWith("/admin")) {
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error); // Pass error to component for handling
  }
);

export default api;
