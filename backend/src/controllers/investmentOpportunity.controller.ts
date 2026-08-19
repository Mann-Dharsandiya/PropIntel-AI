import {
  Request,
  Response,
} from "express";

import {
  getInvestmentOpportunities,
} from "../services/investmentOpportunity.service";

/**
 * GET /api/v1/reports/investment-opportunities
 */
export async function getInvestmentOpportunitiesController(
  req: Request,
  res: Response
) {
  try {
    const result =
      await getInvestmentOpportunities();

    return res.status(200).json({
      success: true,

      message:
        "Investment opportunities generated successfully.",

      data: result,
    });
  } catch (error: any) {
    console.error(
      "Investment opportunities error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Unable to generate investment opportunities.",
    });
  }
}