import axios from "axios";

const api = axios.create({
  baseURL: "https://laravel-backend-portfolio.onrender.com/api",
  headers: {
    Accept: "application/json",
  },
});

// =====================================================
// TOKEN BEARER
// =====================================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // =================================================
    // FORMDATA
    // =================================================

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =====================================================
// GESTION DES ERREURS 401
// =====================================================

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;