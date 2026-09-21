import React from "react";
import { Menu, LayoutDashboard } from "lucide-react";

import HeaderNotifications from "./HeaderNotifications";
import HeaderProfile from "./HeaderProfile";
import HeaderLogout from "./HeaderLogout";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header
      className="
        sticky top-0 z-40
        w-full
        border-b border-gray-200/70
        bg-white/85
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex h-[76px]
          items-center justify-between
          px-4 sm:px-6 lg:px-8
        "
      >
        {/* ================= GAUCHE ================= */}

        <div className="flex items-center gap-4">
          {/* Menu mobile */}

          <button
            onClick={onToggleSidebar}
            className="
              flex
              h-10 w-10
              items-center
              justify-center
              rounded-xl
              border border-gray-200
              bg-white
              text-gray-600
              shadow-sm
              transition-all
              hover:border-blue-300
              hover:bg-blue-50
              hover:text-blue-600
              md:hidden
            "
          >
            <Menu size={21} />
          </button>

          {/* Titre */}

          <div className="flex items-center gap-3">
            <div
              className="
                hidden sm:flex
                h-10 w-10
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-blue-600
                to-indigo-600
                text-white
                shadow-lg
                shadow-blue-500/20
              "
            >
              <LayoutDashboard size={19} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1
                  className="
                    text-lg
                    font-bold
                    tracking-tight
                    text-gray-900
                    sm:text-xl
                  "
                >
                  Dashboard
                </h1>

                <span
                  className="
                    hidden sm:inline-flex
                    rounded-full
                    bg-blue-50
                    px-2 py-0.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-blue-600
                  "
                >
                  Admin
                </span>
              </div>

              <p className="hidden text-xs text-gray-400 sm:block">
                Gérez votre portfolio
              </p>
            </div>
          </div>
        </div>

        {/* ================= DROITE ================= */}

        <div className="flex items-center gap-3">
          {/* Notifications */}

          <HeaderNotifications />

          {/* Séparateur */}

          <div className="hidden h-8 w-px bg-gray-200 sm:block" />

          {/* Profil */}

          <HeaderProfile />

          {/* Déconnexion */}

          <HeaderLogout />
        </div>
      </div>
    </header>
  );
}
