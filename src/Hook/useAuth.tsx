import { useState } from "react";
import axiosInstance from "@/components/utils/axiosInstance";

export const useAuth = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  // =====================================================
  // LOGIN
  // =====================================================

  const login = async (email: string, password: string) => {
    const res = await axiosInstance.post("/login", {
      email,
      password,
    });

    // ===================================================
    // RÉCUPÉRER LE TOKEN SANCTUM
    // ===================================================

    const token = res.data?.token;

    if (!token) {
      throw new Error("Aucun token d'authentification reçu du serveur.");
    }

    // ===================================================
    // STOCKER LE TOKEN
    // ===================================================

    localStorage.setItem("token", token);

    // ===================================================
    // RÉCUPÉRER L'UTILISATEUR CONNECTÉ
    // ===================================================

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
      // Même si le serveur répond avec une erreur,
      // on supprime le token localement.
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  // =====================================================
  // VÉRIFIER L'UTILISATEUR CONNECTÉ
  // =====================================================

  const checkUser = async () => {
    const token = localStorage.getItem("token");

    // Aucun token = aucune session locale
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await axiosInstance.get("/user");

      setUser(res.data?.user || null);
    } catch {
      // Token invalide, expiré ou révoqué
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return {
    user,
    login,
    logout,
    checkUser,
  };
};
