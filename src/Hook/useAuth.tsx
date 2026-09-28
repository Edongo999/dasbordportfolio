import { useState } from "react";
import axiosInstance, { BACKEND_URL } from "@/components/utils/axiosInstance";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  // Initialiser CSRF
  const initCsrf = async () => {
    await axiosInstance.get(`${BACKEND_URL}/sanctum/csrf-cookie`);
  };

  // Login
  const login = async (email: string, password: string) => {
    await initCsrf();
    await axiosInstance.post("/login", { email, password });
    const res = await axiosInstance.get("/user");
    setUser(res.data);
  };

  // Logout
  const logout = async () => {
    await axiosInstance.post("/logout");
    setUser(null);
  };

  // Vérifier session
  const checkUser = async () => {
    try {
      const res = await axiosInstance.get("/user");
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  return { user, login, logout, checkUser };
};
