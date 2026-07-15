 import { Router } from "express";

import healthRoutes from "./health.routes";
import authRoutes from "./auth.routes";
import propertyRoutes from "./property.routes";
import mlRoutes from "./ml.routes";
import recommendationRoutes from "./recommendation.routes";

const router = Router();

/**
 * Health Routes
 */
router.use("/health", healthRoutes);

/**
 * Authentication Routes
 */
router.use("/auth", authRoutes);

/**
 * Property Routes
 */
router.use("/properties", propertyRoutes);

/**
 * AI Price Prediction Routes
 */
router.use("/ml", mlRoutes);

/**
 * AI Recommendation Routes
 */
router.use(
  "/recommendation",
  recommendationRoutes
);

export default router;