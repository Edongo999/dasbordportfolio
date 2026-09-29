import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@/Hook/UserProvider";
import NavigationLoader from "@/components/Navigation/NavigationLoader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useUser();

  // =====================================================
  // VÉRIFICATION INITIALE
  // =====================================================

  if (loading) {
    return <NavigationLoader />;
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
