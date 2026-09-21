export interface User {
  name: string;
  email: string;
  image_url?: string;
}

export interface UserContextType {
  user: User | null;
  refreshUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}