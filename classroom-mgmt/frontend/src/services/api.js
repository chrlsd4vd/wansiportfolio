import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Backend URL
});

// Request interceptor to add token (already set in AuthContext on login)
// But we also ensure token is present if available in localStorage (for page refresh)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
