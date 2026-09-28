import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/Hook/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, checkUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        await checkUser();
      } finally {
        setLoading(false);
      }
    };

    verifyAuthentication();
  }, []);

  // =====================================================
  // VÉRIFICATION INITIALE
  // =====================================================

  if (loading) {
    return <div className="min-h-[100dvh] bg-white" />;
  }

  // =====================================================
  // UTILISATEUR NON AUTHENTIFIÉ
  // =====================================================

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // =====================================================
  // UTILISATEUR AUTHENTIFIÉ
  // =====================================================

  return <>{children}</>;
}
