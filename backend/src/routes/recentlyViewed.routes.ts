import { Router } from "express";
import { RecentlyViewedController } from "../controllers/recentlyViewed.controller";
import { authenticate } from "../middlewares/authenticate";

const router = Router();
const controller = new RecentlyViewedController();

router.use(authenticate);

router.get(
  "/",
  controller.getAll.bind(controller)
);

router.post(
  "/:propertyId",
  controller.add.bind(controller)
);

router.delete(
  "/",
  controller.clear.bind(controller)
);

export default router;