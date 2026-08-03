 import { Router } from "express";
import { advisorController } from "./advisor.controller";

const router = Router();

router.post("/chat", advisorController);

export default router;