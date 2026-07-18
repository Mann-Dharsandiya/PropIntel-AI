 import { PropertyModel } from "../models/Property.model";

export interface RecommendationRequest {
  budget: number;

  city: string;

  locality?: string;

  propertyType: string;

  bedrooms: number;

  bathrooms: number;

  minArea: number;
}

export async function getRecommendations(
  filters: RecommendationRequest
) {
  const properties =
    await PropertyModel.find({
      status: "available",
    }).populate(
      "owner",
      "name email phone"
    );

  const scoredProperties =
    properties.map((property) => {

      let score = 0;

      // --------------------
      // Budget (30)
      // --------------------

      if (
        property.price <=
        filters.budget
      ) {
        score += 30;
      } else {

        const diff =
          property.price -
          filters.budget;

        const percent =
          diff / filters.budget;

        if (percent <= 0.10) {
          score += 25;
        } else if (
          percent <= 0.20
        ) {
          score += 18;
        } else if (
          percent <= 0.30
        ) {
          score += 10;
        }

      }

      // --------------------
      // City (20)
      // --------------------

      if (
        property.city
          .toLowerCase()
          .trim() ===
        filters.city
          .toLowerCase()
          .trim()
      ) {
        score += 20;
      }

      // --------------------
      // ⭐ Locality (20)
      // --------------------

      if (
        filters.locality &&
        property.locality
          .toLowerCase()
          .trim() ===
        filters.locality
          .toLowerCase()
          .trim()
      ) {
        score += 20;
      }

      // --------------------
      // Property Type (10)
      // --------------------

      if (
        property.propertyType
          .toLowerCase() ===
        filters.propertyType
          .toLowerCase()
      ) {
        score += 10;
      }

      // --------------------
      // Bedrooms (10)
      // --------------------

      const bedroomDiff =
        Math.abs(
          property.bedrooms -
            filters.bedrooms
        );

      if (bedroomDiff === 0) {
        score += 10;
      } else if (
        bedroomDiff === 1
      ) {
        score += 6;
      }

      // --------------------
      // Bathrooms (5)
      // --------------------

      const bathroomDiff =
        Math.abs(
          property.bathrooms -
            filters.bathrooms
        );

      if (bathroomDiff === 0) {
        score += 5;
      } else if (
        bathroomDiff === 1
      ) {
        score += 3;
      }

      // --------------------
      // Area (5)
      // --------------------

      if (
        property.area >=
        filters.minArea
      ) {
        score += 5;
      } else {

        const ratio =
          property.area /
          filters.minArea;

        score += Math.round(
          ratio * 5
        );

      }

      return {
        ...property.toObject(),
        matchScore: score,
      };

    });

  scoredProperties.sort(
    (a, b) =>
      b.matchScore -
      a.matchScore
  );

  return scoredProperties.slice(
    0,
    5
  );
}