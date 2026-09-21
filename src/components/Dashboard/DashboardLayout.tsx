import React, { useCallback, useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar/Sidebar";
import ManageArticlesPage from "@/pages/ManageArticlesPage";

import { ArticleManage } from "@/components/types/ArticleManage";
import { PaginatedArticles } from "@/types/PaginatedArticles";

import axiosInstance from "@/components/utils/axiosInstance";

export default function DashboardLayout() {
  // =====================================================
  // ARTICLES
  // =====================================================

  const [articles, setArticles] = useState<PaginatedArticles | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  // =====================================================
  // CHARGEMENT DES ARTICLES
  // =====================================================

  const fetchArticles = useCallback(async (page: number = 1): Promise<void> => {
    try {
      console.log(" Chargement des articles...");

      const response = await axiosInstance.get(`/articles?page=${page}`);

      console.log("📦 Réponse articles :", response.data);

      setArticles(response.data);
    } catch (error) {
      console.error("❌ Erreur lors du chargement des articles :", error);
    }
  }, []);

  // =====================================================
  // CHARGEMENT INITIAL
  // =====================================================

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchArticles();
  }, [fetchArticles]);

  // =====================================================
  // AFFICHAGE
  // =====================================================

  return (
    <div className="flex min-h-screen bg-gray-300">
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onRefresh={() => {
          fetchArticles(articles?.current_page ?? 1);
        }}
        onAddArticle={(article) => {
          /*
           * Si les articles ne sont pas encore chargés,
           * on ne modifie pas le tableau.
           */
          if (!articles) {
            return;
          }

          const normalizedArticle: ArticleManage = {
            ...article,
            image: article.image ?? null,
          };

          /*
           * On conserve toute la pagination
           * et on ajoute simplement le nouvel article
           * au début du tableau.
           */
          setArticles({
            ...articles,

            data: [normalizedArticle, ...articles.data],

            total: articles.total + 1,
          });
        }}
      />

      {/* =================================================
          GESTION DES ARTICLES
      ================================================= */}

      <main className="min-w-0 flex-1">
        <ManageArticlesPage
          articles={articles}
          setArticles={setArticles}
          fetchArticles={fetchArticles}
        />
      </main>
    </div>
  );
}
