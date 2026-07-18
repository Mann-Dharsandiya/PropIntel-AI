 import { apiClient } from "./axios";

export interface LocalityProperty {
  _id: string;

  title: string;

  city: string;

  locality: string;

  propertyType: string;

  bedrooms: number;

  bathrooms: number;

  area: number;

  price: number;

  imageUrl?: string;

  status?: string;
}

export interface PropertyFilters {
  propertyType?: string;

  bedrooms?: number;

  minPrice?: number;

  maxPrice?: number;

  minArea?: number;

  maxArea?: number;
}

export async function getLocalityProperties(
  city: string,
  locality: string,
  filters?: PropertyFilters
): Promise<LocalityProperty[]> {
  const params = new URLSearchParams();

  if (filters?.propertyType) {
    params.append(
      "propertyType",
      filters.propertyType
    );
  }

  if (filters?.bedrooms !== undefined) {
    params.append(
      "bedrooms",
      filters.bedrooms.toString()
    );
  }

  if (filters?.minPrice !== undefined) {
    params.append(
      "minPrice",
      filters.minPrice.toString()
    );
  }

  if (filters?.maxPrice !== undefined) {
    params.append(
      "maxPrice",
      filters.maxPrice.toString()
    );
  }

  if (filters?.minArea !== undefined) {
    params.append(
      "minArea",
      filters.minArea.toString()
    );
  }

  if (filters?.maxArea !== undefined) {
    params.append(
      "maxArea",
      filters.maxArea.toString()
    );
  }

  const endpoint =
    params.toString().length > 0
      ? `/localities/${encodeURIComponent(
          city
        )}/${encodeURIComponent(
          locality
        )}/properties?${params.toString()}`
      : `/localities/${encodeURIComponent(
          city
        )}/${encodeURIComponent(
          locality
        )}/properties`;

  const response =
    await apiClient.get(endpoint);

  return response.data.data;
}