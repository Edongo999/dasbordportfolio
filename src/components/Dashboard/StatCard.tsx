import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  color: "yellow" | "green" | "blue" | "red";
  Icon: React.ElementType;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color, Icon }) => {
  const colors: Record<
    StatCardProps["color"],
    {
      icon: string;
      iconBg: string;
      glow: string;
      line: string;
      badge: string;
      value: string;
    }
  > = {
    yellow: {
      icon: "text-yellow-600",
      iconBg: "bg-yellow-100",
      glow: "bg-yellow-400/20",
      line: "from-yellow-400 to-orange-400",
      badge: "bg-yellow-50 text-yellow-700",
      value: "text-yellow-600",
    },

    green: {
      icon: "text-emerald-600",
      iconBg: "bg-emerald-100",
      glow: "bg-emerald-400/20",
      line: "from-emerald-400 to-green-500",
      badge: "bg-emerald-50 text-emerald-700",
      value: "text-emerald-600",
    },

    blue: {
      icon: "text-blue-600",
      iconBg: "bg-blue-100",
      glow: "bg-blue-400/20",
      line: "from-blue-400 to-indigo-500",
      badge: "bg-blue-50 text-blue-700",
      value: "text-blue-600",
    },

    red: {
      icon: "text-red-600",
      iconBg: "bg-red-100",
      glow: "bg-red-400/20",
      line: "from-red-400 to-rose-500",
      badge: "bg-red-50 text-red-700",
      value: "text-red-600",
    },
  };

  const theme = colors[color];

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-6">
      {/* Glow décoratif */}
      <div
        className={`
          absolute -right-10 -top-10
          h-32 w-32 rounded-full
          blur-3xl
          ${theme.glow}
          transition-all duration-500
          group-hover:scale-150
        `}
      />

      {/* Ligne gradient supérieure */}
      <div
        className={`
          absolute left-0 right-0 top-0
          h-1
          bg-gradient-to-r
          ${theme.line}
        `}
      />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between">
        {/* Icône */}
        <div
          className={`
            flex h-12 w-12 items-center justify-center
            rounded-2xl
            ${theme.iconBg}
            transition-all duration-300
            group-hover:scale-110
            group-hover:rotate-3
          `}
        >
          {Icon && <Icon size={23} strokeWidth={2.2} className={theme.icon} />}
        </div>

        {/* Petit badge */}
        <div
          className={`
            rounded-full px-2.5 py-1
            text-[10px] font-bold uppercase tracking-wider
            ${theme.badge}
          `}
        >
          Statistique
        </div>
      </div>

      {/* Contenu */}
      <div className="relative z-10 mt-6">
        <p className="text-sm font-medium text-gray-500">{title}</p>

        <div className="mt-2 flex items-end justify-between gap-3">
          <p
            className={`
              text-3xl font-black tracking-tight
              md:text-4xl
              ${theme.value}
            `}
          >
            {value}
          </p>

          {/* Mini graphique décoratif */}
          <div className="flex items-end gap-1 pb-1 opacity-60">
            <span className="h-3 w-1.5 rounded-full bg-gray-200" />
            <span className="h-5 w-1.5 rounded-full bg-gray-300" />
            <span className="h-4 w-1.5 rounded-full bg-gray-300" />
            <span
              className={`
                h-7 w-1.5 rounded-full
                bg-gradient-to-t
                ${theme.line}
              `}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">
        <span
          className={`
            h-2 w-2 rounded-full
            bg-gradient-to-r
            ${theme.line}
          `}
        />

        <span className="text-xs font-medium text-gray-400">Vue globale</span>
      </div>

      {/* Effet lumineux au hover */}
      <div
        className={`
          pointer-events-none absolute
          -bottom-16 -right-16
          h-32 w-32 rounded-full
          opacity-0 blur-2xl
          transition-opacity duration-500
          group-hover:opacity-100
          ${theme.glow}
        `}
      />
    </div>
  );
};

export default StatCard;
