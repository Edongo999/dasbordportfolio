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

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
}

export default function NotificationList({
  notifications,
  onMarkAsRead,
}: NotificationListProps) {
  // =====================================================
  // ICÔNE
  // =====================================================

  const getIcon = (type: string) => {
    switch (type) {
      case "photo":
        return <Image className="h-5 w-5 text-blue-500" />;

      case "like":
        return <ThumbsUp className="h-5 w-5 text-green-500" />;

      case "comment":
        return <MessageSquare className="h-5 w-5 text-purple-500" />;

      case "name":
        return <User className="h-5 w-5 text-orange-500" />;

      case "password":
        return <Lock className="h-5 w-5 text-red-500" />;

      case "article":
        return <FileText className="h-5 w-5 text-blue-600" />;

      default:
        return <MessageSquare className="h-5 w-5 text-gray-400" />;
    }
  };

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (dateString: string) => {
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
  // AFFICHAGE
  // =====================================================

  return (
    <div className="max-h-[65vh] space-y-3 overflow-y-auto pr-1">
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <MessageSquare className="h-5 w-5 text-gray-400" />
          </div>

          <p className="text-sm font-medium text-gray-600">
            Aucune notification
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Vous n'avez aucune notification pour le moment.
          </p>
        </div>
      ) : (
        notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => onMarkAsRead(notif.id)}
            className={`
              group
              cursor-pointer
              rounded-xl
              border
              p-4
              transition-all
              duration-200
              hover:-translate-y-[1px]
              hover:shadow-sm
              ${
                notif.read
                  ? "border-gray-100 bg-white"
                  : "border-blue-100 bg-blue-50/40"
              }
            `}
          >
            <div className="flex items-start gap-3">
              {/* ICÔNE */}

              <div
                className={`
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  shadow-sm
                  ${notif.read ? "bg-gray-50" : "bg-white"}
                `}
              >
                {getIcon(notif.type)}
              </div>

              {/* CONTENU */}

              <div className="min-w-0 flex-1">
                <p
                  className={`
                    text-sm
                    leading-5
                    ${
                      notif.read
                        ? "font-medium text-gray-600"
                        : "font-semibold text-gray-900"
                    }
                  `}
                >
                  {notif.message}
                </p>

                {/* DATE */}

                <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock className="h-3.5 w-3.5 shrink-0" />

                  <span>{formatDate(notif.created_at)}</span>
                </div>
              </div>

              {/* NON LUE */}

              {!notif.read && (
                <span
                  className="
                    mt-1
                    h-2.5
                    w-2.5
                    shrink-0
                    rounded-full
                    bg-blue-500
                    shadow-sm
                  "
                  title="Non lue"
                />
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
