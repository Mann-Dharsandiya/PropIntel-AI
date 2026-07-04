export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  details?: unknown;
}

export interface HealthData {
  status: string;
  uptimeSeconds?: number;
  timestamp: string;
  database?: string;
}
