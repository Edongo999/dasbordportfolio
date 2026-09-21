import React, { useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Settings,
  PlusCircle,
  X,
  Sparkles,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarMobileProps {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenPublish: () => void;
  children?: React.ReactNode;
}

export default function SidebarMobile({
  setMobileOpen,
  onOpenPublish,
  children,
}: SidebarMobileProps) {
  // =====================================================
  // FERMER AVEC ÉCHAP
  // =====================================================

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setMobileOpen]);

  return (
    <>
      {/* =================================================
          OVERLAY
      ================================================= */}

      <div
        className="
          fixed
          inset-0
          z-40
          bg-black/40
          backdrop-blur-[2px]
          transition-opacity
          duration-300
        "
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* =================================================
          SIDEBAR MOBILE
      ================================================= */}

      <aside
        onClick={(e) => e.stopPropagation()}
        className="
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-[285px]
          flex-col
          overflow-hidden
          border-r
          border-white/10
          bg-gradient-to-b
          from-slate-950
          via-slate-900
          to-slate-800
          text-white
          shadow-2xl
          animate-[slideIn_0.3s_ease-out]
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            relative
            flex
            h-[76px]
            shrink-0
            items-center
            justify-between
            border-b
            border-white/10
            px-5
          "
        >
          {/* Ligne décorative */}

          <div
            className="
              absolute
              left-0
              top-0
              h-full
              w-1
              bg-gradient-to-b
              from-blue-400
              via-blue-600
              to-indigo-600
            "
          />

          {/* LOGO */}

          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-blue-500
                  to-indigo-600
                  shadow-lg
                  shadow-blue-500/20
                "
              >
                <span className="text-xs font-black tracking-tight">LD</span>
              </div>

              <span
                className="
                  absolute
                  -bottom-1
                  -right-1
                  h-2.5
                  w-2.5
                  rounded-full
                  border-2
                  border-slate-900
                  bg-green-400
                "
              />
            </div>

            <div>
              <h2 className="text-sm font-extrabold tracking-tight">
                Landry<span className="text-blue-400">DEV</span>
              </h2>

              <div className="mt-0.5 flex items-center gap-1">
                <Sparkles size={9} className="text-blue-400" />

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.15em]
                    text-slate-500
                  "
                >
                  Administration
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              BOUTON FERMER
          ================================================= */}

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Fermer le menu"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/5
              text-slate-400
              transition-all
              hover:border-red-400/20
              hover:bg-red-500/10
              hover:text-red-400
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* =================================================
            CONTENU
        ================================================= */}

        <div className="flex-1 overflow-y-auto px-4 py-5">
          {/* TITRE MENU */}

          <div className="mb-3 px-1">
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-slate-500
              "
            >
              Menu principal
            </span>
          </div>

          <nav className="space-y-2">
            {/* =================================================
                DASHBOARD
            ================================================= */}

            <NavLink
              to="/dashboard"
              end
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `
                group
                flex
                items-center
                gap-3
                rounded-xl
                border
                px-3
                py-3
                text-sm
                transition-all
                duration-200
                ${
                  isActive
                    ? "border-blue-500/10 bg-blue-500/10 text-blue-400"
                    : "border-white/5 bg-white/[0.04] text-slate-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      transition-all
                      ${
                        isActive
                          ? "bg-blue-500/15 text-blue-400"
                          : "bg-blue-500/10 text-blue-400"
                      }
                    `}
                  >
                    <LayoutDashboard size={18} />
                  </span>

                  <span className="font-semibold">Dashboard</span>
                </>
              )}
            </NavLink>

            {/* =================================================
                PUBLIER UN ARTICLE
            ================================================= */}

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenPublish();
              }}
              className="
                group
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                border
                border-white/5
                bg-white/[0.04]
                px-3
                py-3
                text-left
                text-sm
                font-medium
                text-slate-300
                transition-all
                hover:border-blue-500/20
                hover:bg-blue-500/10
                hover:text-blue-400
              "
            >
              <span
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-500/10
                  text-blue-400
                  transition-transform
                  group-hover:scale-105
                "
              >
                <PlusCircle size={18} />
              </span>

              <span>Publier un article</span>
            </button>

            {/* =================================================
                GÉRER LES ARTICLES
                IMPORTANT : ROUTE CORRIGÉE
            ================================================= */}

            <NavLink
              to="/dashboard/articles/manage"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `
                group
                flex
                items-center
                gap-3
                rounded-xl
                border
                px-3
                py-3
                text-sm
                transition-all
                duration-200
                ${
                  isActive
                    ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                    : "border-white/5 bg-white/[0.04] text-slate-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      transition-all
                      ${
                        isActive
                          ? "bg-blue-500/15 text-blue-400"
                          : "bg-white/5 text-slate-400 group-hover:bg-blue-500/10 group-hover:text-blue-400"
                      }
                    `}
                  >
                    <FileText size={18} />
                  </span>

                  <span className="font-medium">Gérer les articles</span>
                </>
              )}
            </NavLink>

            {/* =================================================
                PARAMÈTRES
                IMPORTANT : ROUTE CORRIGÉE
            ================================================= */}

            <NavLink
              to="/dashboard/settings"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `
                group
                flex
                items-center
                gap-3
                rounded-xl
                border
                px-3
                py-3
                text-sm
                transition-all
                duration-200
                ${
                  isActive
                    ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                    : "border-white/5 bg-white/[0.04] text-slate-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      transition-all
                      ${
                        isActive
                          ? "bg-blue-500/15 text-blue-400"
                          : "bg-white/5 text-slate-400 group-hover:bg-blue-500/10 group-hover:text-blue-400"
                      }
                    `}
                  >
                    <Settings size={18} />
                  </span>

                  <span className="font-medium">Paramètres</span>
                </>
              )}
            </NavLink>
          </nav>

          {/* =================================================
              CHILDREN
          ================================================= */}

          {children && (
            <div className="mt-6 border-t border-white/10 pt-5">{children}</div>
          )}
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="shrink-0 border-t border-white/10 p-4">
          <div
            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-white/5
              bg-white/[0.03]
              px-3
              py-3
            "
          >
            <span
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-green-400
                shadow-sm
                shadow-green-400/50
              "
            />

            <div>
              <p className="text-[10px] font-semibold text-slate-300">
                Système opérationnel
              </p>

              <p className="text-[9px] text-slate-500">Dashboard sécurisé</p>
            </div>
          </div>
        </div>
      </aside>

      {/* =================================================
          ANIMATION SIDEBAR
      ================================================= */}

      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(-100%);
              opacity: 0.7;
            }

            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
}
