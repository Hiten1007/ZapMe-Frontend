import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000", // Use environment variable or default to localhost
  withCredentials: true, // Ensures cookies (if using authentication)
});

export default api;