 import { Router } from "express";

import healthRoutes from "./health.routes";
import authRoutes from "./auth.routes";
import propertyRoutes from "./property.routes";
import localityRoutes from "./locality.routes";
import recommendationRoutes from "./recommendation.routes";
import mlRoutes from "./ml.routes";
import userRoutes from "./user.routes";
import favoriteRoutes from "./favorite.routes";
import dashboardRoutes from "./dashboard.routes";
import portfolioRoutes from "./portfolio.routes";
import portfolioInsightsRoutes from "./portfolioInsights.routes";

import advisorRoutes from "../ai/advisor.routes";

const router = Router();

/**
 * Health
 */
router.use(
  "/health",
  healthRoutes
);

/**
 * Authentication
 */
router.use(
  "/auth",
  authRoutes
);

/**
 * Users
 */
router.use(
  "/users",
  userRoutes
);

/**
 * Dashboard
 */
router.use(
  "/dashboard",
  dashboardRoutes
);

/**
 * Properties
 */
router.use(
  "/properties",
  propertyRoutes
);

/**
 * Favorites
 */
router.use(
  "/favorites",
  favoriteRoutes
);

/**
 * Portfolio
 */
router.use(
  "/portfolio",
  portfolioRoutes
);

/**
 * AI Portfolio Insights
 */
router.use(
  "/portfolio-insights",
  portfolioInsightsRoutes
);

/**
 * ML
 */
router.use(
  "/ml",
  mlRoutes
);

/**
 * Recommendation
 */
router.use(
  "/recommendation",
  recommendationRoutes
);

/**
 * Localities
 */
router.use(
  "/localities",
  localityRoutes
);

/**
 * AI Smart Advisor
 */
router.use(
  "/advisor",
  advisorRoutes
);

export default router;