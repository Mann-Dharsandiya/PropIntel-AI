 import { apiClient } from "./axios";

/**
 * ============================================================
 * PropIntel AI - Authentication API
 * ============================================================
 */

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  profileImage?: string;
  isVerified?: boolean;
}

/**
 * ------------------------------------------------------------
 * Login
 * ------------------------------------------------------------
 */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success?: boolean;

  message?: string;

  accessToken?: string;

  token?: string;

  user?: AuthUser;

  data?: {
    accessToken?: string;

    token?: string;

    user?: AuthUser;
  };
}

/**
 * Login API
 */
export async function login(
  data: LoginRequest
) {
  const response =
    await apiClient.post<LoginResponse>(
      "/auth/login",
      data
    );

  return response;
}

/**
 * ------------------------------------------------------------
 * Register
 * ------------------------------------------------------------
 */

export interface RegisterRequest {
  name: string;

  email: string;

  phone: string;

  password: string;

  role: "buyer" | "seller";
}

export interface RegisterResponse {
  success: boolean;

  message: string;

  data?: {
    user?: AuthUser;

    accessToken?: string;

    token?: string;
  };

  user?: AuthUser;

  accessToken?: string;

  token?: string;
}

/**
 * Register API
 *
 * Returns response.data directly.
 */
export async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {
  const response =
    await apiClient.post<RegisterResponse>(
      "/auth/register",
      data
    );

  return response.data;
}

/**
 * ------------------------------------------------------------
 * Get Current Authenticated User
 * ------------------------------------------------------------
 */

export async function getCurrentUser() {
  const response =
    await apiClient.get<{
      success?: boolean;

      message?: string;

      data?: AuthUser;

      user?: AuthUser;
    }>("/auth/me");

  return response;
}

/**
 * ------------------------------------------------------------
 * Logout
 * ------------------------------------------------------------
 */

export async function logoutApi() {
  try {
    await apiClient.post(
      "/auth/logout"
    );
  } catch {
    /*
     * Frontend logout should still work even
     * if backend logout endpoint fails.
     */
  }
}