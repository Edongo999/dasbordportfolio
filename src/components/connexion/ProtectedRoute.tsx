import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/Hook/useAuth"; // ✅ utilisation du hook

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, checkUser } = useAuth(); // ✅ logique centralisée
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      await checkUser(); // ✅ vérifie la session via /user
      setLoading(false);
    };
    verify();
  }, []);

  // Pendant que Laravel vérifie la session
  if (loading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="text-sm text-gray-500">
          Vérification de la session...
        </div>
      </div>
    );
  }

  // Session absente ou expirée
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Session valide
  return <>{children}</>;
}
