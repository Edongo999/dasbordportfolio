import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  // Empêche le scroll de la page lorsque le modal est ouvert
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // Le portail permet de sortir le modal du Header
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Contenu du modal */}
          <motion.div
            className="
              relative
              z-10
              w-full
              max-w-[500px]
              rounded-2xl
              bg-white
              p-6
              text-gray-800
              shadow-2xl
            "
            initial={{
              opacity: 0,
              y: -30,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxHeight: "90vh",
            }}
          >
            {/* Header du modal */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold md:text-2xl">{title}</h2>

              <button
                onClick={onClose}
                className="
                  rounded-full
                  p-2
                  text-gray-500
                  transition
                  hover:bg-gray-100
                  hover:text-gray-700
                  hover:rotate-90
                "
              >
                <X size={22} strokeWidth={2.5} />
              </button>
            </div>

            {/* Contenu scrollable */}
            <div className="max-h-[70vh] overflow-y-auto pr-2">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
