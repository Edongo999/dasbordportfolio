import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "@/components/utils/axiosInstance";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAuthentication = async () => {
      try {
        // Laravel vérifie automatiquement le cookie
        // de session HttpOnly grâce à withCredentials: true.
        const response = await axiosInstance.get("/user");

        if (mounted) {
          console.log(
            "ProtectedRoute - session : AUTHENTIFIÉE ✅",
            response.data
          );

          setAuthenticated(true);
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        if (mounted) {
          console.log(
            "ProtectedRoute - session : NON AUTHENTIFIÉE ❌"
          );

          setAuthenticated(false);
        }
      } finally {
        if (mounted) {
          setCheckingAuth(false);
        }
      }
    };

    checkAuthentication();

    return () => {
      mounted = false;
    };
  }, []);

  // Pendant que Laravel vérifie la session
  if (checkingAuth) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="text-sm text-gray-500">
          Vérification de la session...
        </div>
      </div>
    );
  }

  // Session absente ou expirée
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  // Session valide
  return <>{children}</>;
}