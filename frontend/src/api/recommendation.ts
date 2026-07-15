import { apiClient } from "./axios";

export interface RecommendationRequest {
  budget: number;
  city: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  minArea: number;
}

export interface RecommendationProperty {
  _id: string;
  title: string;
  description: string;
  price: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  city: string;
  state: string;
  country: string;
  address: string;
  images: string[];
  matchScore: number;
}

export async function getRecommendations(
  data: RecommendationRequest
): Promise<RecommendationProperty[]> {
  const response = await apiClient.post(
    "/recommendation",
    data
  );

  return response.data.data;
}