import { useState } from "react";
import axiosInstance from "@/components/utils/axiosInstance";

export const useAuth = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  // =====================================================
  // LOGIN
  // =====================================================
  const login = async (email: string, password: string) => {
    const res = await axiosInstance.post("/login", { email, password });

    const token = res.data?.token;
    if (!token) {
      throw new Error("Aucun token d'authentification reçu du serveur.");
    }

    // Stocker le token
    localStorage.setItem("token", token);

    // Récupérer l'utilisateur connecté
    const userResponse = await axiosInstance.get("/user");
    setUser(userResponse.data?.user || null);

    return userResponse.data;
  };

  // =====================================================
  // LOGOUT
  // =====================================================
  const logout = async () => {
    try {
      await axiosInstance.post("/logout");
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  // =====================================================
  // CHECK USER
  // =====================================================
  const checkUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await axiosInstance.get("/user");
      setUser(res.data?.user || null);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return { user, login, logout, checkUser };
};
