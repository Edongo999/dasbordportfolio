import React from "react";
import { LayoutDashboard, FileText, Settings, PlusCircle } from "lucide-react";

interface SidebarNavLinksProps {
  isOpen: boolean;
  onOpenPublish: () => void;
}

export default function SidebarNavLinks({
  isOpen,
  onOpenPublish,
}: SidebarNavLinksProps) {
  return (
    <nav className="flex flex-col gap-4">
      <a
        href="/dashboard"
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-600 hover:text-yellow-400"
      >
        <LayoutDashboard size={20} /> {isOpen && "Dashboard"}
      </a>

      <button
        onClick={onOpenPublish}
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-600 hover:text-yellow-400"
      >
        <PlusCircle size={20} /> {isOpen && "Publier un article"}
      </button>

      <a
        href="/dashboard/articles/manage"
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-600 hover:text-yellow-400"
      >
        <FileText size={20} /> {isOpen && "Gérer les articles"}
      </a>

      <a
        href="/dashboard/settings"
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-600 hover:text-yellow-400"
      >
        <Settings size={20} /> {isOpen && "Paramètres"}
      </a>
    </nav>
  );
}
