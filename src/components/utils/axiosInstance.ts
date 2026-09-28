import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://laravel-backend-portfolio.onrender.com/api",

  headers: {
    Accept: "application/json",
  },

  // ✅ Autorise l'envoi et la réception des cookies Laravel
  withCredentials: true,
});

// =====================================================
// AJOUT AUTOMATIQUE DU TOKEN
// =====================================================
// ⚠️ Temporairement conservé pendant la migration.
// Nous le supprimerons une fois le cookie HttpOnly validé.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Si on envoie un FormData, on laisse Axios/navigateur
    // définir automatiquement le Content-Type + boundary.
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;