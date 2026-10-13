 import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

/**
 * ============================================================
 * PropIntel AI - API Client
 * ============================================================
 *
 * Central Axios configuration.
 *
 * Backend:
 * http://localhost:5000
 *
 * API:
 * http://localhost:5000/api/v1
 *
 * Authentication:
 * Bearer token stored in:
 * localStorage -> propintel_token
 * ============================================================
 */

const DEFAULT_API_URL = "http://localhost:5000/api/v1";

const baseURL =
  import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_URL;

/**
 * ------------------------------------------------------------
 * Create Axios instance
 * ------------------------------------------------------------
 */

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 15000,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  /**
   * We are using localStorage for JWT authentication.
   * Therefore credentials/cookies are not required here.
   */
  withCredentials: false,
});

/**
 * ------------------------------------------------------------
 * Helper: Get stored authentication token
 * ------------------------------------------------------------
 */

export function getStoredToken(): string | null {
  const token = localStorage.getItem("propintel_token");

  if (!token) {
    return null;
  }

  const cleanedToken = token.trim();

  if (!cleanedToken) {
    return null;
  }

  return cleanedToken;
}

/**
 * ------------------------------------------------------------
 * Helper: Save authentication token
 * ------------------------------------------------------------
 */

export function setStoredToken(token: string): void {
  if (!token) {
    return;
  }

  localStorage.setItem(
    "propintel_token",
    token.trim()
  );
}

/**
 * ------------------------------------------------------------
 * Helper: Remove authentication token
 * ------------------------------------------------------------
 */

export function removeStoredToken(): void {
  localStorage.removeItem("propintel_token");
}

/**
 * ------------------------------------------------------------
 * Request interceptor
 * ------------------------------------------------------------
 *
 * EVERY protected API request gets:
 *
 * Authorization: Bearer <JWT>
 *
 * Example:
 *
 * GET /profile
 *
 * Authorization: Bearer eyJhbGciOi...
 *
 * ------------------------------------------------------------
 */

apiClient.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ) => {
    const token = getStoredToken();

    /**
     * Make sure headers object exists.
     */
    if (!config.headers) {
      config.headers = new axios.AxiosHeaders();
    }

    /**
     * Attach JWT when available.
     */
    if (token) {
      config.headers.set(
        "Authorization",
        `Bearer ${token}`
      );
    } else {
      /**
       * Do not send:
       *
       * Authorization: undefined
       *
       * This was one of the problems shown
       * in your backend terminal.
       */
      config.headers.delete("Authorization");
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

/**
 * ------------------------------------------------------------
 * Response interceptor
 * ------------------------------------------------------------
 */

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },

  (error: AxiosError<any>) => {
    /**
     * --------------------------------------------------------
     * 401 Unauthorized
     * --------------------------------------------------------
     *
     * Only remove token when backend explicitly says that
     * authentication is invalid.
     */
    if (error.response?.status === 401) {
      const requestUrl =
        error.config?.url || "";

      /**
       * Don't automatically redirect here.
       *
       * AuthContext controls authentication state.
       *
       * This avoids unexpected page changes.
       */
      console.warn(
        `[PropIntel Auth] 401 Unauthorized: ${requestUrl}`
      );
    }

    /**
     * --------------------------------------------------------
     * Extract backend error message
     * --------------------------------------------------------
     */

    const backendData = error.response?.data;

    let message =
      "Unexpected network error";

    if (
      backendData &&
      typeof backendData === "object"
    ) {
      if (
        typeof backendData.message === "string" &&
        backendData.message.trim()
      ) {
        message =
          backendData.message.trim();
      } else if (
        typeof backendData.error === "string" &&
        backendData.error.trim()
      ) {
        message =
          backendData.error.trim();
      }
    } else if (error.message) {
      message = error.message;
    }

    /**
     * Create a normal Error object so existing code can use:
     *
     * catch (error) {
     *   error.message
     * }
     */
    const normalizedError =
      new Error(message);

    /**
     * Preserve useful Axios information.
     */
    (
      normalizedError as Error & {
        status?: number;
        response?: unknown;
      }
    ).status =
      error.response?.status;

    (
      normalizedError as Error & {
        status?: number;
        response?: unknown;
      }
    ).response =
      error.response?.data;

    return Promise.reject(
      normalizedError
    );
  }
);

/**
 * ------------------------------------------------------------
 * Export API URL for debugging
 * ------------------------------------------------------------
 */

export const API_BASE_URL = baseURL;