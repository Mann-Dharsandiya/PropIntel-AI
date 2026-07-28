 import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  login as loginApi,
  register as registerApi,
  AuthUser,
} from "@/api/auth";

import { apiClient } from "@/api/axios";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  profileImage: string;
  isVerified: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "buyer" | "seller";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;

  login(data: LoginData): Promise<void>;

  register(
  data: RegisterData
): Promise<{
  success: boolean;
  message: string;
  user?: AuthUser;
}>;

  logout(): void;

  refreshUser(): Promise<void>;

  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("propintel_token")
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshUser();
  }, []);

  async function refreshUser() {
    const storedToken = localStorage.getItem(
      "propintel_token"
    );

    if (!storedToken) {
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      setUser(response.data.data);
      setToken(storedToken);
    } catch {
      localStorage.removeItem("propintel_token");
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(data: LoginData) {
    const response = await loginApi(data);

    localStorage.setItem(
      "propintel_token",
      response.data.accessToken
    );

    setToken(response.data.accessToken);
    setUser(response.data.user);
  }

 async function register(data: RegisterData) {
  const response = await registerApi(data);

  // Do NOT log in immediately.
  // User must verify email first.

  return {
    success: response.success,
    message: response.message,
    user: response.data?.user,
  };
}

  function logout() {
    localStorage.removeItem("propintel_token");

    setUser(null);
    setToken(null);
  }

  /**
   * Update logged-in user without logging in again.
   * Used after editing profile.
   */
  function updateUser(updatedUser: User) {
    setUser(updatedUser);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        refreshUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}