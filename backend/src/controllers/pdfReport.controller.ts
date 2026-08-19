import {
  Request,
  Response,
} from "express";

import {
  generateReportPdf,
} from "../services/pdfReport.service";

/**
 * Download AI report as PDF
 *
 * GET /api/v1/reports/:reportId/pdf
 */
export async function downloadReportPdfController(
  req: Request,
  res: Response
) {
  try {
    const {
      reportId,
    } = req.params;

    /**
     * authenticate middleware should
     * attach the logged-in user.
     *
     * Adjust this if your project uses
     * a different property name.
     */
    const userId =
      (req as any).user?.id ||
      (req as any).user?._id ||
      (req as any).user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication information not found.",
      });
    }

    const {
      buffer,
      filename,
    } =
      await generateReportPdf(
        reportId,
        String(userId)
      );

    /**
     * PDF headers
     */
    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}"`
    );

    res.setHeader(
      "Content-Length",
      buffer.length
    );

    return res.status(200).send(
      buffer
    );
  } catch (error: any) {
    console.error(
      "PDF report error:",
      error
    );

    if (
      error?.message ===
      "AI report not found."
    ) {
      return res.status(404).json({
        success: false,
        message:
          "AI report not found.",
      });
    }

    if (
      error?.message ===
      "Invalid report ID."
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid report ID.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Unable to generate PDF report.",
    });
  }
}