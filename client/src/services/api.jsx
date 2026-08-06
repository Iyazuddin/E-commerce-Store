import axios from "axios";

// Local dev: uses the Vite dev-server proxy (vite.config.js) -> http://localhost:5000
// Production: override via VITE_API_URL (e.g. https://e-commerce-store-backend-gosj.onrender.com/api)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

// Attach the auth token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
