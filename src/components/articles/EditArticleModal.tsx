import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import axios from "axios";
import toast from "react-hot-toast";
import { ArticleManage } from "@/components/types/ArticleManage";

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

  useEffect(() => {
    if (article) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        title: article.title,
        content: article.content,
        category: article.category,
      });

      setImagePreview(
        article.image
          ? `https://laravel-backend-portfolio.onrender.com/storage/${article.image}`
          : undefined,
      );

      setImageFile(null);
    }
  }, [article]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!article) return;

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("category", formData.category);

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const token = localStorage.getItem("token");

      // =====================================================
      // 1️⃣ MODIFIER L'ARTICLE
      // =====================================================

      const response = await axios.post(
        `https://laravel-backend-portfolio.onrender.com/api/articles/${article.id}?_method=PUT`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const updatedArticle = response.data.article;

      // =====================================================
      // 2️⃣ METTRE À JOUR LE STATE IMMÉDIATEMENT
      // =====================================================

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
      // 3️⃣ LANCER LA TRADUCTION EN ANGLAIS
      //    SANS BLOQUER LA MODIFICATION
      // =====================================================

      axios
        .post(
          `https://laravel-backend-portfolio.onrender.com/api/articles/${article.id}/translate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          },
        )
        .then(() => {
          console.log(
            `🌍 Article #${article.id} traduit en anglais avec succès.`,
          );
        })
        .catch((translationError) => {
          console.error(
            "❌ Erreur lors de la traduction de l'article :",
            translationError,
          );
        });

      // =====================================================
      // 4️⃣ CONFIRMATION IMMÉDIATE
      // =====================================================

      toast.success("Article modifié avec succès !");

      onClose();
    } catch (err) {
      console.error("Erreur modification :", err);

      toast.error("Impossible de modifier l’article");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Modifier l’article">
      <div className="flex flex-col gap-4">
        {/* TITRE */}
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
          className="border rounded px-3 py-2"
          placeholder="Titre"
        />

        {/* CONTENU */}
        <textarea
          value={formData.content}
          onChange={(e) =>
            setFormData({
              ...formData,
              content: e.target.value,
            })
          }
          className="border rounded px-3 py-2"
          placeholder="Contenu"
        />

        {/* CATÉGORIE */}
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value,
            })
          }
          className="border rounded px-3 py-2"
        >
          <option value="Tech">Tech</option>
          <option value="Design">Design</option>
          <option value="Actu">Actu</option>
        </select>

        {/* IMAGE */}
        {imagePreview ? (
          <div className="flex flex-col gap-2">
            <img
              src={imagePreview}
              alt="Aperçu"
              className="w-32 h-32 object-cover rounded-lg shadow-md"
            />

            <button
              type="button"
              onClick={() => {
                setImagePreview(undefined);
                setImageFile(null);
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Supprimer l’image
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border rounded px-3 py-2"
          />
        )}

        {/* SAUVEGARDER */}
        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Sauvegarder
        </button>
      </div>
    </Modal>
  );
}
