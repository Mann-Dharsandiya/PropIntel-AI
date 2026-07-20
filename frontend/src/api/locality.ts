 import { apiClient } from "./axios";

/**
 * Locality Insights
 */
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

/**
 * Locality Dropdown Option
 */
export interface LocalityOption {
  _id: string;
  city: string;
  locality: string;
}

/**
 * Get Locality Insights
 */
export async function getLocalityInsights(
  city: string,
  locality: string
): Promise<LocalityInsights> {
  const response = await apiClient.get(
    `/localities/${encodeURIComponent(city)}/${encodeURIComponent(locality)}`
  );

  return response.data.data;
}

/**
 * Get All Localities
 * Used for Dynamic City & Locality Dropdowns
 */
export async function getAllLocalities(): Promise<LocalityOption[]> {
  const response = await apiClient.get("/localities");

  return response.data.data;
}

/**
 * Get Unique Cities
 */
export async function getCities(): Promise<string[]> {
  const localities = await getAllLocalities();

  return [...new Set(localities.map((item) => item.city))];
}

/**
 * Get Localities By City
 */
export async function getLocalitiesByCity(
  city: string
): Promise<LocalityOption[]> {
  const localities = await getAllLocalities();

  return localities.filter(
    (item) => item.city.toLowerCase() === city.toLowerCase()
  );
}