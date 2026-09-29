import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/components/utils/axiosInstance";

export default function WelcomePage() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("Utilisateur");
  const [userImage, setUserImage] = useState("/images/default-avatar.png");
  const [progress, setProgress] = useState(0);
  const [userLoaded, setUserLoaded] = useState(false);

  // =====================================================
  // CHARGEMENT DE L'UTILISATEUR
  // =====================================================

  useEffect(() => {
    let cancelled = false;

    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("🔐 Token présent :", !!token);

        if (!token) {
          navigate("/login", {
            replace: true,
          });

          return;
        }

        console.log("👤 Chargement de l'utilisateur...");

        const response = await axiosInstance.get("/user");

        console.log("📦 Réponse complète :", response.data);

        if (cancelled) return;

        const user = response.data?.user;

        console.log("👤 Utilisateur récupéré :", user);

        if (!user) {
          console.error("❌ Aucun utilisateur dans response.data.user");

          return;
        }

        // =================================================
        // NOM
        // =================================================

        const name = user.name || "Utilisateur";

        // =================================================
        // PHOTO
        // =================================================

        const imageUrl =
          user.image_url || user.image || "/images/default-avatar.png";

        console.log("👤 Nom :", name);

        console.log("🖼️ Photo :", imageUrl);

        setUserName(name);
        setUserImage(imageUrl);

        // Sauvegarde locale
        localStorage.setItem("userName", name);

        localStorage.setItem("userImage", imageUrl);

        localStorage.setItem("user", JSON.stringify(user));

        // IMPORTANT :
        // l'utilisateur est maintenant complètement chargé
        setUserLoaded(true);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("❌ Erreur récupération utilisateur :", error);

        if (error?.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("userName");
          localStorage.removeItem("userImage");

          navigate("/login", {
            replace: true,
          });
        }
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
    // NE PAS commencer tant que l'utilisateur
    // n'est pas récupéré
    if (!userLoaded) {
      return;
    }

    console.log("✅ Utilisateur chargé → démarrage de la progression");

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
  }, [userLoaded, navigate]);

  // =====================================================
  // AFFICHAGE
  // =====================================================

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600 text-white">
      <div className="bg-white shadow-2xl rounded-2xl p-8 text-center text-gray-800 w-[90%] max-w-md">
        {/* PHOTO */}

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

        {/* NOM */}

        <h2 className="text-2xl font-bold mb-4">Bienvenue {userName}</h2>

        {/* MESSAGE */}

        <p className="text-lg mb-6">
          {!userLoaded
            ? "Chargement de votre profil…"
            : "Veuillez patienter, préparation de votre espace…"}
        </p>

        {/* PROGRESSION */}

        <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        {/* POURCENTAGE */}

        <p className="text-sm text-gray-500 mb-4">{progress}%</p>

        {/* LOADER */}

        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" />
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-150" />
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-300" />
        </div>
      </div>
    </div>
  );
}
