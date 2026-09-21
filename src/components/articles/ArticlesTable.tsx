import React from "react";
import { ArticleManage } from "@/components/types/ArticleManage";
import {
  Archive,
  Edit,
  RotateCcw,
  Trash2,
  Eye,
  CalendarDays,
  Clock3,
} from "lucide-react";
import Pagination from "@/components/Pagination";

interface ArticlesTableProps {
  articles: {
    data: ArticleManage[];
    current_page: number;
    last_page: number;
  };
  onEdit: (article: ArticleManage) => void;
  onDelete: (article: ArticleManage) => void;
  onArchive: (article: ArticleManage) => void;
  onUnarchive: (article: ArticleManage) => void;
  onPageChange: (page: number) => void;
  onView: (article: ArticleManage) => void;
}

export default function ArticlesTable({
  articles,
  onEdit,
  onDelete,
  onArchive,
  onUnarchive,
  onPageChange,
  onView,
}: ArticlesTableProps) {
  const displayedArticles = articles.data;

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                ID
              </th>

              <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                Titre
              </th>

              <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                Image
              </th>

              <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                Contenu
              </th>

              <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                Statut
              </th>

              <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                Dates
              </th>

              <th className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {displayedArticles.map((article) => (
              <tr
                key={article.id}
                className="border-b border-gray-100 transition-colors duration-200 last:border-0 hover:bg-blue-50/40"
              >
                {/* ID */}
                <td className="px-3 py-3">
                  <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg bg-gray-100 px-2 text-xs font-bold text-gray-600">
                    #{article.id}
                  </span>
                </td>

                {/* TITRE */}
                <td
                  className="max-w-[160px] cursor-pointer px-3 py-3"
                  onClick={() => onView(article)}
                  title={article.title}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Eye size={14} />
                    </div>

                    <span className="truncate text-sm font-semibold text-gray-800 transition-colors hover:text-blue-600">
                      {article.title.length > 15
                        ? article.title.slice(0, 15) + "..."
                        : article.title}
                    </span>
                  </div>
                </td>

                {/* IMAGE */}
                <td
                  className="cursor-pointer px-3 py-3"
                  onClick={() => onView(article)}
                >
                  {article.image ? (
                    <img
                      src={`http://127.0.0.1:8000/storage/${article.image}`}
                      alt={article.title}
                      className="h-12 w-14 rounded-xl object-cover shadow-sm transition-transform duration-200 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-12 w-14 items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-400">
                      —
                    </div>
                  )}
                </td>

                {/* CONTENU */}
                <td
                  className="max-w-[220px] cursor-pointer px-3 py-3 text-sm text-gray-600"
                  onClick={() => onView(article)}
                  title={article.content}
                >
                  <span className="block truncate transition-colors hover:text-blue-600">
                    {article.content.length > 25
                      ? article.content.slice(0, 25) + "..."
                      : article.content}
                  </span>
                </td>

                {/* STATUT */}
                <td className="px-3 py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      article.archived
                        ? "bg-gray-100 text-gray-600"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        article.archived ? "bg-gray-400" : "bg-green-500"
                      }`}
                    />

                    {article.archived ? "Archivé" : "Actif"}
                  </span>
                </td>

                {/* DATES */}
                <td className="w-[190px] px-3 py-3">
                  <div className="flex flex-col gap-2">
                    {/* Créé */}
                    <div className="flex items-start gap-2">
                      <CalendarDays
                        size={14}
                        className="mt-0.5 shrink-0 text-green-500"
                      />

                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase text-gray-400">
                          Créé le
                        </p>

                        <p className="text-[11px] font-medium text-gray-600">
                          {new Date(article.created_at).toLocaleString(
                            "fr-FR",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Modifié */}
                    {article.updated_at !== article.created_at && (
                      <div className="flex items-start gap-2">
                        <Clock3
                          size={14}
                          className="mt-0.5 shrink-0 text-blue-500"
                        />

                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase text-gray-400">
                            Modifié le
                          </p>

                          <p className="text-[11px] font-medium text-gray-600">
                            {new Date(article.updated_at).toLocaleString(
                              "fr-FR",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </td>

                {/* ACTIONS */}
                <td className="px-3 py-3">
                  <div className="flex items-center justify-center gap-1.5">
                    {/* Modifier */}
                    <button
                      type="button"
                      onClick={() => onEdit(article)}
                      disabled={article.archived}
                      title="Modifier"
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                        article.archived
                          ? "cursor-not-allowed bg-gray-100 text-gray-300"
                          : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
                      }`}
                    >
                      <Edit size={14} />
                    </button>

                    {/* Supprimer */}
                    <button
                      type="button"
                      onClick={() => onDelete(article)}
                      title="Supprimer"
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-all hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={14} />
                    </button>

                    {/* Archiver */}
                    <button
                      type="button"
                      onClick={() => onArchive(article)}
                      disabled={article.archived}
                      title="Archiver"
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                        article.archived
                          ? "cursor-not-allowed bg-gray-100 text-gray-300"
                          : "bg-yellow-50 text-yellow-600 hover:bg-yellow-500 hover:text-white"
                      }`}
                    >
                      <Archive size={14} />
                    </button>

                    {/* Désarchiver */}
                    <button
                      type="button"
                      onClick={() => onUnarchive(article)}
                      disabled={!article.archived}
                      title="Désarchiver"
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                        !article.archived
                          ? "cursor-not-allowed bg-gray-100 text-gray-300"
                          : "bg-green-50 text-green-600 hover:bg-green-500 hover:text-white"
                      }`}
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-3">
        <Pagination
          currentPage={articles.current_page}
          totalPages={articles.last_page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
