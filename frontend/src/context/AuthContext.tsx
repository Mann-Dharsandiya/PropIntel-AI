import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { login as loginApi } from "../api/auth";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
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

  const login = async (data: LoginData) => {
    const response = await loginApi(data);

    setUser(response.data.user);

    setToken(response.data.accessToken);

    localStorage.setItem(
      "propintel_token",
      response.data.accessToken
    );
  };

  const logout = () => {
    setUser(null);

    setToken(null);

    localStorage.removeItem("propintel_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
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