import { apiClient } from "./axios";

export interface LocalityComparison {
  first: {
    city: string;
    locality: string;
    averagePrice: number;
    investmentScore: number;
    priceGrowth: number;
    rentalDemand: string;
    futureGrowth: string;
    metroConnectivity: number;
    schoolsNearby: number;
    hospitalsNearby: number;
    shoppingScore: number;
  };

  second: {
    city: string;
    locality: string;
    averagePrice: number;
    investmentScore: number;
    priceGrowth: number;
    rentalDemand: string;
    futureGrowth: string;
    metroConnectivity: number;
    schoolsNearby: number;
    hospitalsNearby: number;
    shoppingScore: number;
  };
}

export async function compareLocalities(
  city1: string,
  locality1: string,
  city2: string,
  locality2: string
): Promise<LocalityComparison> {
  const response = await apiClient.get(
    "/localities/compare",
    {
      params: {
        city1,
        locality1,
        city2,
        locality2,
      },
    }
  );

  return response.data.data;
}