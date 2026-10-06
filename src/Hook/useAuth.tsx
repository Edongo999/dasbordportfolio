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
      throw new Error("Aucun token reçu du serveur.");
    }

    // Stocker le token
    localStorage.setItem("token", token);

    // Stocker l'utilisateur
    const authenticatedUser = res.data?.user || null;
    if (authenticatedUser) {
      localStorage.setItem("user", JSON.stringify(authenticatedUser));
    }

    setUser(authenticatedUser);

    return { ...res.data, user: authenticatedUser };
  };

  // =====================================================
  // LOGOUT
  // =====================================================
  const logout = async () => {
    try {
      await axiosInstance.post("/logout");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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
      const authenticatedUser = res.data?.user || res.data;
      setUser(authenticatedUser);

      if (authenticatedUser) {
        localStorage.setItem("user", JSON.stringify(authenticatedUser));
      }
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  return { user, login, logout, checkUser };
};
