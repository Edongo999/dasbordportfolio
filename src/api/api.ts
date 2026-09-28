import axios from "axios";

const api = axios.create({
  baseURL: "https://laravel-backend-portfolio.onrender.com/api",

  // ✅ Autorise l'envoi/réception des cookies HttpOnly
  withCredentials: true,

  // ✅ Configuration CSRF Laravel
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

// ⚠️ Pour l'instant, on garde encore le token.
// On le supprimera après avoir validé l'authentification HttpOnly.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Gestion des erreurs 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;