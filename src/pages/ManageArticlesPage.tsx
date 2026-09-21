import React, { useState } from "react";

import ArticlesTable from "@/components/articles/ArticlesTable";
import EditArticleModal from "@/components/articles/EditArticleModal";
import DeleteConfirmModal from "@/components/articles/DeleteConfirmModal";
import ArchiveConfirmModal from "@/components/articles/ArchiveConfirmModal";
import ViewArticleModal from "@/components/articles/ViewArticleModal";

import { ArticleManage } from "@/components/types/ArticleManage";
import { PaginatedArticles } from "@/types/PaginatedArticles";

import { FileText } from "lucide-react";

import axiosInstance from "@/components/utils/axiosInstance";
import toast from "react-hot-toast";

interface ManageArticlesPageProps {
  articles: PaginatedArticles | null;

  setArticles: React.Dispatch<React.SetStateAction<PaginatedArticles | null>>;

  fetchArticles: (page?: number) => Promise<void>;
}

export default function ManageArticlesPage({
  articles,
  setArticles,
  fetchArticles,
}: ManageArticlesPageProps) {
  const [selectedArticle, setSelectedArticle] = useState<ArticleManage | null>(
    null,
  );

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openArchive, setOpenArchive] = useState(false);
  const [openView, setOpenView] = useState(false);

  // =====================================================
  // SUPPRESSION
  // =====================================================

  const handleDelete = async (id: number): Promise<void> => {
    if (!articles) return;

    try {
      console.log("🗑️ Suppression article :", id);

      await axiosInstance.delete(`/articles/${id}`);

      console.log("✅ Article supprimé");

      // Recharger les articles depuis Laravel
      await fetchArticles(articles.current_page);

      // Fermer le modal
      setOpenDelete(false);
      setSelectedArticle(null);

      // Feedback succès
      toast.success("Article supprimé avec succès.");
    } catch (error) {
      console.error("❌ Erreur suppression article :", error);

      // Feedback erreur
      toast.error("Impossible de supprimer l’article.");

      // Important : permet au modal de terminer son état loading
      throw error;
    }
  };

  // =====================================================
  // ARCHIVAGE
  // =====================================================

  const handleArchive = async (id: number): Promise<void> => {
    if (!articles) return;

    try {
      console.log("📦 Archivage article :", id);

      await axiosInstance.post(`/articles/${id}/archive`);

      console.log("✅ Article archivé");

      // Recharger les données
      await fetchArticles(articles.current_page);

      // Fermer le modal
      setOpenArchive(false);
      setSelectedArticle(null);

      // Feedback succès
      toast.success("Article archivé avec succès.");
    } catch (error) {
      console.error("❌ Erreur archivage article :", error);

      // Feedback erreur
      toast.error("Impossible d’archiver l’article.");

      throw error;
    }
  };

  // =====================================================
  // DÉSARCHIVAGE
  // =====================================================

  const handleUnarchive = async (id: number): Promise<void> => {
    if (!articles) return;

    try {
      console.log("♻️ Désarchivage article :", id);

      await axiosInstance.post(`/articles/${id}/unarchive`);

      console.log("✅ Article désarchivé");

      // Recharger les données
      await fetchArticles(articles.current_page);

      // Fermer le modal
      setOpenArchive(false);
      setSelectedArticle(null);

      // Feedback succès
      toast.success("Article désarchivé avec succès.");
    } catch (error) {
      console.error("❌ Erreur désarchivage article :", error);

      // Feedback erreur
      toast.error("Impossible de désarchiver l’article.");

      throw error;
    }
  };

  // =====================================================
  // AFFICHAGE
  // =====================================================

  return (
    <div className="flex-1 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8 shadow-lg">
      {/* =================================================
          TITRE
      ================================================= */}

      <div className="mb-6">
        <h2 className="mb-6 flex items-center justify-center gap-3 text-3xl font-extrabold text-gray-800">
          <FileText className="h-8 w-8 text-blue-600" />
          Gérer les articles
        </h2>
      </div>

      {/* =================================================
          TABLEAU
      ================================================= */}

      <div className="overflow-hidden rounded-lg shadow-md">
        {!articles ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <p className="text-gray-500">Chargement des articles...</p>
          </div>
        ) : articles.data.length === 0 ? (
          <div className="flex min-h-[250px] flex-col items-center justify-center gap-3">
            <FileText className="h-12 w-12 text-gray-300" />

            <p className="text-gray-500">Aucun article trouvé.</p>
          </div>
        ) : (
          <ArticlesTable
            articles={{
              data: articles.data,
              current_page: articles.current_page,
              last_page: articles.last_page,
            }}
            onEdit={(article) => {
              setSelectedArticle(article);
              setOpenEdit(true);
            }}
            onDelete={(article) => {
              setSelectedArticle(article);
              setOpenDelete(true);
            }}
            onArchive={(article) => {
              setSelectedArticle(article);
              setOpenArchive(true);
            }}
            onUnarchive={(article) => {
              setSelectedArticle(article);
              setOpenArchive(true);
            }}
            onView={(article) => {
              setSelectedArticle(article);
              setOpenView(true);
            }}
            onPageChange={(page) => {
              fetchArticles(page);
            }}
          />
        )}
      </div>

      {/* =================================================
          MODAL VISUALISATION
      ================================================= */}

      <ViewArticleModal
        open={openView}
        onClose={() => {
          setOpenView(false);
          setSelectedArticle(null);
        }}
        article={selectedArticle}
      />

      {/* =================================================
          MODAL MODIFICATION
      ================================================= */}

      <EditArticleModal
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
          setSelectedArticle(null);
        }}
        article={selectedArticle}
        setArticles={setArticles}
      />

      {/* =================================================
          MODAL SUPPRESSION
      ================================================= */}

      <DeleteConfirmModal
        open={openDelete}
        onClose={() => {
          setOpenDelete(false);
          setSelectedArticle(null);
        }}
        articleId={selectedArticle?.id ?? null}
        onConfirm={handleDelete}
      />

      {/* =================================================
          MODAL ARCHIVAGE
      ================================================= */}

      <ArchiveConfirmModal
        open={openArchive}
        onClose={() => {
          setOpenArchive(false);
          setSelectedArticle(null);
        }}
        article={selectedArticle}
        onArchive={handleArchive}
        onUnarchive={handleUnarchive}
      />
    </div>
  );
}
