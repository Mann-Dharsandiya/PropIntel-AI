import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/axios';
import type { ApiSuccessResponse, HealthData } from '@/types/api';

async function fetchHealth(): Promise<ApiSuccessResponse<HealthData>> {
  const { data } = await apiClient.get<ApiSuccessResponse<HealthData>>('/health');
  return data;
}

/** Confirms the backend is reachable; drives the status dot on the landing page. */
export function useHealthCheck() {
  return useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
    retry: 0,
  });
}
