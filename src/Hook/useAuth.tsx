import { useState } from "react";
import axios from "axios";
import axiosInstance, { BACKEND_URL } from "@/components/utils/axiosInstance";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  // Initialiser CSRF correctement
  const initCsrf = async () => {
    await axios.get(`${BACKEND_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  };

  const login = async (email: string, password: string) => {
    await initCsrf();
    await axiosInstance.post("/login", { email, password });
    const res = await axiosInstance.get("/user");
    setUser(res.data);
  };

  const logout = async () => {
    await axiosInstance.post("/logout");
    setUser(null);
  };

  const checkUser = async () => {
    try {
      const res = await axiosInstance.get("/user");
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  // ✅ ajouter initCsrf dans le retour
  return { user, login, logout, checkUser, initCsrf };
};
