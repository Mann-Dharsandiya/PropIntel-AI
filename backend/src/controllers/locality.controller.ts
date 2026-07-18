 import { Request, Response, NextFunction } from "express";

import {
  getAllLocalities,
  getLocalityInsights,
  getPropertiesByLocality,
  getPriceTrend,
  compareLocalities,
  getRecommendationExplanation,
} from "../services/locality.service";

/**
 * GET /api/v1/localities
 */
export async function getAllLocalitiesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const localities = await getAllLocalities();

    return res.status(200).json({
      success: true,
      message: "Localities fetched successfully",
      data: localities,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/localities/:city/:locality
 */
export async function getLocalityInsightsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { city, locality } = req.params;

    const insights = await getLocalityInsights(
      city,
      locality
    );

    return res.status(200).json({
      success: true,
      message: "Locality insights fetched successfully",
      data: insights,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/localities/:city/:locality/properties
 *
 * Supported Query Parameters:
 * ?propertyType=Apartment
 * &bedrooms=2
 * &minPrice=5000000
 * &maxPrice=10000000
 * &minArea=800
 * &maxArea=1500
 */
export async function getPropertiesByLocalityController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { city, locality } = req.params;

    const {
      propertyType,
      bedrooms,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
    } = req.query;

    const properties =
      await getPropertiesByLocality(
        city,
        locality,
        {
          propertyType:
            propertyType as string,

          bedrooms: bedrooms
            ? Number(bedrooms)
            : undefined,

          minPrice: minPrice
            ? Number(minPrice)
            : undefined,

          maxPrice: maxPrice
            ? Number(maxPrice)
            : undefined,

          minArea: minArea
            ? Number(minArea)
            : undefined,

          maxArea: maxArea
            ? Number(maxArea)
            : undefined,
        }
      );

    return res.status(200).json({
      success: true,
      message:
        "Properties fetched successfully",
      data: properties,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/localities/:city/:locality/trend
 */
export async function getPriceTrendController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { city, locality } = req.params;

    const trend = await getPriceTrend(
      city,
      locality
    );

    return res.status(200).json({
      success: true,
      message:
        "Price trend fetched successfully",
      data: trend,
    });
  } catch (error) {
    next(error);
  }
}
/**
 * GET /api/v1/localities/compare
 *
 * Example:
 * /compare?city1=Mumbai&locality1=Borivali West&city2=Mumbai&locality2=Andheri East
 */
export async function compareLocalitiesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      city1,
      locality1,
      city2,
      locality2,
    } = req.query;

    if (
      !city1 ||
      !locality1 ||
      !city2 ||
      !locality2
    ) {
      return res.status(400).json({
        success: false,
        message:
          "city1, locality1, city2 and locality2 are required.",
      });
    }

    const comparison =
      await compareLocalities(
        city1 as string,
        locality1 as string,
        city2 as string,
        locality2 as string
      );

    return res.status(200).json({
      success: true,
      message:
        "Comparison fetched successfully",
      data: comparison,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/localities/:city/:locality/explanation
 */
export async function getRecommendationExplanationController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { city, locality } = req.params;

    const explanation =
      await getRecommendationExplanation(
        city,
        locality
      );

    return res.status(200).json({
      success: true,
      message:
        "Investment explanation generated successfully",
      data: explanation,
    });
  } catch (error) {
    next(error);
  }
}