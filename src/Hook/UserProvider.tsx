import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import userService, { User } from "@/services/userService";

export interface UserContextType {
  user: User | null;

  setUser: React.Dispatch<React.SetStateAction<User | null>>;

  refreshUser: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");

    // Aucun token = aucun profil à récupérer
    if (!token) {
      setUser(null);
      return;
    }

    try {
      console.log("👤 Chargement du profil...");

      const response = await userService.profile();

      console.log("👤 Profil reçu :", response.data);

      setUser(response.data.user ?? null);
    } catch (error) {
      console.error("Erreur chargement profil :", error);

      setUser(null);
    }
  }, []);

  // =====================================================
  // CHARGEMENT INITIAL DU PROFIL
  // =====================================================

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUser();
  }, [fetchUser]);

  // =====================================================
  // RAFRAÎCHIR LE PROFIL
  // =====================================================

  const refreshUser = useCallback(async () => {
    await fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser(): UserContextType {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
}
