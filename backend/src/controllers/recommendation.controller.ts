import { Request, Response, NextFunction } from "express";

import {
  getRecommendations,
  RecommendationRequest,
} from "../services/recommendation.service";

export async function getRecommendationController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const recommendations =
      await getRecommendations(
        req.body as RecommendationRequest
      );

    return res.status(200).json({
      success: true,
      message:
        "Recommended properties fetched successfully",
      data: recommendations,
    });
  } catch (error) {
    next(error);
  }
}