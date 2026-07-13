 import { apiClient } from "./axios";

export interface PricePredictionRequest {
  city: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  age: number;
  parking: number;
  furnished: string;
}

export interface PricePredictionResponse {
  predictedPrice: number;
  confidence: number;
  model: string;
  mae: number;
}

export async function predictPrice(
  data: PricePredictionRequest
): Promise<PricePredictionResponse> {
  const response = await apiClient.post(
    "/ml/predict-price",
    data
  );

  return response.data.data;
}