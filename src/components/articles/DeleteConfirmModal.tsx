import React, { useEffect, useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import Modal from "../Modal";

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  articleId: number | null;
  onConfirm: (id: number) => Promise<void>;
}

export default function DeleteConfirmModal({
  open,
  onClose,
  articleId,
  onConfirm,
}: DeleteConfirmModalProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
    }
  }, [open]);

  const handleDelete = async () => {
    if (articleId === null || loading) return;

    try {
      setLoading(true);

      // Petit délai pour rendre l'action visuellement plus naturelle
      await new Promise((resolve) => setTimeout(resolve, 1200));

      await onConfirm(articleId);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={loading ? () => {} : onClose} title="">
      <div className="-translate-y-3 px-1 py-1">
        <div className="px-1 py-1">
          {!loading ? (
            /* =================================================
             CONFIRMATION
          ================================================= */
            <div className="text-center">
              {/* ICÔNE */}
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <AlertTriangle size={22} className="text-red-600" />
                </div>
              </div>

              {/* TITRE */}
              <h3 className="text-lg font-bold text-gray-800">
                Supprimer cet article ?
              </h3>

              {/* DESCRIPTION */}
              <p className="mx-auto mt-1.5 max-w-xs text-sm leading-5 text-gray-500">
                Cette action est définitive. L’article sera supprimé de votre
                espace.
              </p>

              {/* BOUTONS */}
              <div className="mt-5 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-5
                  py-2
                  text-sm
                  font-semibold
                  text-gray-600
                  shadow-sm
                  transition-all
                  duration-200
                  hover:bg-gray-50
                "
                >
                  Annuler
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-red-600
                  px-5
                  py-2
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  shadow-red-200
                  transition-all
                  duration-200
                  hover:bg-red-700
                  active:scale-95
                "
                >
                  <Trash2 size={15} />
                  Supprimer
                </button>
              </div>
            </div>
          ) : (
            /* =================================================
             SUPPRESSION EN COURS
          ================================================= */
            <div className="flex flex-col items-center justify-center py-3 text-center">
              {/* LOADER UNIQUE */}
              <div className="relative mb-4 flex h-16 w-16 items-center justify-center">
                {/* Cercle fixe */}
                <div
                  className="
                  absolute
                  inset-0
                  rounded-full
                  border-4
                  border-red-100
                "
                />

                {/* Cercle qui tourne */}
                <div
                  className="
                  absolute
                  inset-0
                  animate-spin
                  rounded-full
                  border-4
                  border-transparent
                  border-t-red-600
                  border-r-red-500
                "
                />

                {/* Icône au centre */}
                <Trash2 size={20} className="text-red-600" />
              </div>

              {/* TITRE */}
              <h3 className="text-lg font-bold text-gray-800">
                Suppression en cours
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-1 text-sm text-gray-500">
                Suppression de l’article...
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
