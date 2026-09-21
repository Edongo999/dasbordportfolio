import React from "react";
import StatCard from "@/components/Dashboard/StatCard";
import { FileText, Layers } from "lucide-react";

interface Stats {
  totalArticles: number;
  categoriesCount: number;
  articlesThisMonth: number;
}

interface StatCardSectionProps {
  stats: Stats | null;
}

const StatCardSection: React.FC<StatCardSectionProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <StatCard
        title="Articles publiés"
        value={String(stats?.totalArticles ?? 0)}
        color="yellow"
        Icon={FileText}
      />

      <StatCard
        title="Catégories"
        value={String(stats?.categoriesCount ?? 0)}
        color="blue"
        Icon={Layers}
      />

      <StatCard
        title="Articles ce mois"
        value={String(stats?.articlesThisMonth ?? 0)}
        color="green"
        Icon={FileText}
      />
    </div>
  );
};

export default StatCardSection;
