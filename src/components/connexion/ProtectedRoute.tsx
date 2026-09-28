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
  }, [checkUser]);

  // =====================================================
  // ÉCRAN DE CHARGEMENT
  // =====================================================
  if (loading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="text-sm text-gray-500">
          Vérification de l'authentification...
        </div>
      </div>
    );
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
