import { Router } from "express";
import { predictPriceController } from "../controllers/ml.controller";

const router = Router();

router.post(
  "/predict-price",
  predictPriceController
);

export default router;