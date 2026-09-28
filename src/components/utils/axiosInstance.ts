import axios from "axios";

const BACKEND_URL =
  "https://laravel-backend-portfolio.onrender.com";

const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api`,

  headers: {
    Accept: "application/json",
  },

  // =====================================================
  // AUTHENTIFICATION PAR COOKIE HTTPONLY
  // =====================================================
  // Le navigateur envoie automatiquement le cookie
  // de session Laravel.
  withCredentials: true,

  // =====================================================
  // CSRF SANCTUM
  // =====================================================
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

// =====================================================
// INTERCEPTOR REQUEST
// =====================================================
// Aucun token Bearer.
// Aucun localStorage.getItem("token").
//
// L'authentification repose maintenant uniquement
// sur les cookies gérés par Laravel/Sanctum.
axiosInstance.interceptors.request.use(
  (config) => {
    // Si on envoie un FormData, on laisse Axios/navigateur
    // définir automatiquement le Content-Type + boundary.
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { BACKEND_URL };

export default axiosInstance;