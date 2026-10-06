import axios from "axios";

const BACKEND_URL = "https://laravel-backend-portfolio.onrender.com";

const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    Accept: "application/json",
  },
});

// =====================================================
// AJOUT AUTOMATIQUE DU TOKEN BEARER
// =====================================================
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Laisser Axios gérer automatiquement le Content-Type
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =====================================================
// GESTION DES ERREURS D'AUTHENTIFICATION
// =====================================================
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    if (status === 401) {
      const isLoginRequest =
        requestUrl === "/login" || requestUrl.endsWith("/login");

      if (!isLoginRequest) {
        // Token invalide ou expiré
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export { BACKEND_URL };
export default axiosInstance;
