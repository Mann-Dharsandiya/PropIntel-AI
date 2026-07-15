 import { PropertyModel } from "../models/Property.model";

export interface RecommendationRequest {
  budget: number;
  city: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  minArea: number;
}

export async function getRecommendations(
  filters: RecommendationRequest
) {
  // Fetch all available properties
  const properties = await PropertyModel.find({
    status: "available",
  }).populate("owner", "name email phone");

  const scoredProperties = properties.map((property) => {
    let score = 0;

    // -------------------------
    // Budget (30)
    // -------------------------
    if (property.price <= filters.budget) {
      score += 30;
    } else {
      const difference = property.price - filters.budget;
      const percentage = difference / filters.budget;

      if (percentage <= 0.10) {
        score += 25;
      } else if (percentage <= 0.20) {
        score += 18;
      } else if (percentage <= 0.30) {
        score += 10;
      }
    }

    // -------------------------
    // City (20)
    // -------------------------
    if (
      property.city.toLowerCase() ===
      filters.city.toLowerCase()
    ) {
      score += 20;
    }

    // -------------------------
    // Property Type (15)
    // -------------------------
    if (
      property.propertyType.toLowerCase() ===
      filters.propertyType.toLowerCase()
    ) {
      score += 15;
    }

    // -------------------------
    // Bedrooms (15)
    // -------------------------
    const bedroomDifference = Math.abs(
      property.bedrooms - filters.bedrooms
    );

    if (bedroomDifference === 0) {
      score += 15;
    } else if (bedroomDifference === 1) {
      score += 10;
    } else if (bedroomDifference === 2) {
      score += 5;
    }

    // -------------------------
    // Bathrooms (10)
    // -------------------------
    const bathroomDifference = Math.abs(
      property.bathrooms - filters.bathrooms
    );

    if (bathroomDifference === 0) {
      score += 10;
    } else if (bathroomDifference === 1) {
      score += 5;
    }

    // -------------------------
    // Area (10)
    // -------------------------
    if (property.area >= filters.minArea) {
      score += 10;
    } else {
      const ratio =
        property.area / filters.minArea;

      score += Math.round(ratio * 10);
    }

    return {
      ...property.toObject(),
      matchScore: score,
    };
  });

  scoredProperties.sort(
    (a, b) => b.matchScore - a.matchScore
  );

  return scoredProperties.slice(0, 5);
}