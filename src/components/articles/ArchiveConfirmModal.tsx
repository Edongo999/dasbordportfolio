import React, { useEffect, useState } from "react";
import {
  Archive,
  ArchiveRestore,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  AlertTriangle,
} from "lucide-react";
import Modal from "../Modal";
import { ArticleManage } from "@/components/types/ArticleManage";

interface ArchiveConfirmModalProps {
  open: boolean;
  onClose: () => void;
  article: ArticleManage | null;
  onArchive: (id: number) => Promise<void>;
  onUnarchive: (id: number) => Promise<void>;
}

export default function ArchiveConfirmModal({
  open,
  onClose,
  article,
  onArchive,
  onUnarchive,
}: ArchiveConfirmModalProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
    }
  }, [open]);

  if (!article) return null;

  const isArchived = article.archived;

  const handleConfirm = async () => {
    if (loading) return;

    try {
      setLoading(true);

      // Petit délai visuel
      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (isArchived) {
        await onUnarchive(article.id);
      } else {
        await onArchive(article.id);
      }

      onClose();
    } catch (error) {
      console.error(
        isArchived ? "Erreur désarchivage :" : "Erreur archivage :",
        error,
      );

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
              <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  {isArchived ? (
                    <ArchiveRestore size={22} className="text-blue-600" />
                  ) : (
                    <Archive size={22} className="text-blue-600" />
                  )}
                </div>
              </div>

              {/* TITRE */}
              <h3 className="text-lg font-bold text-gray-800">
                {isArchived
                  ? "Désarchiver cet article ?"
                  : "Archiver cet article ?"}
              </h3>

              {/* DESCRIPTION */}
              <p className="mx-auto mt-1.5 max-w-xs text-sm leading-5 text-gray-500">
                {isArchived
                  ? "L’article sera de nouveau disponible dans vos articles actifs."
                  : "L’article sera déplacé dans vos articles archivés."}
              </p>

              {/* BOUTONS */}
              <div className="mt-5 flex justify-center gap-3">
                {/* ANNULER */}
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
                  active:scale-95
                "
                >
                  Annuler
                </button>

                {/* CONFIRMER */}
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-5
                  py-2
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  shadow-blue-200
                  transition-all
                  duration-200
                  hover:bg-blue-700
                  active:scale-95
                "
                >
                  {isArchived ? (
                    <ArchiveRestore size={15} />
                  ) : (
                    <Archive size={15} />
                  )}

                  {isArchived ? "Désarchiver" : "Archiver"}
                </button>
              </div>
            </div>
          ) : (
            /* =================================================
             OPÉRATION EN COURS
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
                  border-blue-100
                "
                />

                {/* Cercle animé */}
                <div
                  className="
                  absolute
                  inset-0
                  animate-spin
                  rounded-full
                  border-4
                  border-transparent
                  border-t-blue-600
                  border-r-blue-500
                "
                />

                {/* ICÔNE CENTRALE */}
                {isArchived ? (
                  <ArchiveRestore size={20} className="text-blue-600" />
                ) : (
                  <Archive size={20} className="text-blue-600" />
                )}
              </div>

              {/* TITRE */}
              <h3 className="text-lg font-bold text-gray-800">
                {isArchived ? "Désarchivage en cours" : "Archivage en cours"}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-1 text-sm text-gray-500">
                {isArchived
                  ? "Restauration de l’article..."
                  : "Déplacement de l’article..."}
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
