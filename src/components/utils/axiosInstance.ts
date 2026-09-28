import axios from "axios";

const BACKEND_URL = "https://laravel-backend-portfolio.onrender.com";

const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    Accept: "application/json",
  },
});

// Ajout automatique du token Bearer
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Laisser Axios gérer automatiquement le Content-Type
    // pour les fichiers FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Gestion d'un token expiré/invalide
axiosInstance.interceptors.response.use(
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

export { BACKEND_URL };

export default axiosInstance;