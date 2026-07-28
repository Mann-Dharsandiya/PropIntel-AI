 import { apiClient } from "./axios";
import { Property } from "./property";

export interface Favorite {
  _id: string;
  property: Property;
  createdAt: string;
}

export async function getFavorites() {
  const response = await apiClient.get("/favorites");
  return response.data.data as Favorite[];
}

export async function addFavorite(propertyId: string) {
  const response = await apiClient.post(
    `/favorites/${propertyId}`
  );

  return response.data;
}

export async function removeFavorite(propertyId: string) {
  const response = await apiClient.delete(
    `/favorites/${propertyId}`
  );

  return response.data;
}

export async function toggleFavorite(propertyId: string) {
  const response = await apiClient.patch(
    `/favorites/${propertyId}/toggle`
  );

  return response.data.data;
}

export async function checkFavorite(propertyId: string) {
  const response = await apiClient.get(
    `/favorites/check/${propertyId}`
  );

  return response.data.favorite as boolean;
}

export async function clearFavorites() {
  const response = await apiClient.delete(
    "/favorites"
  );

  return response.data;
}