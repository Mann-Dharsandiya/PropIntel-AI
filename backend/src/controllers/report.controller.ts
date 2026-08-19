 import {
  Request,
  Response,
} from "express";

import {
  generatePortfolioReport,
} from "../services/report.service";

/**
 * =========================================================
 * Generate AI Portfolio Investment Report
 * =========================================================
 *
 * POST /api/v1/reports/portfolio
 */
export async function generatePortfolioReportController(
  req: Request,
  res: Response
) {
  try {
    const userId =
      (req as any).user?._id ||
      (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required.",
      });
    }

    const result =
      await generatePortfolioReport(
        String(userId)
      );

    return res.status(201).json({
      success: true,
      message:
        "AI investment report generated successfully.",
      data: result.report,
    });
  } catch (error: any) {
    console.error(
      "Generate portfolio report error:",
      error
    );

    if (
      error?.message?.includes(
        "No portfolio investments"
      )
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error?.message?.includes(
        "Invalid user ID"
      )
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Unable to generate AI investment report.",
    });
  }
}