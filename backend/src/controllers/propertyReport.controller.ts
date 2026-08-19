import {
  Request,
  Response,
} from "express";

import {
  generatePropertyReport,
} from "../services/propertyReport.service";

/**
 * Generate AI Property Report
 *
 * POST /api/v1/reports/property/:propertyId
 */
export async function generatePropertyReportController(
  req: Request,
  res: Response
) {
  try {
    const userId =
      (req as any).user?._id ||
      (req as any).user?.id;

    const {
      propertyId,
    } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required.",
      });
    }

    if (!propertyId) {
      return res.status(400).json({
        success: false,
        message:
          "Property ID is required.",
      });
    }

    const result =
      await generatePropertyReport(
        String(userId),
        propertyId
      );

    return res.status(201).json({
      success: true,
      message:
        "AI property report generated successfully.",
      data: result.report,
    });
  } catch (error: any) {
    console.error(
      "Generate property report error:",
      error
    );

    if (
      error?.message ===
      "Invalid property ID."
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error?.message ===
      "Invalid user ID."
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error?.message ===
      "Property not found."
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Unable to generate AI property report.",
    });
  }
}