import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";
import { authenticate } from "../middlewares/authenticate";

const router = Router();
const controller = new DashboardController();

router.get("/", authenticate, controller.getDashboard.bind(controller));

export default router;