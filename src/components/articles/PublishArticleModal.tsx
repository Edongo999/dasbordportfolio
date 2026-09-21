import React, { useState } from "react";
import Modal from "../Modal";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import SuccessMessage from "./SuccessMessage";
import ArticleForm from "@/components/articles/ArticlesForm";

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
  const [image, setImage] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("Tech");
    setImage(undefined);
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
      setProgress(0);

      const reader = new FileReader();

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);

          setProgress(percent);
        }
      };

      reader.onloadend = () => {
        setImage(reader.result as string);
        setProgress(100);
      };

      reader.readAsDataURL(file);
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
        const blob = await fetch(image).then((res) => res.blob());

        formData.append("image", blob, "article.jpg");
      }

      const token = localStorage.getItem("token");

      // =====================================================
      // 1. PUBLIER L'ARTICLE
      // =====================================================
      const response = await axios.post(
        "http://127.0.0.1:8000/api/articles",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const newArticle = response.data.article;

      // =====================================================
      // 2. AJOUTER L'ARTICLE AU DASHBOARD
      // =====================================================
      onPublish(newArticle);

      // =====================================================
      // 3. LANCER LA TRADUCTION EN ARRIÈRE-PLAN
      // =====================================================
      axios
        .post(
          `http://127.0.0.1:8000/api/articles/${newArticle.id}/translate`,
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
          console.error(
            "❌ Erreur lors de la traduction de l'article :",
            translationError,
          );
        });

      // =====================================================
      // 4. AFFICHER LE SUCCÈS IMMÉDIATEMENT
      // =====================================================
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

          if (firstError) {
            toast.error(firstError);
          } else {
            toast.error("Impossible de publier l’article");
          }
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
        {/* En-tête visuel */}
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

        {/* Chargement */}
        {loading && (
          <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50">
            <LoadingSpinner />
          </div>
        )}

        {/* Succès */}
        {success && (
          <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-green-100 bg-green-50/40">
            <SuccessMessage />
          </div>
        )}

        {/* Formulaire */}
        {!loading && !success && (
          <div className="rounded-xl border border-gray-100 bg-white">
            <ArticleForm
              title={title}
              content={content}
              category={category}
              image={image}
              progress={progress}
              error={error}
              onTitleChange={(e) => setTitle(e.target.value)}
              onContentChange={(e) => setContent(e.target.value)}
              onCategoryChange={(e) => setCategory(e.target.value)}
              onImageChange={handleImageChange}
              onImageRemove={() => {
                setImage(undefined);
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
