import React, { useCallback, useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

import StatCardSection from "@/components/Dashboard/StatCardSection";
import DashboardStats from "@/components/Dashboard/DashboardStats";
import ArticleTable from "@/components/Dashboard/ArticleTable";

import ManageArticlesPage from "@/pages/ManageArticlesPage";

import LoginForm from "@/components/connexion/LoginForm";
import WelcomePage from "@/components/connexion/WelcomePage";
import ProtectedRoute from "@/components/connexion/ProtectedRoute";

import UserProvider from "@/Hook/UserProvider";
import { AuthProvider } from "@/components/connexion/AuthProvider";

import axiosInstance from "@/components/utils/axiosInstance";

import { ArticleManage } from "@/components/types/ArticleManage";
import NavigationLoader from "./components/Navigation/NavigationLoader";

// =====================================================
// TYPES
// =====================================================

interface PaginatedArticles {
  data: ArticleManage[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface Stats {
  totalArticles: number;
  categoriesCount: number;
  articlesThisMonth: number;
}

// =====================================================
// APP
// =====================================================

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [articles, setArticles] = useState<PaginatedArticles | null>(null);

  const [stats, setStats] = useState<Stats | null>(null);

  // =====================================================
  // ARTICLES
  // =====================================================

  const fetchArticles = useCallback(async (page = 1) => {
    try {
      console.log("📚 Chargement des articles...");

      const response = await axiosInstance.get(`/articles?page=${page}`);

      console.log("📚 Articles reçus :", response.data);

      setArticles(response.data);
    } catch (error) {
      console.error("❌ Erreur chargement articles :", error);
    }
  }, []);

  // =====================================================
  // STATISTIQUES
  // =====================================================

  const fetchStats = useCallback(async () => {
    try {
      console.log("📊 Chargement des statistiques...");

      const response = await axiosInstance.get("/articles/stats");

      console.log("📊 Statistiques reçues :", response.data);

      setStats(response.data);
    } catch (error) {
      console.error("❌ Erreur chargement statistiques :", error);
    }
  }, []);

  // =====================================================
  // ROUTER
  // =====================================================

  return (
    <Router>
      <NavigationLoader />
      <Toaster position="top-right" />

      <AuthProvider>
        <UserProvider>
          <Routes>
            {/* =================================================
                LOGIN
            ================================================= */}

            <Route path="/login" element={<LoginForm />} />

            {/* =================================================
                WELCOME
            ================================================= */}

            <Route path="/welcome" element={<WelcomePage />} />

            {/* =================================================
                DASHBOARD
            ================================================= */}

            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <DashboardContent
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                    articles={articles}
                    setArticles={setArticles}
                    stats={stats}
                    fetchArticles={fetchArticles}
                    fetchStats={fetchStats}
                  />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                404
            ================================================= */}

            <Route
              path="*"
              element={
                <div className="flex min-h-screen items-center justify-center">
                  <p className="text-gray-600">Page introuvable</p>
                </div>
              }
            />
          </Routes>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

// =====================================================
// DASHBOARD CONTENT
// =====================================================

interface DashboardContentProps {
  mobileOpen: boolean;

  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;

  articles: PaginatedArticles | null;

  setArticles: React.Dispatch<React.SetStateAction<PaginatedArticles | null>>;

  stats: Stats | null;

  fetchArticles: (page?: number) => Promise<void>;

  fetchStats: () => Promise<void>;
}

function DashboardContent({
  mobileOpen,
  setMobileOpen,

  articles,
  setArticles,

  stats,

  fetchArticles,
  fetchStats,
}: DashboardContentProps) {
  // =====================================================
  // CHARGEMENT GLOBAL
  // =====================================================

  useEffect(() => {
    console.log("🚀 DashboardContent : chargement initial");

    fetchArticles();
    fetchStats();
  }, [fetchArticles, fetchStats]);

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-gray-300">
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onRefresh={() => fetchArticles(articles?.current_page ?? 1)}
        onAddArticle={(article) => {
          if (!articles) {
            return;
          }

          const newArticle: ArticleManage = {
            ...article,
            image: article.image ?? null,
          };

          setArticles({
            ...articles,

            data: [newArticle, ...articles.data],

            total: articles.total + 1,
          });

          fetchStats();
        }}
      />

      {/* =================================================
          CONTENU
      ================================================= */}

      <div className="flex max-w-full flex-1 flex-col">
        <Header
          onToggleSidebar={() => setMobileOpen((previous) => !previous)}
        />

        <main className="mx-auto w-full max-w-7xl p-4 md:p-6">
          <Routes>
            {/* =================================================
                DASHBOARD HOME
            ================================================= */}

            <Route
              index
              element={<DashboardHome stats={stats} articles={articles} />}
            />

            {/* =================================================
                GESTION ARTICLES
            ================================================= */}

            <Route
              path="articles/manage"
              element={
                <ManageArticlesPage
                  articles={articles}
                  setArticles={setArticles}
                  fetchArticles={fetchArticles}
                />
              }
            />

            {/* =================================================
                PARAMÈTRES
            ================================================= */}

            <Route path="settings" element={<div>Paramètres</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// =====================================================
// DASHBOARD HOME
// =====================================================

interface DashboardHomeProps {
  stats: Stats | null;

  articles: PaginatedArticles | null;
}

function DashboardHome({ stats, articles }: DashboardHomeProps) {
  return (
    <>
      {/* STATISTIQUES */}

      {stats && <StatCardSection stats={stats} />}

      <DashboardStats />

      {/* ARTICLES */}

      {articles && <ArticleTable articles={articles.data} />}
    </>
  );
}
