import { Router } from "express";

import { getRecommendationController } from "../controllers/recommendation.controller";

const router = Router();

/**
 * POST /api/v1/recommendation
 * Get AI Recommended Properties
 */
router.post(
  "/",
  getRecommendationController
);

export default router;