import { apiClient } from "./axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "buyer" | "seller";
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  profileImage: string;
  isVerified: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    accessToken: string;
  };
}

// Login
export const login = async (data: LoginRequest) => {
  const response = await apiClient.post<AuthResponse>("/auth/login", data);
  return response.data;
};

// Register
export const register = async (data: RegisterRequest) => {
  const response = await apiClient.post<AuthResponse>("/auth/register", data);
  return response.data;
};