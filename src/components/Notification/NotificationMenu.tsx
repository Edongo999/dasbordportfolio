import React from "react";
import {
  Image,
  ThumbsUp,
  MessageSquare,
  User,
  Lock,
  FileText,
  Clock,
} from "lucide-react";

import { Notification } from "@/Hook/useNotifications";

interface NotificationMenuProps {
  notifications: Notification[];
  onShowAll: () => void;
  onMarkAsRead: (id: number) => void;
}

export default function NotificationMenu({
  notifications,
  onShowAll,
  onMarkAsRead,
}: NotificationMenuProps) {
  // =====================================================
  // ICÔNE
  // =====================================================

  const getIcon = (type: string) => {
    switch (type) {
      case "photo":
        return <Image className="h-4 w-4 text-blue-500" />;

      case "like":
        return <ThumbsUp className="h-4 w-4 text-green-500" />;

      case "comment":
        return <MessageSquare className="h-4 w-4 text-purple-500" />;

      case "name":
        return <User className="h-4 w-4 text-orange-500" />;

      case "password":
        return <Lock className="h-4 w-4 text-red-500" />;

      case "article":
        return <FileText className="h-4 w-4 text-blue-600" />;

      default:
        return <MessageSquare className="h-4 w-4 text-gray-400" />;
    }
  };

  // =====================================================
  // CONTENU
  // =====================================================

  const getNotificationContent = (notif: Notification) => {
    if (notif.type === "article") {
      const separator = " : ";
      const index = notif.message.indexOf(separator);

      if (index !== -1) {
        return {
          action: notif.message.substring(0, index),
          title: notif.message.substring(index + separator.length),
        };
      }
    }

    return {
      action: notif.message,
      title: "",
    };
  };

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (dateString: string) => {
    if (!dateString) {
      return "Date inconnue";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Date inconnue";
    }

    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  // =====================================================
  // 5 PLUS RÉCENTES
  // =====================================================

  const latestNotifications = [...notifications]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  // =====================================================
  // AFFICHAGE
  // =====================================================

  return (
    <div
      className="
        absolute
        right-0
        mt-3
        w-[350px]
        max-w-[calc(100vw-2rem)]
        overflow-hidden
        rounded-2xl
        border
        border-gray-100
        bg-white
        text-gray-800
        shadow-xl
      "
    >
      {/* HEADER */}

      <div className="border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-800">Notifications</h3>

            <p className="mt-0.5 text-[11px] text-gray-400">
              Vos dernières activités
            </p>
          </div>

          {notifications.length > 0 && (
            <span
              className="
                rounded-full
                bg-blue-50
                px-2.5
                py-1
                text-[10px]
                font-semibold
                text-blue-600
              "
            >
              {notifications.length}
            </span>
          )}
        </div>
      </div>

      {/* LISTE */}

      <ul className="flex max-h-[380px] flex-col gap-2 overflow-y-auto p-3">
        {latestNotifications.length === 0 ? (
          <li className="px-3 py-8 text-center">
            <div
              className="
                mx-auto
                mb-2
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-gray-100
              "
            >
              <BellEmptyIcon />
            </div>

            <p className="text-sm font-medium text-gray-500">
              Aucune notification
            </p>
          </li>
        ) : (
          latestNotifications.map((notif) => {
            const { action, title } = getNotificationContent(notif);

            return (
              <li
                key={notif.id}
                onClick={() => onMarkAsRead(notif.id)}
                className={`
                  cursor-pointer
                  rounded-xl
                  border
                  px-3
                  py-3
                  transition-all
                  duration-200
                  hover:-translate-y-[1px]
                  hover:shadow-sm
                  ${
                    notif.read
                      ? "border-gray-100 bg-gray-50/50"
                      : "border-blue-100 bg-blue-50/40"
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  {/* ICÔNE */}

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-white
                      shadow-sm
                    "
                  >
                    {getIcon(notif.type)}
                  </div>

                  {/* CONTENU */}

                  <div className="min-w-0 flex-1">
                    <p
                      className={`
                        text-sm
                        font-semibold
                        leading-5
                        ${notif.read ? "text-gray-500" : "text-gray-800"}
                      `}
                    >
                      {action}
                    </p>

                    {title && (
                      <p
                        className="
                          mt-1
                          break-words
                          text-xs
                          font-semibold
                          leading-4
                          text-blue-600
                        "
                        title={title}
                      >
                        « {title} »
                      </p>
                    )}

                    {/* DATE */}

                    <div
                      className="
                        mt-2
                        flex
                        items-center
                        gap-1.5
                        text-[11px]
                        text-gray-400
                      "
                    >
                      <Clock className="h-3 w-3 shrink-0" />

                      <span>{formatDate(notif.created_at)}</span>
                    </div>
                  </div>

                  {/* POINT NON LU */}

                  {!notif.read && (
                    <span
                      className="
                        mt-1
                        h-2
                        w-2
                        shrink-0
                        rounded-full
                        bg-blue-500
                        shadow-sm
                      "
                    />
                  )}
                </div>
              </li>
            );
          })
        )}
      </ul>

      {/* VOIR TOUTES */}

      {notifications.length > 0 && (
        <div className="border-t border-gray-100 px-3 py-3 text-center">
          <button
            onClick={onShowAll}
            className="
              text-xs
              font-semibold
              text-blue-600
              transition
              hover:text-blue-700
              hover:underline
            "
          >
            Voir toutes les notifications
          </button>
        </div>
      )}
    </div>
  );
}

// =====================================================
// ICÔNE AUCUNE NOTIFICATION
// =====================================================

function BellEmptyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5 text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5"
      />

      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20h4" />
    </svg>
  );
}
