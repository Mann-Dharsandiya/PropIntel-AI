import { apiClient } from "./axios";
import { Property } from "./property";

export interface RecentlyViewed {
  _id: string;
  property: Property;
  viewedAt: string;
}

export async function getRecentlyViewed() {
  const response = await apiClient.get("/recently-viewed");

  return response.data.data as RecentlyViewed[];
}

export async function addRecentlyViewed(
  propertyId: string
) {
  const response = await apiClient.post(
    `/recently-viewed/${propertyId}`
  );

  return response.data;
}

export async function clearRecentlyViewed() {
  const response = await apiClient.delete(
    "/recently-viewed"
  );

  return response.data;
}