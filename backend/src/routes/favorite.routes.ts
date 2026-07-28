 import { Router } from "express";
import { FavoriteController } from "../controllers/favorite.controller";
import { authenticate } from "../middlewares/authenticate";

const router = Router();
const controller = new FavoriteController();

router.use(authenticate);

router.get("/", controller.getFavorites.bind(controller));

router.post(
  "/:propertyId",
  controller.addFavorite.bind(controller)
);

router.delete(
  "/:propertyId",
  controller.removeFavorite.bind(controller)
);

router.patch(
  "/:propertyId/toggle",
  controller.toggleFavorite.bind(controller)
);

router.get(
  "/check/:propertyId",
  controller.checkFavorite.bind(controller)
);

router.delete(
  "/",
  controller.clearFavorites.bind(controller)
);

export default router;