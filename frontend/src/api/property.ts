 import { apiClient } from "./axios";

export interface PropertyOwner {
  _id?: string;
  name: string;
  email: string;
  phone: string;
}

export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  address: string;
  city: string;
  state: string;
  country: string;
  images: string[];
  owner?: PropertyOwner;
}

export interface PropertyFilters {
  city?: string;
  propertyType?: string;
  bedrooms?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: number;
  limit?: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PropertyResponse {
  properties: Property[];
  pagination: Pagination;
}

export async function getProperties(
  filters?: PropertyFilters
): Promise<PropertyResponse> {
  const response = await apiClient.get("/properties", {
    params: filters,
  });

  return response.data.data;
}

export async function getProperty(
  id: string
): Promise<Property> {
  const response = await apiClient.get(
    `/properties/${id}`
  );

  return response.data.data;
}