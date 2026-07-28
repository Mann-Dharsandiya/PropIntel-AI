 import { Router } from "express";

import {
  register,
  login,
  me,
  refreshToken,
  logout,
  forgotPasswordController,
  resetPasswordController,
  verifyEmailController,
  resendVerificationController,
} from "../controllers/auth.controller";

import { authenticate } from "../middlewares/authenticate";

import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  resendVerificationValidator,
} from "../authValidators";

const router = Router();

/* ======================================================
   Public Routes
====================================================== */

router.post(
  "/register",
  registerValidator,
  register,
);

router.post(
  "/login",
  loginValidator,
  login,
);

router.post(
  "/forgot-password",
  forgotPasswordValidator,
  forgotPasswordController,
);

router.post(
  "/reset-password/:token",
  resetPasswordValidator,
  resetPasswordController,
);

router.get(
  "/verify-email/:token",
  verifyEmailController,
);

router.post(
  "/resend-verification",
  resendVerificationValidator,
  resendVerificationController,
);

router.post(
  "/refresh-token",
  refreshToken,
);

router.post(
  "/logout",
  logout,
);

/* ======================================================
   Protected Routes
====================================================== */

router.get(
  "/me",
  authenticate,
  me,
);

export default router;