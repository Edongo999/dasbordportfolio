import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");

  console.log("ProtectedRoute - token :", token ? "PRÉSENT ✅" : "ABSENT ❌");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
