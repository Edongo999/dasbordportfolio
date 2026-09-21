import React from "react";
import Modal from "../Modal";
import { ArticleManage } from "@/components/types/ArticleManage";

interface ViewArticleModalProps {
  open: boolean;
  onClose: () => void;
  article: ArticleManage | null;
}

const ViewArticleModal: React.FC<ViewArticleModalProps> = ({
  open,
  onClose,
  article,
}) => {
  if (!article) return null;

  return (
    <Modal open={open} onClose={onClose} title="Détails de l’article">
      <div className="space-y-4">
        {/* ✅ Titre bien géré */}
        <h3 className="text-xl font-bold text-gray-900 break-words whitespace-normal leading-snug">
          {article.title}
        </h3>

        {article.image && (
          <img
            src={`http://127.0.0.1:8000/storage/${article.image}`}
            alt={article.title}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        )}

        {/* ✅ Contenu long bien géré */}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line break-words max-w-full overflow-y-auto max-h-[70vh]">
          {article.content}
        </p>

        <span className="text-sm text-gray-500">
          Publié le {new Date(article.created_at).toLocaleDateString("fr-FR")}
        </span>
      </div>
    </Modal>
  );
};

export default ViewArticleModal;
