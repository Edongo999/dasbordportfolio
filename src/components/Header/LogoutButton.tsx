import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    setLoading(true);

    setTimeout(() => {
      localStorage.removeItem("token");
      onLogout();
      setLoading(false);
      setSuccess(true);

      // ✅ petit délai pour afficher "Déconnexion réussie"
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
        navigate("/login", { replace: true });
      }, 1500);
    }, 2000);
  };

  return (
    <>
      {/* ✅ Bouton compact */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Déconnexion"
        className="p-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        <LogOut size={16} />
      </button>

      {/* ✅ Modal de confirmation */}
      <Modal
        open={open}
        onClose={() => !loading && !success && setOpen(false)}
        title="Confirmation de déconnexion"
      >
        <div className="flex flex-col gap-4">
          {loading ? (
            // ✅ État "Veuillez patienter"
            <div className="flex flex-col items-center gap-3">
              <motion.span
                className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
              <p className="text-gray-700 font-medium">
                Veuillez patienter Frank Landry…
              </p>
            </div>
          ) : success ? (
            // ✅ État "Déconnexion réussie"
            <div className="flex flex-col items-center gap-3">
              <p className="text-green-600 font-semibold">
                ✅ Déconnexion réussie !
              </p>
            </div>
          ) : (
            // ✅ État initial : confirmation
            <>
              <p className="text-gray-700">
                Voulez-vous vraiment vous déconnecter ?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                >
                  Non
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Oui
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default LogoutButton;
