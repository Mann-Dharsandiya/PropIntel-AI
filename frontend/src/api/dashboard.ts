 import { apiClient } from "./axios";

export interface DashboardStats {
  favorites: number;
  recentlyViewed: number;
}

export interface DashboardActivity {
  title: string;
  description: string;
  createdAt: string;
}

export interface DashboardFavorite {
  _id: string;
  title: string;
  city: string;
  price: number;
  image?: string;
}

export interface DashboardRecentlyViewed {
  _id: string;
  viewedAt: string;
  property: {
    _id: string;
    title: string;
    city: string;
    price: number;
    images: string[];
  };
}

export interface DashboardResponse {
  stats: DashboardStats;
  favorites: DashboardFavorite[];
  recentlyViewed: DashboardRecentlyViewed[];
  activities: DashboardActivity[];
}

export async function getDashboard(): Promise<DashboardResponse> {
  const response = await apiClient.get("/dashboard");
  return response.data.data;
}