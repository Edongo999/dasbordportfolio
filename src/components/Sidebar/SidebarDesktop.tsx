import React from "react";
import { Menu, Sparkles } from "lucide-react";
import SidebarNavLinks from "./SidebarNavLinks";

interface SidebarDesktopProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenPublish: () => void;
  children?: React.ReactNode;
}

export default function SidebarDesktop({
  isOpen,
  setIsOpen,
  onOpenPublish,
  children,
}: SidebarDesktopProps) {
  return (
    <aside
      className={`
        hidden md:flex
        h-screen
        flex-col
        shrink-0
        overflow-hidden
        border-r border-white/10
        bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800
        text-gray-100
        shadow-2xl
        transition-all
        duration-300
        ease-in-out
        ${isOpen ? "w-64" : "w-20"}
      `}
    >
      {/* ================= LOGO ================= */}
      <div
        className={`
          relative
          flex
          h-20
          shrink-0
          items-center
          border-b
          border-white/10
          ${isOpen ? "justify-between px-5" : "justify-center"}
        `}
      >
        {/* Petite lumière décorative */}
        <div className="absolute left-0 top-0 h-20 w-1 bg-gradient-to-b from-blue-400 via-blue-600 to-indigo-600" />

        {isOpen ? (
          <div className="flex items-center gap-3">
            {/* Logo */}
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
                <span className="text-sm font-black tracking-tight text-white">
                  LD
                </span>
              </div>

              <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-green-400" />
            </div>

            {/* Nom */}
            <div className="min-w-0">
              <h1 className="truncate text-base font-extrabold tracking-tight text-white">
                Landry<span className="text-blue-400">DEV</span>
              </h1>

              <div className="mt-0.5 flex items-center gap-1.5">
                <Sparkles size={10} className="text-blue-400" />

                <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-slate-400">
                  Administration
                </span>
              </div>
            </div>
          </div>
        ) : (
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
              <span className="text-xs font-black text-white">LD</span>
            </div>

            <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-green-400" />
          </div>
        )}

        {/* ================= TOGGLE ================= */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Réduire la sidebar" : "Ouvrir la sidebar"}
          className={`
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            border
            border-white/10
            bg-white/5
            text-slate-400
            transition-all
            duration-200
            hover:border-blue-400/30
            hover:bg-blue-500/10
            hover:text-blue-400
            ${!isOpen ? "absolute right-1/2 translate-x-1/2" : ""}
          `}
        >
          <Menu size={17} />
        </button>
      </div>

      {/* ================= NAVIGATION ================= */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
        {isOpen && (
          <div className="mb-3 px-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Menu principal
            </span>
          </div>
        )}

        <SidebarNavLinks isOpen={isOpen} onOpenPublish={onOpenPublish} />

        {/* ================= CHILDREN ================= */}
        {children && (
          <div className="mt-5 border-t border-white/10 pt-5">{children}</div>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="shrink-0 border-t border-white/10 p-3">
        {isOpen ? (
          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
              <span className="h-2 w-2 rounded-full bg-green-400 shadow-sm shadow-green-400/50" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-slate-300">
                Système opérationnel
              </p>

              <p className="text-[9px] text-slate-500">Dashboard sécurisé</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-green-400
                shadow-sm
                shadow-green-400/50
              "
              title="Système opérationnel"
            />
          </div>
        )}
      </div>
    </aside>
  );
}
