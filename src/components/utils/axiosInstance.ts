import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://laravel-backend-portfolio.onrender.com/api", // ✅ URL publique Render
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// =====================================================
// AJOUT AUTOMATIQUE DU TOKEN
// =====================================================
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
