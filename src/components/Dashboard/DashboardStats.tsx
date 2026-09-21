import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import axiosInstance from "@/components/utils/axiosInstance";

// =====================================================
// TYPES
// =====================================================

interface MonthlyData {
  month: string;
  articles: number;
}

interface CategoryData {
  category: string;
  count: number;
}

interface StatsResponse {
  totalArticles?: number;
  categoriesCount?: number;
  articlesThisMonth?: number;
  articlesByMonth?: MonthlyData[];
  articlesByCategory?: CategoryData[];
}

// =====================================================
// COMPONENT
// =====================================================

const DashboardStats: React.FC = () => {
  const [lineData, setLineData] = useState<MonthlyData[]>([]);
  const [barData, setBarData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // CHARGER LES STATISTIQUES
  // =====================================================

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const response =
          await axiosInstance.get<StatsResponse>("/articles/stats");

        setLineData(response.data.articlesByMonth ?? []);
        setBarData(response.data.articlesByCategory ?? []);
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques :", error);

        setLineData([]);
        setBarData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // =====================================================
  // AFFICHAGE
  // =====================================================

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
      {/* =================================================
          ARTICLES PAR MOIS
      ================================================= */}

      <div
        className="
          w-full
          rounded-xl
          bg-gray-800
          p-4
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-2xl
          md:p-6
        "
      >
        {/* HEADER */}

        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-yellow-400 md:text-lg">
              Articles par mois
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              Évolution des publications
            </p>
          </div>

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-yellow-400/10
              text-yellow-400
              shadow-sm
            "
          >
            ↗
          </div>
        </div>

        {/* GRAPH */}

        <div className="h-[220px] w-full">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <div
                className="
                  h-8
                  w-8
                  animate-spin
                  rounded-full
                  border-2
                  border-gray-600
                  border-t-yellow-400
                "
              />
            </div>
          ) : lineData.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <div className="mb-3 text-2xl text-gray-600">—</div>

              <p className="text-sm font-medium text-gray-400">
                Aucune donnée disponible
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Les publications apparaîtront ici.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#444"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fill: "#ccc",
                  }}
                />

                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fill: "#ccc",
                  }}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                  }}
                  labelStyle={{
                    color: "#9ca3af",
                    fontSize: "12px",
                    marginBottom: "4px",
                  }}
                  itemStyle={{
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: 700,
                  }}
                  cursor={{
                    stroke: "#666",
                    strokeWidth: 1,
                  }}
                  formatter={(value) => [
                    `${value} article${Number(value) > 1 ? "s" : ""}`,
                    "Publications",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="articles"
                  stroke="#facc15"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#facc15",
                    strokeWidth: 2,
                    stroke: "#1f2937",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* =================================================
          ARTICLES PAR CATÉGORIE
      ================================================= */}

      <div
        className="
          w-full
          rounded-xl
          bg-gray-800
          p-4
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-2xl
          md:p-6
        "
      >
        {/* HEADER */}

        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-yellow-400 md:text-lg">
              Articles par catégorie
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              Répartition des publications
            </p>
          </div>

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-blue-400/10
              text-blue-400
              shadow-sm
            "
          >
            ▥
          </div>
        </div>

        {/* GRAPH */}

        <div className="h-[220px] w-full">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <div
                className="
                  h-8
                  w-8
                  animate-spin
                  rounded-full
                  border-2
                  border-gray-600
                  border-t-blue-400
                "
              />
            </div>
          ) : barData.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <div className="mb-3 text-2xl text-gray-600">—</div>

              <p className="text-sm font-medium text-gray-400">
                Aucune donnée disponible
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Les catégories apparaîtront ici.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 5,
                }}
                barCategoryGap="30%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#444"
                  vertical={false}
                />

                <XAxis
                  dataKey="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fill: "#ccc",
                  }}
                />

                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fill: "#ccc",
                  }}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                  }}
                  labelStyle={{
                    color: "#9ca3af",
                    fontSize: "12px",
                    marginBottom: "4px",
                  }}
                  itemStyle={{
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: 700,
                  }}
                  cursor={{
                    fill: "#ffffff08",
                  }}
                  formatter={(value) => [
                    `${value} article${Number(value) > 1 ? "s" : ""}`,
                    "Publications",
                  ]}
                />

                <Bar
                  dataKey="count"
                  fill="#60a5fa"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={55}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
