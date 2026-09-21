
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/components/utils/axiosInstance";

export interface Notification {
  id: number;
  type: string;
  message: string;
  user_id: number;
  read: boolean;
  created_at: string;
  updated_at: string;
}

export default function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  // =====================================================
  // RÉCUPÉRER LES NOTIFICATIONS
  // =====================================================

  const fetchNotifications = useCallback(async () => {
    try {
      setLoadingNotifications(true);

      const res = await axiosInstance.get("/notifications");

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

      setNotifications(data);
    } catch (error) {
      console.error(
        "Erreur lors du chargement des notifications :",
        error
      );
    } finally {
      setLoadingNotifications(false);
    }
  }, []);

  // =====================================================
  // MARQUER UNE NOTIFICATION COMME LUE
  // =====================================================

  const markAsRead = useCallback(
    async (id: number) => {
      try {
        // Retirer immédiatement la notification de l'écran
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== id)
        );

        // Enregistrer comme lue dans Laravel
        await axiosInstance.post(
          `/notifications/${id}/read`
        );
      } catch (error) {
        console.error(
          "Erreur lors du marquage de la notification :",
          error
        );

        // Si l'API échoue, on recharge les notifications
        fetchNotifications();
      }
    },
    [fetchNotifications]
  );

  // =====================================================
  // CHARGEMENT INITIAL + ACTUALISATION AUTOMATIQUE
  // =====================================================

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchNotifications]);

  // =====================================================
  // NOTIFICATIONS NON LUES
  // =====================================================

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  );

  // =====================================================
  // RETOUR DU HOOK
  // =====================================================

  return {
    notifications,
    unreadNotifications,
    loadingNotifications,
    fetchNotifications,
    markAsRead,
  };
}
