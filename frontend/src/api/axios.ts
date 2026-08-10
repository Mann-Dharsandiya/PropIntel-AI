 import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ??
  "http://localhost:5000/api/v1";

export const apiClient = axios.create({
  baseURL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Attach authentication token
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      localStorage.getItem("propintel_token");

    if (token && config.headers) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

/**
 * Normalize API errors
 */
apiClient.interceptors.response.use(
  (response) => response,

  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ??
      error.message ??
      "Unexpected network error";

    return Promise.reject(
      new Error(message)
    );
  }
);