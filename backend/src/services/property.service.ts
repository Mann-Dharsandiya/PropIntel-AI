import { Types } from 'mongoose';

import { PropertyModel } from '../models/Property.model';
import {
  CreatePropertyInput,
  UpdatePropertyInput,
  PropertyQuery,
} from '../types/property.types';

import { ApiError } from '../utils/ApiError';

export async function createProperty(
  data: CreatePropertyInput,
  ownerId: string,
) {
  const property = await PropertyModel.create({
    ...data,
    owner: new Types.ObjectId(ownerId),
  });

  return property;
}

export async function getProperties(
  query: PropertyQuery,
) {
  const filter: Record<string, unknown> = {};

  if (query.city) {
    filter.city = query.city;
  }

  if (query.state) {
    filter.state = query.state;
  }

  if (query.propertyType) {
    filter.propertyType = query.propertyType;
  }

  if (query.bedrooms) {
    filter.bedrooms = query.bedrooms;
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};

    if (query.minPrice) {
      (filter.price as Record<string, number>).$gte =
        query.minPrice;
    }

    if (query.maxPrice) {
      (filter.price as Record<string, number>).$lte =
        query.maxPrice;
    }
  }

  const page = query.page ?? 1;
  const limit = query.limit ?? 10;

  const skip = (page - 1) * limit;

  const properties = await PropertyModel.find(filter)
    .populate('owner', 'name email phone')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await PropertyModel.countDocuments(filter);

  return {
    properties,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

export async function getPropertyById(id: string) {
  const property = await PropertyModel.findById(id)
    .populate('owner', 'name email phone');

  if (!property) {
    throw ApiError.notFound('Property not found');
  }

  return property;
}

export async function updateProperty(
  id: string,
  data: UpdatePropertyInput,
) {
  const property = await PropertyModel.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!property) {
    throw ApiError.notFound('Property not found');
  }

  return property;
}

export async function deleteProperty(id: string) {
  const property = await PropertyModel.findByIdAndDelete(id);

  if (!property) {
    throw ApiError.notFound('Property not found');
  }

  return;
}