import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Modal from "../Modal";

import { useUser } from "@/Hook/useUser";
import { useAuth } from "@/types/useAuth";

export default function HeaderLogout() {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const { user } = useUser();
  const { logout } = useAuth();

  const navigate = useNavigate();

  const userName = user?.name || "Utilisateur";

  const handleLogout = async () => {
    if (loadingLogout) return;

    setLoadingLogout(true);

    toast.loading(`Veuillez patienter ${userName}…`, {
      id: "logout",
    });

    try {
      await logout();

      toast.dismiss("logout");

      toast.success("Déconnexion réussie !");

      setOpenLogoutModal(false);

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);

      toast.dismiss("logout");

      toast.error("Impossible de vous déconnecter.");
    } finally {
      setLoadingLogout(false);
    }
  };

  return (
    <>
      {/* =========================
          BOUTON DÉCONNEXION
      ========================== */}

      <button
        type="button"
        onClick={() => setOpenLogoutModal(true)}
        aria-label="Déconnexion"
        className="
          hidden sm:flex
          h-10 w-10
          items-center justify-center
          rounded-xl
          border border-red-100
          bg-red-50
          text-red-500
          transition-all duration-200
          hover:-translate-y-0.5
          hover:border-red-200
          hover:bg-red-500
          hover:text-white
        "
      >
        <LogOut size={17} />
      </button>

      {/* =========================
          MODAL DÉCONNEXION
      ========================== */}

      <Modal
        open={openLogoutModal}
        onClose={() => {
          if (!loadingLogout) {
            setOpenLogoutModal(false);
          }
        }}
        title="Confirmation de déconnexion"
      >
        <div className="flex flex-col gap-5">
          {/* Message */}

          <div
            className="
              rounded-xl
              border border-red-100
              bg-red-50
              p-4
            "
          >
            <div className="flex gap-3">
              <div
                className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-lg
                  bg-red-100
                  text-red-500
                "
              >
                <LogOut size={18} />
              </div>

              <div>
                <p className="font-semibold text-gray-800">Se déconnecter ?</p>

                <p className="mt-1 text-sm text-gray-500">
                  Vous allez être redirigé vers la page de connexion.
                </p>
              </div>
            </div>
          </div>

          {/* Boutons */}

          <div className="flex justify-end gap-3">
            {/* Annuler */}

            <button
              type="button"
              onClick={() => setOpenLogoutModal(false)}
              disabled={loadingLogout}
              className="
                rounded-xl
                border border-gray-200
                bg-white
                px-4 py-2.5
                text-sm
                font-semibold
                text-gray-600
                transition
                hover:bg-gray-50
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Annuler
            </button>

            {/* Déconnexion */}

            <button
              type="button"
              onClick={handleLogout}
              disabled={loadingLogout}
              className="
                flex
                min-w-28
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-red-500
                to-rose-600
                px-4 py-2.5
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-red-500/20
                transition-all
                hover:-translate-y-0.5
                hover:shadow-red-500/30
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {loadingLogout ? (
                <motion.span
                  className="
                    h-4 w-4
                    rounded-full
                    border-2
                    border-white
                    border-t-transparent
                  "
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                  }}
                />
              ) : (
                <>
                  <LogOut size={16} />
                  Déconnexion
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
