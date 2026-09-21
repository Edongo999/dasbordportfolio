import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import Modal from "../Modal";
import ProfileMenu from "./ProfileMenu";

import ChangePhotoForm from "./ChangePhotoForm";
import ChangeNameForm from "./ChangeNameForm";
import ChangePasswordForm from "./ChangePasswordForm";

import { useUser } from "@/Hook/UserProvider";

export default function HeaderProfile() {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const [openNameModal, setOpenNameModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const { user } = useUser();

  const userName = user?.name || "Utilisateur";

  // =====================================================
  // IMAGE UTILISATEUR
  // =====================================================

  const userImage = (() => {
    if (!user?.image) {
      return "/images/default-avatar.png";
    }

    // Si Laravel renvoie déjà une URL complète
    if (user.image.startsWith("http://") || user.image.startsWith("https://")) {
      return user.image;
    }

    // Si Laravel renvoie /storage/...
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

    return `${apiUrl.replace(/\/$/, "")}${user.image}`;
  })();

  // =====================================================
  // FERMER LE MENU EN CLIQUANT À L'EXTÉRIEUR
  // =====================================================

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpenProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =====================================================
  // OUVERTURE DES MODALS
  // =====================================================

  const handleOpenPhoto = () => {
    setOpenProfileMenu(false);
    setOpenPhotoModal(true);
  };

  const handleOpenName = () => {
    setOpenProfileMenu(false);
    setOpenNameModal(true);
  };

  const handleOpenPassword = () => {
    setOpenProfileMenu(false);
    setOpenPasswordModal(true);
  };

  return (
    <>
      {/* =====================================================
          PROFIL
      ===================================================== */}

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setOpenProfileMenu((prev) => !prev)}
          aria-expanded={openProfileMenu}
          aria-haspopup="menu"
          className="
            group
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-transparent
            px-2
            py-1.5
            transition-all
            duration-200
            hover:border-gray-200
            hover:bg-gray-50
          "
        >
          {/* =================================================
              AVATAR
          ================================================= */}

          <div className="relative">
            <img
              src={userImage}
              alt={`Photo de profil de ${userName}`}
              onError={(e) => {
                e.currentTarget.src = "/images/default-avatar2.webp";
              }}
              className="
                h-10
                w-10
                rounded-xl
                border-2
                border-white
                object-cover
                shadow-md
                ring-1
                ring-gray-200
                transition-transform
                duration-200
                group-hover:scale-105
              "
            />

            {/* Statut en ligne */}

            <span
              className="
                absolute
                bottom-0
                right-0
                h-3
                w-3
                rounded-full
                border-2
                border-white
                bg-emerald-500
                shadow-sm
              "
            />
          </div>

          {/* =================================================
              INFORMATIONS UTILISATEUR
          ================================================= */}

          <div className="hidden text-left sm:block">
            <p
              className="
                max-w-[130px]
                truncate
                text-sm
                font-semibold
                text-gray-800
              "
            >
              {userName}
            </p>

            <p
              className="
                text-[11px]
                font-medium
                text-emerald-500
              "
            >
              En ligne
            </p>
          </div>

          {/* =================================================
              FLÈCHE
          ================================================= */}

          <ChevronDown
            size={16}
            className={`
              hidden
              text-gray-400
              transition-transform
              duration-200
              sm:block
              ${openProfileMenu ? "rotate-180 text-gray-600" : ""}
            `}
          />
        </button>

        {/* =====================================================
            MENU PROFIL
        ===================================================== */}

        {openProfileMenu && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -8,
              scale: 0.97,
            }}
            transition={{
              duration: 0.18,
              ease: "easeOut",
            }}
            className="
              absolute
              right-0
              top-14
              z-50
            "
          >
            <ProfileMenu
              onOpenPhoto={handleOpenPhoto}
              onOpenName={handleOpenName}
              onOpenPassword={handleOpenPassword}
            />
          </motion.div>
        )}
      </div>

      {/* =====================================================
          MODAL PHOTO
      ===================================================== */}

      <Modal
        open={openPhotoModal}
        onClose={() => setOpenPhotoModal(false)}
        title="Changer la photo"
      >
        <ChangePhotoForm onClose={() => setOpenPhotoModal(false)} />
      </Modal>

      {/* =====================================================
          MODAL NOM
      ===================================================== */}

      <Modal
        open={openNameModal}
        onClose={() => setOpenNameModal(false)}
        title="Modifier le nom d’utilisateur"
      >
        <ChangeNameForm onClose={() => setOpenNameModal(false)} />
      </Modal>

      {/* =====================================================
          MODAL MOT DE PASSE
      ===================================================== */}

      <Modal
        open={openPasswordModal}
        onClose={() => setOpenPasswordModal(false)}
        title="Changer le mot de passe"
      >
        <ChangePasswordForm onClose={() => setOpenPasswordModal(false)} />
      </Modal>
    </>
  );
}
