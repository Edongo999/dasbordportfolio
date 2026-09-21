import { useContext } from "react";
import { AuthContext } from "@/components/types/AuthContextBase";

export const useAuth = () => {
  return useContext(AuthContext);
};