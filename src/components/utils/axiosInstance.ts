import axios from "axios";

const BACKEND_URL =
  "https://laravel-backend-portfolio.onrender.com";

const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api`,

  headers: {
    Accept: "application/json",
  },
});

// =====================================================
// INTERCEPTOR REQUEST
// =====================================================
// Récupère automatiquement le token Sanctum
// enregistré dans le localStorage et l'envoie
// dans le header Authorization.
//
// Authorization: Bearer <token>
// =====================================================

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // =================================================
    // FORMDATA
    // =================================================
    // On laisse Axios définir automatiquement
    // le Content-Type avec le boundary.
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { BACKEND_URL };

export default axiosInstance;