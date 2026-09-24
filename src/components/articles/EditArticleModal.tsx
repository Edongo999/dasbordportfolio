import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import Modal from "../Modal";
import toast from "react-hot-toast";
import { ArticleManage } from "@/components/types/ArticleManage";
import axiosInstance from "@/components/utils/axiosInstance";

interface PaginatedArticles {
  data: ArticleManage[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface EditArticleModalProps {
  open: boolean;
  onClose: () => void;
  article: ArticleManage | null;
  setArticles: React.Dispatch<React.SetStateAction<PaginatedArticles | null>>;
}

export default function EditArticleModal({
  open,
  onClose,
  article,
  setArticles,
}: EditArticleModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Tech",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>();

  // Loader de sauvegarde
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (article) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        title: article.title,
        content: article.content,
        category: article.category,
      });

      // L'API renvoie déjà une URL complète
      setImagePreview(article.image || undefined);

      setImageFile(null);
    }
  }, [article]);

  // Réinitialisation du loader lorsque le modal est fermé
  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
    }
  }, [open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (loading) return;

    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!article || loading) return;

    try {
      // Activation du loader
      setLoading(true);

      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("category", formData.category);

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      // =====================================================
      // MODIFICATION DE L'ARTICLE
      // =====================================================

      const response = await axiosInstance.post(
        `/articles/${article.id}?_method=PUT`,
        formDataToSend,
      );

      const updatedArticle = response.data.article;

      // Mise à jour immédiate de la liste des articles
      setArticles((prev) =>
        prev
          ? {
              ...prev,
              data: prev.data.map((a) =>
                a.id === article.id ? updatedArticle : a,
              ),
            }
          : prev,
      );

      // =====================================================
      // TRADUCTION
      // =====================================================
      // IMPORTANT :
      // On conserve exactement la logique de ton ancien code.
      // La traduction est lancée en arrière-plan.
      // On ne fait PAS await ici.

      axiosInstance
        .post(`/articles/${article.id}/translate`)
        .then(() => {
          console.log(
            `🌍 Article #${article.id} traduit en anglais avec succès.`,
          );
        })
        .catch((translationError) => {
          console.error("❌ Erreur traduction :", translationError);
        });

      // =====================================================
      // SUCCÈS
      // =====================================================

      toast.success("Article modifié avec succès !");

      // Fermeture automatique du modal
      onClose();
    } catch (err) {
      console.error("Erreur modification :", err);

      toast.error("Impossible de modifier l’article");

      // Retirer le loader uniquement en cas d'erreur
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={loading ? () => {} : onClose}
      title={loading ? "" : "Modifier l’article"}
    >
      <div className="flex flex-col gap-4">
        {!loading ? (
          <>
            {/* =================================================
                TITRE
            ================================================= */}

            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              className="rounded border px-3 py-2"
              placeholder="Titre"
            />

            {/* =================================================
                CONTENU
            ================================================= */}

            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: e.target.value,
                })
              }
              className="rounded border px-3 py-2"
              placeholder="Contenu"
            />

            {/* =================================================
                CATÉGORIE
            ================================================= */}

            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
              className="rounded border px-3 py-2"
            >
              <option value="Tech">Tech</option>
              <option value="Design">Design</option>
              <option value="Actu">Actu</option>
            </select>

            {/* =================================================
                IMAGE
            ================================================= */}

            {imagePreview ? (
              <div className="flex flex-col gap-2">
                <img
                  src={imagePreview}
                  alt="Aperçu"
                  className="h-32 w-32 rounded-lg object-cover shadow-md"
                />

                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(undefined);
                    setImageFile(null);
                  }}
                  className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
                  Supprimer l’image
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="rounded border px-3 py-2"
              />
            )}

            {/* =================================================
                SAUVEGARDER
            ================================================= */}

            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-4
                py-2
                font-semibold
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:bg-blue-700
                active:scale-95
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              <Save size={16} />
              Sauvegarder
            </button>
          </>
        ) : (
          /* =================================================
             MODIFICATION EN COURS
          ================================================= */

          <div className="flex flex-col items-center justify-center py-6 text-center">
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

              {/* Cercle qui tourne */}
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

              {/* Icône au centre */}
              <Save size={20} className="text-blue-600" />
            </div>

            {/* TITRE */}
            <h3 className="text-lg font-bold text-gray-800">
              Modification en cours
            </h3>

            {/* DESCRIPTION */}
            <p className="mt-1 text-sm text-gray-500">
              Enregistrement de l’article...
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
