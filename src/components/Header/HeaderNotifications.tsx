import React, { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";

import NotificationMenu from "@/components/Notification/NotificationMenu";
import NotificationList from "@/components/Notification/NotificationList";
import Modal from "../Modal";

import useNotifications from "@/Hook/useNotifications";

export default function HeaderNotifications() {
  const [openNotifications, setOpenNotifications] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);

  const { notifications, unreadNotifications, markAsRead } = useNotifications();

  // =====================================================
  // CLICK À L'EXTÉRIEUR
  // =====================================================

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (notifRef.current && !notifRef.current.contains(target)) {
        setOpenNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =====================================================
  // OUVRIR / FERMER LES NOTIFICATIONS
  // =====================================================

  const handleNotificationClick = () => {
    setOpenNotifications((prev) => !prev);
  };

  // =====================================================
  // VOIR TOUTES LES NOTIFICATIONS
  // =====================================================

  const handleShowAll = () => {
    setOpenNotifications(false);
    setShowAll(true);
  };

  // =====================================================
  // AFFICHAGE
  // =====================================================

  return (
    <>
      {/* =================================================
          BOUTON + PETIT MENU
      ================================================= */}

      <div ref={notifRef} className="relative">
        <button
          onClick={handleNotificationClick}
          aria-label="Notifications"
          className="
            relative
            flex h-11 w-11
            items-center justify-center
            rounded-xl
            border border-gray-200
            bg-white
            text-gray-600
            shadow-sm
            transition-all duration-200
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-600
            hover:-translate-y-0.5
          "
        >
          <Bell size={20} />

          {/* =================================================
              BADGE COMPTEUR
          ================================================= */}

          {unreadNotifications.length > 0 && (
            <span
              className="
                absolute
                -right-1
                -top-1
                flex
                h-5
                min-w-5
                items-center
                justify-center
                rounded-full
                border-2
                border-white
                bg-red-500
                px-1
                text-[9px]
                font-bold
                text-white
                shadow-sm
              "
            >
              {unreadNotifications.length > 99
                ? "99+"
                : unreadNotifications.length}
            </span>
          )}
        </button>

        {/* =================================================
            PETIT MENU
        ================================================= */}

        {openNotifications && (
          <div
            className="
              absolute
              right-0
              top-14
              z-50
            "
          >
            <NotificationMenu
              notifications={notifications}
              onShowAll={handleShowAll}
              onMarkAsRead={markAsRead}
            />
          </div>
        )}
      </div>

      {/* =================================================
          MODAL : TOUTES LES NOTIFICATIONS
      ================================================= */}

      <Modal
        open={showAll}
        onClose={() => setShowAll(false)}
        title="Toutes les notifications"
      >
        <NotificationList
          notifications={notifications}
          onMarkAsRead={markAsRead}
        />
      </Modal>
    </>
  );
}
