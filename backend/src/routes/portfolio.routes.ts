import { Router } from "express";

import { PortfolioController } from "../controllers/portfolio.controller";

import { authenticate } from "../middlewares/authenticate";

const router = Router();

const controller =
  new PortfolioController();

/*
 * All portfolio routes
 * require authentication.
 */

router.use(authenticate);

/**
 * GET /portfolio
 */
router.get(
  "/",
  controller.getAll.bind(controller)
);

/**
 * GET /portfolio/summary
 *
 * IMPORTANT:
 * Keep this BEFORE /:id
 */
router.get(
  "/summary",
  controller.getSummary.bind(controller)
);

/**
 * GET /portfolio/:id
 */
router.get(
  "/:id",
  controller.getById.bind(controller)
);

/**
 * POST /portfolio
 */
router.post(
  "/",
  controller.create.bind(controller)
);

/**
 * PUT /portfolio/:id
 */
router.put(
  "/:id",
  controller.update.bind(controller)
);

/**
 * DELETE /portfolio/:id
 */
router.delete(
  "/:id",
  controller.delete.bind(controller)
);

export default router;