import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function NavigationLoader() {
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-[2px] animate-fadeIn">
      <div className="flex flex-col items-center">
        {/* Loader */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-white/70" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-600 border-r-indigo-600" />

          <div className="h-3 w-3 rounded-full bg-indigo-600" />
        </div>

        {/* Message */}
        <div className="mt-5 rounded-xl bg-white/95 px-5 py-3 shadow-xl">
          <p className="text-sm font-semibold text-gray-700">
            Veuillez patienter...
          </p>
        </div>
      </div>
    </div>
  );
}
