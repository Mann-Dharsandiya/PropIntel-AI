 import { Router } from "express";

import {
  authenticate,
} from "../middlewares/authenticate";

import {
  getPortfolioInsightsController,
} from "../controllers/portfolioInsights.controller";

const router =
  Router();

/**
 * All Portfolio Insight
 * routes require authentication.
 */
router.use(authenticate);

/**
 * GET
 *
 * /api/v1/portfolio-insights
 */
router.get(
  "/",
  getPortfolioInsightsController
);

export default router;