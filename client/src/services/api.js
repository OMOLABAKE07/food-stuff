import axios from "axios";
import { useAuth } from "../Stores/auth";

// Create axios instance with proper defaults
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest", // This helps Laravel recognize AJAX requests
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common error responses
    if (error.response?.status === 401) {
      // Unauthorized - token might be invalid
      const authStore = useAuth();
      authStore.logout();
    }
    return Promise.reject(error);
  }
);

export default api;