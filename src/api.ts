import axios from "axios";

// Ensure the backend URL includes the protocol
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const baseURL = backendURL.startsWith("http") ? backendURL : `https://${backendURL}`;

const api = axios.create({
  baseURL, // Use the corrected baseURL
  withCredentials: true, // Ensures cookies (if using authentication)
});

console.log("Base URL:", api.defaults.baseURL); // Debugging: Verify the baseURL

export default api;