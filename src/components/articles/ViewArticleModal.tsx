import React from "react";
import Modal from "../Modal";
import { ArticleManage } from "@/components/types/ArticleManage";

interface ViewArticleModalProps {
  open: boolean;
  onClose: () => void;
  article: ArticleManage | null;
}

const getImageUrl = (image: string | null | undefined) => {
  if (!image) return "";

  // L'API renvoie déjà une URL complète
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  // L'API renvoie uniquement le chemin de l'image
  return `https://laravel-backend-portfolio.onrender.com/storage/${image}`;
};

const ViewArticleModal: React.FC<ViewArticleModalProps> = ({
  open,
  onClose,
  article,
}) => {
  if (!article) return null;

  return (
    <Modal open={open} onClose={onClose} title="Détails de l’article">
      <div className="space-y-4">
        {/* Titre */}
        <h3 className="text-xl font-bold text-gray-900 break-words whitespace-normal leading-snug">
          {article.title}
        </h3>

        {/* Image */}
        {article.image && (
          <img
            src={getImageUrl(article.image)}
            alt={article.title}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        )}

        {/* Contenu */}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line break-words max-w-full overflow-y-auto max-h-[70vh]">
          {article.content}
        </p>

        {/* Date */}
        <span className="text-sm text-gray-500">
          Publié le {new Date(article.created_at).toLocaleDateString("fr-FR")}
        </span>
      </div>
    </Modal>
  );
};

export default ViewArticleModal;
