// src/components/Header/LoaderButton.tsx
import React from "react";
import { motion } from "framer-motion";

interface LoaderButtonProps {
  loading: boolean;
  children: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
}

export default function LoaderButton({
  loading,
  children,
  type = "submit",
  className = "",
}: LoaderButtonProps) {
  return (
    <button
      type={type}
      disabled={loading}
      className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center ${className}`}
    >
      {loading ? (
        <motion.span
          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      ) : (
        children
      )}
    </button>
  );
}
