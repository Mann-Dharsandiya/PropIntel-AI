 import {
  Request,
  Response,
} from "express";

import {
  getReportHistory,
} from "../services/reportHistory.service";

/**
 * =========================================================
 * Get AI Report History
 * =========================================================
 *
 * GET /api/v1/reports/history
 */
export async function getReportHistoryController(
  req: Request,
  res: Response
) {
  try {
    /**
     * Get authenticated user ID
     */
    const userId =
      (req as any).user?._id ||
      (req as any).user?.id;

    /**
     * User not authenticated
     */
    if (!userId) {
      return res
        .status(401)
        .json({
          success: false,

          message:
            "Authentication required.",
        });
    }

    /**
     * Get report history
     */
    const result =
      await getReportHistory(
        String(userId)
      );

    /**
     * Success response
     */
    return res
      .status(200)
      .json({
        success: true,

        message:
          "Report history fetched successfully.",

        data: result,
      });
  } catch (error: any) {
    console.error(
      "Get report history error:",
      error
    );

    /**
     * Invalid MongoDB ID
     */
    if (
      error?.message?.includes(
        "Invalid user ID"
      )
    ) {
      return res
        .status(400)
        .json({
          success: false,

          message:
            error.message,
        });
    }

    /**
     * Unknown server error
     */
    return res
      .status(500)
      .json({
        success: false,

        message:
          "Unable to fetch report history.",
      });
  }
}