import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/components/utils/axiosInstance";

export default function WelcomePage() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("Utilisateur");
  const [userImage, setUserImage] = useState("/images/default-avatar.png");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadUser = async () => {
      try {
        // =====================================================
        // RÉCUPÉRER LE TOKEN
        // =====================================================

        const token = localStorage.getItem("token");

        console.log("Token présent :", !!token);

        if (!token) {
          console.log("Aucun token → retour login");
          navigate("/login", { replace: true });
          return;
        }

        // =====================================================
        // CONFIGURER AXIOS AVEC LE TOKEN
        // =====================================================

        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${token}`;

        // =====================================================
        // RÉCUPÉRER L'UTILISATEUR CONNECTÉ
        // =====================================================

        console.log("Chargement de l'utilisateur...");

        const response = await axiosInstance.get("/user");

        console.log("Utilisateur reçu :", response.data);

        if (cancelled) return;

        const user = response.data;

        // =====================================================
        // NOM
        // =====================================================

        setUserName(user.name || "Utilisateur");

        localStorage.setItem("userName", user.name || "Utilisateur");

        // =====================================================
        // IMAGE
        // =====================================================
        let imageUrl = "/images/default-avatar.png";

        // Essayer d'abord depuis localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.image_url) {
            imageUrl = parsedUser.image_url;
          }
        }

        // Sinon, utiliser la réponse API
        if (user.image_url) {
          imageUrl = user.image_url;
        }

        console.log("URL finale de l'image :", imageUrl);

        setUserImage(imageUrl);
        localStorage.setItem("userImage", imageUrl);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Erreur récupération utilisateur :", error);

        // =====================================================

        // =====================================================
        // SI LE TOKEN EST INVALIDE
        // =====================================================

        if (error?.response?.status === 401) {
          console.log("Token invalide ou expiré → suppression du token");

          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login", {
            replace: true,
          });

          return;
        }

        // Pour les autres erreurs, on ne détruit PAS
        // immédiatement le token.
        console.error("Le serveur a rencontré une erreur.");
      }
    };

    loadUser();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  // =====================================================
  // PROGRESSION
  // =====================================================

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((previous) => {
        const next = previous + 10;

        if (next >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            navigate("/dashboard", {
              replace: true,
            });
          }, 100);

          return 100;
        }

        return next;
      });
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  // =====================================================
  // AFFICHAGE
  // =====================================================

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600 text-white">
      <div className="bg-white shadow-2xl rounded-2xl p-8 text-center text-gray-800 w-[90%] max-w-md">
        {/* =================================================
            PHOTO
        ================================================= */}

        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full border-4 border-blue-600 overflow-hidden shadow-lg">
            <img
              src={userImage}
              alt={`Photo de profil de ${userName}`}
              className="w-full h-full object-cover"
              onError={(event) => {
                event.currentTarget.src = "/images/default-avatar.png";
              }}
            />
          </div>
        </div>

        {/* =================================================
            NOM
        ================================================= */}

        <h2 className="text-2xl font-bold mb-4">Bienvenue {userName}</h2>

        {/* =================================================
            MESSAGE
        ================================================= */}

        <p className="text-lg mb-6">
          Veuillez patienter, préparation de votre espace…
        </p>

        {/* =================================================
            BARRE DE PROGRESSION
        ================================================= */}

        <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        {/* =================================================
            POURCENTAGE
        ================================================= */}

        <p className="text-sm text-gray-500 mb-4">{progress}%</p>

        {/* =================================================
            LOADER
        ================================================= */}

        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" />

          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-150" />

          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-300" />
        </div>
      </div>
    </div>
  );
}
