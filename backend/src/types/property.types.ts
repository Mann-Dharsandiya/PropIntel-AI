 import { PropertyType } from "../models/Property.model";

export interface CreatePropertyInput {
  title: string;

  description: string;

  price: number;

  propertyType: PropertyType;

  bedrooms: number;

  bathrooms: number;

  area: number;

  address: string;

  city: string;

  locality: string;

  state: string;

  country: string;

  images?: string[];
}

export interface UpdatePropertyInput
  extends Partial<CreatePropertyInput> {}

export interface PropertyQuery {
  city?: string;

  locality?: string;

  state?: string;

  propertyType?: PropertyType;

  bedrooms?: number;

  bathrooms?: number;

  minArea?: number;

  maxArea?: number;

  minPrice?: number;

  maxPrice?: number;

  page?: number;

  limit?: number;
}