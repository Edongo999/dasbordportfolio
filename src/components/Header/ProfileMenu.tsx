import React from "react";
import { User, Lock, Image, ChevronRight } from "lucide-react";

interface ProfileMenuProps {
  onOpenPhoto: () => void;
  onOpenName: () => void;
  onOpenPassword: () => void;
}

export default function ProfileMenu({
  onOpenPhoto,
  onOpenName,
  onOpenPassword,
}: ProfileMenuProps) {
  return (
    <div
      className="
        absolute
        right-0
        mt-3
        z-50
        w-72
        overflow-hidden
        rounded-2xl
        border
        border-gray-700/80
        bg-gradient-to-b
        from-gray-800
        to-gray-900
        text-white
        shadow-2xl
        shadow-black/30
        animate-slideDown
      "
    >
      {/* HEADER */}

      <div className="border-b border-gray-700/80 px-4 py-4">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-yellow-400/10
              ring-1
              ring-yellow-400/20
            "
          >
            <User size={18} className="text-yellow-400" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Paramètres du profil
            </h3>

            <p className="mt-0.5 text-[11px] text-gray-400">
              Gérez vos informations personnelles
            </p>
          </div>
        </div>
      </div>

      {/* OPTIONS */}

      <div className="p-2">
        {/* PHOTO */}

        <button
          type="button"
          onClick={onOpenPhoto}
          className="
            group
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-3
            text-left
            transition-all
            duration-200
            hover:bg-white/[0.06]
          "
        >
          <span
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-yellow-400/10
              text-yellow-400
              transition-all
              duration-200
              group-hover:bg-yellow-400/15
              group-hover:scale-105
            "
          >
            <Image size={19} />
          </span>

          <span className="flex-1">
            <span className="block text-sm font-medium text-gray-100">
              Changer la photo
            </span>

            <span className="mt-0.5 block text-[11px] text-gray-500">
              Modifier votre photo de profil
            </span>
          </span>

          <ChevronRight
            size={16}
            className="
              text-gray-600
              transition-transform
              duration-200
              group-hover:translate-x-0.5
              group-hover:text-yellow-400
            "
          />
        </button>

        {/* NOM */}

        <button
          type="button"
          onClick={onOpenName}
          className="
            group
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-3
            text-left
            transition-all
            duration-200
            hover:bg-white/[0.06]
          "
        >
          <span
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-yellow-400/10
              text-yellow-400
              transition-all
              duration-200
              group-hover:bg-yellow-400/15
              group-hover:scale-105
            "
          >
            <User size={19} />
          </span>

          <span className="flex-1">
            <span className="block text-sm font-medium text-gray-100">
              Modifier le nom
            </span>

            <span className="mt-0.5 block text-[11px] text-gray-500">
              Mettre à jour votre nom
            </span>
          </span>

          <ChevronRight
            size={16}
            className="
              text-gray-600
              transition-transform
              duration-200
              group-hover:translate-x-0.5
              group-hover:text-yellow-400
            "
          />
        </button>

        {/* MOT DE PASSE */}

        <button
          type="button"
          onClick={onOpenPassword}
          className="
            group
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-3
            text-left
            transition-all
            duration-200
            hover:bg-white/[0.06]
          "
        >
          <span
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-yellow-400/10
              text-yellow-400
              transition-all
              duration-200
              group-hover:bg-yellow-400/15
              group-hover:scale-105
            "
          >
            <Lock size={19} />
          </span>

          <span className="flex-1 min-w-0">
            <span className="block truncate text-sm font-medium text-gray-100">
              Changer le mot de passe
            </span>

            <span className="mt-0.5 block text-[11px] text-gray-500">
              Sécuriser votre compte
            </span>
          </span>

          <ChevronRight
            size={16}
            className="
              shrink-0
              text-gray-600
              transition-transform
              duration-200
              group-hover:translate-x-0.5
              group-hover:text-yellow-400
            "
          />
        </button>
      </div>

      {/* FOOTER */}

      <div className="border-t border-gray-700/60 px-4 py-2.5">
        <p className="text-center text-[10px] text-gray-500">
          Gestion de votre profil
        </p>
      </div>
    </div>
  );
}
