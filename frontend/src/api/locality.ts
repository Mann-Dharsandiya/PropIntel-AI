import { apiClient } from "./axios";

export interface LocalityInsights {
  city: string;
  locality: string;

  averagePrice: number;
  priceGrowth: number;

  investmentScore: number;

  metroConnectivity: number;

  schoolsNearby: number;

  hospitalsNearby: number;

  shoppingScore: number;

  rentalDemand: string;

  futureGrowth: string;
}

export async function getLocalityInsights(
  city: string,
  locality: string
): Promise<LocalityInsights> {
  const response = await apiClient.get(
    `/localities/${encodeURIComponent(
      city
    )}/${encodeURIComponent(locality)}`
  );

  return response.data.data;
}