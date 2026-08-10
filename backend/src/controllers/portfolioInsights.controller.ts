 import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  getPortfolioInsights,
} from "../services/portfolioInsights.service";

export async function getPortfolioInsightsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = String(
      (req.user as any)?._id ||
        (req.user as any)?.id ||
        (req.user as any)?.sub
    );

    if (!userId) {
      return res.status(401).json({
        success: false,

        message:
          "Authentication required.",
      });
    }

    const insights =
      await getPortfolioInsights(
        userId
      );

    return res.status(200).json({
      success: true,

      message:
        "Portfolio AI insights generated successfully.",

      data: insights,
    });
  } catch (error) {
    next(error);
  }
}