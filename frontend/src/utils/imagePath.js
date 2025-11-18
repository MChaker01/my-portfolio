// src/utils/imagePath.js
export const getImageUrl = (path) => {
  if (!path) return "https://placehold.co/600x400?text=No+Image";

  // If it's already a full URL (e.g. from Cloudinary later), return it
  if (path.startsWith("http")) return path;

  // In development, point to local backend.
  // In production, this will be the backend URL
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  return `${BASE_URL}${path}`;
};
