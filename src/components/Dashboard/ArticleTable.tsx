import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  FileText,
  Clock,
  ChevronLeft,
  ChevronRight,
  Newspaper,
} from "lucide-react";

dayjs.extend(relativeTime);

interface Article {
  title: string;
  created_at: string;
  category: string;
}

interface ArticleTableProps {
  articles: Article[];
}

const ArticleTable: React.FC<ArticleTableProps> = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const itemsPerPage = 5;

  // Filtrage
  const filteredArticles =
    filter === "All" ? articles : articles.filter((a) => a.category === filter);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentArticles = filteredArticles.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden mt-5">
      {/* ================= HEADER ================= */}
      <div className="px-5 md:px-7 py-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Newspaper size={23} className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Liste des articles
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Gérez les actualités publiées sur votre portfolio
              </p>
            </div>
          </div>

          {/* Nombre d'articles */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600">
              {filteredArticles.length} article
              {filteredArticles.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* ================= FILTRES ================= */}
      <div className="px-5 md:px-7 py-5 bg-gray-50/70 border-b border-gray-100">
        <div className="flex flex-wrap gap-2">
          {["All", "Tech", "Design", "Actu"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setCurrentPage(1);
              }}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-200
                border
                ${
                  filter === cat
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
                }
              `}
            >
              {cat === "All" ? "Tous" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          {/* Header */}
          <thead>
            <tr className="border-b border-gray-100 bg-white">
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <FileText size={15} />
                  Article
                </div>
              </th>

              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Catégorie
                </div>
              </th>

              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <Clock size={15} />
                  Publication
                </div>
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {currentArticles.length > 0 ? (
              currentArticles.map((article, index) => (
                <tr
                  key={index}
                  className="
                    border-b border-gray-100
                    last:border-0
                    hover:bg-blue-50/40
                    transition-colors duration-200
                  "
                >
                  {/* ARTICLE */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                        flex h-10 w-10 shrink-0
                        items-center justify-center
                        rounded-lg
                        bg-gray-100
                        text-gray-500
                      "
                      >
                        <FileText size={18} />
                      </div>

                      <div className="min-w-0">
                        <p
                          className="
                          font-semibold
                          text-gray-800
                          text-sm md:text-base
                          truncate
                          max-w-[280px]
                        "
                        >
                          {article.title}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          Article #{startIndex + index + 1}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* CATEGORIE */}
                  <td className="px-6 py-5">
                    <span
                      className={`
                        inline-flex
                        items-center
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${
                          article.category === "Tech"
                            ? "bg-blue-50 text-blue-600"
                            : article.category === "Design"
                              ? "bg-purple-50 text-purple-600"
                              : "bg-orange-50 text-orange-600"
                        }
                      `}
                    >
                      {article.category}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div
                        className="
                        flex h-8 w-8
                        items-center justify-center
                        rounded-lg
                        bg-gray-100
                      "
                      >
                        <Clock size={15} className="text-gray-500" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {dayjs(article.created_at).fromNow()}
                        </p>

                        <p className="text-xs text-gray-400">
                          {dayjs(article.created_at).format("DD/MM/YYYY")}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-14 text-center">
                  <div className="flex flex-col items-center">
                    <div
                      className="
                      flex h-14 w-14
                      items-center justify-center
                      rounded-full
                      bg-gray-100
                      mb-3
                    "
                    >
                      <FileText size={24} className="text-gray-400" />
                    </div>

                    <p className="font-semibold text-gray-700">
                      Aucun article trouvé
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      Aucun article ne correspond à ce filtre.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 0 && (
        <div
          className="
          flex flex-col sm:flex-row
          items-center
          justify-between
          gap-4
          px-5 md:px-7
          py-4
          border-t border-gray-100
          bg-gray-50/50
        "
        >
          {/* Information */}
          <p className="text-sm text-gray-500">
            Affichage{" "}
            <span className="font-semibold text-gray-700">
              {startIndex + 1}
            </span>{" "}
            à{" "}
            <span className="font-semibold text-gray-700">
              {Math.min(startIndex + itemsPerPage, filteredArticles.length)}
            </span>{" "}
            sur{" "}
            <span className="font-semibold text-gray-700">
              {filteredArticles.length}
            </span>
          </p>

          {/* Boutons */}
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="
                flex items-center gap-1
                rounded-lg
                border border-gray-200
                bg-white
                px-3 py-2
                text-sm font-medium
                text-gray-600
                transition
                hover:border-blue-300
                hover:text-blue-600
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Précédent</span>
            </button>

            <div
              className="
              flex items-center
              rounded-lg
              bg-blue-600
              px-3 py-2
              text-sm
              font-semibold
              text-white
            "
            >
              {currentPage} / {totalPages}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="
                flex items-center gap-1
                rounded-lg
                border border-gray-200
                bg-white
                px-3 py-2
                text-sm font-medium
                text-gray-600
                transition
                hover:border-blue-300
                hover:text-blue-600
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <span className="hidden sm:inline">Suivant</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleTable;
