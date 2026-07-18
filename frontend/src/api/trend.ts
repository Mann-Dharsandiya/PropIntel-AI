import { apiClient } from "./axios";

export interface PriceTrend {
  month: string;
  averagePrice: number;
}

export async function getPriceTrend(
  city: string,
  locality: string
): Promise<PriceTrend[]> {
  const response = await apiClient.get(
    `/localities/${encodeURIComponent(
      city
    )}/${encodeURIComponent(
      locality
    )}/trend`
  );

  return response.data.data;
}