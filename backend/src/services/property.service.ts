 import { Types } from "mongoose";

import { PropertyModel } from "../models/Property.model";

import {
  CreatePropertyInput,
  UpdatePropertyInput,
  PropertyQuery,
} from "../types/property.types";

import { ApiError } from "../utils/ApiError";

export async function createProperty(
  data: CreatePropertyInput,
  ownerId: string
) {
  return await PropertyModel.create({
    ...data,
    owner: new Types.ObjectId(ownerId),
  });
}

export async function getProperties(
  query: PropertyQuery
) {
  const filter: Record<string, unknown> = {};

  // -----------------------
  // City
  // -----------------------

  if (query.city) {
    filter.city = {
      $regex: query.city,
      $options: "i",
    };
  }

  // -----------------------
  // Locality
  // -----------------------

  if (query.locality) {
    filter.locality = {
      $regex: query.locality,
      $options: "i",
    };
  }

  // -----------------------
  // State
  // -----------------------

  if (query.state) {
    filter.state = {
      $regex: query.state,
      $options: "i",
    };
  }

  // -----------------------
  // Property Type
  // -----------------------

  if (query.propertyType) {
    filter.propertyType =
      query.propertyType;
  }

  // -----------------------
  // Bedrooms
  // -----------------------

  if (query.bedrooms) {
    filter.bedrooms =
      Number(query.bedrooms);
  }

  // -----------------------
  // Bathrooms
  // -----------------------

  if (query.bathrooms) {
    filter.bathrooms =
      Number(query.bathrooms);
  }

  // -----------------------
  // Area
  // -----------------------

  if (
    query.minArea ||
    query.maxArea
  ) {
    filter.area = {};

    if (query.minArea) {
      (
        filter.area as Record<
          string,
          number
        >
      ).$gte = Number(
        query.minArea
      );
    }

    if (query.maxArea) {
      (
        filter.area as Record<
          string,
          number
        >
      ).$lte = Number(
        query.maxArea
      );
    }
  }

  // -----------------------
  // Price
  // -----------------------

  if (
    query.minPrice ||
    query.maxPrice
  ) {
    filter.price = {};

    if (query.minPrice) {
      (
        filter.price as Record<
          string,
          number
        >
      ).$gte = Number(
        query.minPrice
      );
    }

    if (query.maxPrice) {
      (
        filter.price as Record<
          string,
          number
        >
      ).$lte = Number(
        query.maxPrice
      );
    }
  }

  // -----------------------
  // Only Available
  // -----------------------

  filter.status = "available";

  // -----------------------
  // Pagination
  // -----------------------

  const page =
    Number(query.page) || 1;

  const limit =
    Number(query.limit) || 10;

  const skip =
    (page - 1) * limit;

  const properties =
    await PropertyModel.find(filter)
      .populate(
        "owner",
        "name email phone"
      )
      .sort({
        price: 1,
      })
      .skip(skip)
      .limit(limit);

  const total =
    await PropertyModel.countDocuments(
      filter
    );

  return {
    properties,

    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(
        total / limit
      ),
    },
  };
}

export async function getPropertyById(
  id: string
) {
  const property =
    await PropertyModel.findById(id)
      .populate(
        "owner",
        "name email phone"
      );

  if (!property) {
    throw ApiError.notFound(
      "Property not found"
    );
  }

  return property;
}

export async function updateProperty(
  id: string,
  data: UpdatePropertyInput
) {
  const property =
    await PropertyModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!property) {
    throw ApiError.notFound(
      "Property not found"
    );
  }

  return property;
}

export async function deleteProperty(
  id: string
) {
  const property =
    await PropertyModel.findByIdAndDelete(
      id
    );

  if (!property) {
    throw ApiError.notFound(
      "Property not found"
    );
  }
}