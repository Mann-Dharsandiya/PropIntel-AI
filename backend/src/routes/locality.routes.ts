 import { Router } from "express";

import {
  getAllLocalitiesController,
  getLocalityInsightsController,
  getPropertiesByLocalityController,
  getPriceTrendController,
  compareLocalitiesController,
  getRecommendationExplanationController,
} from "../controllers/locality.controller";

const router = Router();

/**
 * GET /api/v1/localities
 * List all available localities
 */
router.get(
  "/",
  getAllLocalitiesController
);

/**
 * GET /api/v1/localities/compare
 *
 * Example:
 * /api/v1/localities/compare?city1=Mumbai&locality1=Borivali%20West&city2=Mumbai&locality2=Andheri%20East
 *
 * IMPORTANT:
 * Keep this route ABOVE "/:city/:locality"
 */
router.get(
  "/compare",
  compareLocalitiesController
);

/**
 * GET /api/v1/localities/:city/:locality
 * Get locality intelligence
 */
router.get(
  "/:city/:locality",
  getLocalityInsightsController
);

/**
 * GET /api/v1/localities/:city/:locality/properties
 */
router.get(
  "/:city/:locality/properties",
  getPropertiesByLocalityController
);

/**
 * GET /api/v1/localities/:city/:locality/trend
 */
router.get(
  "/:city/:locality/trend",
  getPriceTrendController
);

/**
 * GET /api/v1/localities/:city/:locality/explanation
 */
router.get(
  "/:city/:locality/explanation",
  getRecommendationExplanationController
);

export default router;