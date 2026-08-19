 import {
  Router,
} from "express";

import {
  generatePortfolioReportController,
} from "../controllers/report.controller";

import {
  generatePropertyReportController,
} from "../controllers/propertyReport.controller";

import {
  getInvestmentOpportunitiesController,
} from "../controllers/investmentOpportunity.controller";

import {
  downloadReportPdfController,
} from "../controllers/pdfReport.controller";

import {
  getReportHistoryController,
} from "../controllers/reportHistory.controller";

import {
  authenticate,
} from "../middlewares/authenticate";

const router = Router();

/**
 * =========================================================
 * AI Portfolio Investment Report
 * =========================================================
 *
 * POST /api/v1/reports/portfolio
 */
router.post(
  "/portfolio",
  authenticate,
  generatePortfolioReportController
);

/**
 * =========================================================
 * AI Property Report
 * =========================================================
 *
 * POST /api/v1/reports/property/:propertyId
 */
router.post(
  "/property/:propertyId",
  authenticate,
  generatePropertyReportController
);

/**
 * =========================================================
 * Investment Opportunities
 * =========================================================
 *
 * GET /api/v1/reports/investment-opportunities
 */
router.get(
  "/investment-opportunities",
  authenticate,
  getInvestmentOpportunitiesController
);

/**
 * =========================================================
 * AI Report History
 * =========================================================
 *
 * GET /api/v1/reports/history
 */
router.get(
  "/history",
  authenticate,
  getReportHistoryController
);

/**
 * =========================================================
 * Download AI Report PDF
 * =========================================================
 *
 * GET /api/v1/reports/:reportId/pdf
 */
router.get(
  "/:reportId/pdf",
  authenticate,
  downloadReportPdfController
);

export default router;