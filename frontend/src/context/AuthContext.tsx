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

  register(data: RegisterData): Promise<void>;

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

  /**
   * ---------------------------------------------------------
   * Restore authenticated user
   * ---------------------------------------------------------
   */
  async function refreshUser(): Promise<void> {
    const storedToken =
      localStorage.getItem("propintel_token");

    if (!storedToken) {
      setUser(null);
      setToken(null);
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const responseData = response.data as any;

      /*
       * Backend currently returns:
       *
       * {
       *   success: true,
       *   data: user
       * }
       *
       * These fallbacks also support alternative response formats.
       */

      const userData: User | null =
        responseData?.data?.user ??
        responseData?.data ??
        responseData?.user ??
        null;

      if (userData) {
        setUser(userData);
        setToken(storedToken);
      } else {
        localStorage.removeItem("propintel_token");

        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.error(
        "Failed to restore authentication:",
        error
      );

      localStorage.removeItem("propintel_token");

      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }

  /**
   * ---------------------------------------------------------
   * Login
   * ---------------------------------------------------------
   */
  async function login(
    data: LoginData
  ): Promise<void> {
    const response = await loginApi(data);

    const responseData = response.data as any;

    /*
     * Backend currently returns:
     *
     * {
     *   success: true,
     *   message: "Login successful",
     *   data: {
     *     user: {...},
     *     accessToken: "..."
     *   }
     * }
     *
     * Therefore the token is inside:
     *
     * response.data.data.accessToken
     */

    const accessToken =
      responseData?.data?.accessToken ??
      responseData?.data?.token ??
      responseData?.accessToken ??
      responseData?.token;

    const userData =
      responseData?.data?.user ??
      responseData?.user;

    if (!accessToken) {
      console.error(
        "Login response did not contain an access token:",
        responseData
      );

      throw new Error(
        "Login successful, but authentication token was not received."
      );
    }

    /*
     * Save token
     */
    localStorage.setItem(
      "propintel_token",
      accessToken
    );

    setToken(accessToken);

    /*
     * Save user if returned by backend
     */
    if (userData) {
      setUser(userData);
    } else {
      /*
       * If user is not included in the login response,
       * fetch the current user using the newly stored token.
       */
      await refreshUser();
    }
  }

  /**
   * ---------------------------------------------------------
   * Register
   * ---------------------------------------------------------
   */
  async function register(
    data: RegisterData
  ): Promise<void> {
    const response = await registerApi(data);

    /*
     * registerApi returns response.data directly.
     *
     * Backend currently returns:
     *
     * {
     *   success: true,
     *   message: "...",
     *   data: {
     *     user: {...},
     *     accessToken: "..."
     *   }
     * }
     */

    const responseData = response as any;

    const accessToken =
      responseData?.data?.accessToken ??
      responseData?.data?.token ??
      responseData?.accessToken ??
      responseData?.token;

    const userData =
      responseData?.data?.user ??
      responseData?.user;

    /*
     * Registration may succeed while email verification
     * is still required.
     *
     * Therefore token is optional here.
     */

    if (accessToken) {
      localStorage.setItem(
        "propintel_token",
        accessToken
      );

      setToken(accessToken);
    }

    if (userData) {
      setUser(userData);
    }
  }

  /**
   * ---------------------------------------------------------
   * Logout
   * ---------------------------------------------------------
   */
  function logout(): void {
    localStorage.removeItem("propintel_token");

    setUser(null);
    setToken(null);
  }

  /**
   * ---------------------------------------------------------
   * Update current user
   * ---------------------------------------------------------
   */
  function updateUser(
    updatedUser: User
  ): void {
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

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

export default AuthContext;