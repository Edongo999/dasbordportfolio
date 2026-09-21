import axios from "axios";

export const initCsrf = async (): Promise<void> => {
  await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
    withCredentials: true,

    headers: {
      Accept: "application/json",
    },
  });
};