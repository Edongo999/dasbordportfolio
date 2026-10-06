import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/Hook/useAuth";
import NavigationLoader from "@/components/Navigation/NavigationLoader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, checkUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      await checkUser();
      setLoading(false);
    };
    verify();
  }, [checkUser]);

  if (loading) {
    return <NavigationLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
