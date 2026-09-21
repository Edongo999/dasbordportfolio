import React, { useEffect, useState } from "react";
import { Bell, FileText, Image, User, Lock } from "lucide-react";
import Modal from "../Modal";
import NotificationList from "../Notification/NotificationList";
import useNotifications from "@/Hook/useNotifications";

export default function SidebarNotifications() {
  const [openNotifPreview, setOpenNotifPreview] = useState(false);
  const [openNotifAll, setOpenNotifAll] = useState(false);

  const { notifications, markAsRead } = useNotifications();

  // =====================================================
  // OUVRIR AUTOMATIQUEMENT LE MODAL SI NÉCESSAIRE
  // =====================================================

  useEffect(() => {
    // Rien à faire ici pour le moment.
    // Le hook useNotifications s'occupe déjà
    // du chargement et de l'actualisation.
  }, []);

  // =====================================================
  // ICÔNE NOTIFICATION
  // =====================================================

  const getIcon = (type: string) => {
    switch (type) {
      case "photo":
        return <Image size={18} className="text-blue-500" />;

      case "name":
        return <User size={18} className="text-green-500" />;

      case "password":
        return <Lock size={18} className="text-red-500" />;

      case "like":
        return <Bell size={18} className="text-pink-500" />;

      case "comment":
        return <FileText size={18} className="text-purple-500" />;

      default:
        return <Bell size={18} className="text-gray-400" />;
    }
  };

  return (
    <>
      {/* =====================================================
          MODAL APERÇU NOTIFICATIONS
      ===================================================== */}

      <Modal
        open={openNotifPreview}
        onClose={() => setOpenNotifPreview(false)}
        title="Notifications"
      >
        <div className="flex flex-col gap-3">
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-sm">
              Aucune notification pour le moment.
            </p>
          ) : (
            notifications.slice(0, 5).map((notif) => (
              <button
                key={notif.id}
                type="button"
                onClick={() => markAsRead(notif.id)}
                className={`
                  flex
                  w-full
                  items-center
                  gap-2
                  rounded-lg
                  px-3
                  py-2
                  text-left
                  transition
                  hover:bg-blue-50
                  ${
                    notif.read
                      ? "bg-gray-50 text-gray-400"
                      : "bg-gray-100 text-gray-700"
                  }
                `}
              >
                {getIcon(notif.type)}

                <span className="text-sm">{notif.message}</span>

                {!notif.read && (
                  <span
                    className="
                      ml-auto
                      h-2
                      w-2
                      shrink-0
                      rounded-full
                      bg-blue-500
                    "
                  />
                )}
              </button>
            ))
          )}

          <button
            onClick={() => {
              setOpenNotifPreview(false);
              setOpenNotifAll(true);
            }}
            className="
              mt-4
              rounded-lg
              bg-blue-600
              px-4
              py-2
              text-white
              transition
              hover:bg-blue-700
            "
          >
            Voir toutes les notifications
          </button>
        </div>
      </Modal>

      {/* =====================================================
          MODAL TOUTES LES NOTIFICATIONS
      ===================================================== */}

      <Modal
        open={openNotifAll}
        onClose={() => setOpenNotifAll(false)}
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
