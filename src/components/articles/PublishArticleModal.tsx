import React, { useState } from "react";
import Modal from "../Modal";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/articles/LoadingSpinner";
import SuccessMessage from "@/components/articles/SuccessMessage";
import ArticleForm from "@/components/articles/ArticlesForm";
import axiosInstance from "@/components/utils/axiosInstance";

interface PublishArticleModalProps {
  open: boolean;
  onClose: () => void;
  onPublish: (article: {
    id: number;
    title: string;
    content: string;
    category: string;
    image?: string | null;
    archived: number;
    created_at: string;
    updated_at: string;
  }) => void;
  onRefresh: () => void;
}

const PublishArticleModal: React.FC<PublishArticleModalProps> = ({
  open,
  onClose,
  onPublish,
  onRefresh,
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Tech");
  const [image, setImage] = useState<File | null>(null); // ✅ stocker directement le File
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("Tech");
    setImage(null);
    setError(null);
    setProgress(0);
    setSuccess(false);
    setLoading(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 2 * 1024 * 1024) {
        toast.error("L’image ne doit pas dépasser 2 Mo.");
        return;
      }

      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        toast.error("Seules les images JPG, PNG ou WebP sont autorisées.");
        return;
      }

      setError(null);
      setProgress(100); // ✅ on peut mettre directement 100% car le File est prêt
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);

      if (image) {
        formData.append("image", image); // ✅ envoyer directement le File
      }

      const token = localStorage.getItem("token");

      const response = await axiosInstance.post("/articles", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const newArticle = response.data.article;
      onPublish(newArticle);

      // Traduction en arrière-plan
      axiosInstance
        .post(
          `/articles/${newArticle.id}/translate`,
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
            `🌍 Article #${newArticle.id} traduit en anglais avec succès.`,
          );
        })
        .catch((translationError) => {
          console.error("❌ Erreur traduction :", translationError);
        });

      setSuccess(true);

      setTimeout(() => {
        onClose();
        resetForm();
        onRefresh();
      }, 1500);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{
        message?: string;
        errors?: Record<string, string[]>;
      }>;
      console.error("Erreur Axios complète :", axiosError);

      if (axiosError.response?.data) {
        const data = axiosError.response.data;
        if (data.message) {
          toast.error(data.message);
        } else if (data.errors) {
          const firstError = Object.values(data.errors)[0]?.[0];
          toast.error(firstError || "Impossible de publier l’article");
        } else {
          toast.error("Impossible de publier l’article");
        }
      } else {
        toast.error("Erreur réseau");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        resetForm();
        onClose();
      }}
      title="Publier un article"
    >
      <div className="w-full">
        {!loading && !success && (
          <div className="mb-5 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-gray-800">
                  Nouvelle publication
                </h3>
                <p className="mt-0.5 text-xs text-gray-500">
                  Partagez une actualité ou un projet avec vos visiteurs.
                </p>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50">
            <LoadingSpinner />
          </div>
        )}

        {success && (
          <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-green-100 bg-green-50/40">
            <SuccessMessage />
          </div>
        )}

        {!loading && !success && (
          <div className="rounded-xl border border-gray-100 bg-white">
            <ArticleForm
              title={title}
              content={content}
              category={category}
              image={image || undefined}
              progress={progress}
              error={error}
              onTitleChange={(e) => setTitle(e.target.value)}
              onContentChange={(e) => setContent(e.target.value)}
              onCategoryChange={(e) => setCategory(e.target.value)}
              onImageChange={handleImageChange}
              onImageRemove={() => {
                setImage(null);
                setProgress(0);
              }}
              onSubmit={handleSubmit}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PublishArticleModal;
