import { Router } from "express";

import {
  getProfile,
  updateProfile,
  changePassword,
  updateAvatar,
  deleteAccount,
} from "../controllers/user.controller";

import { authenticate } from "../middlewares/authenticate";

const router = Router();

/**
 * All User routes require authentication
 */
router.use(authenticate);

/**
 * GET Current User Profile
 */
router.get(
  "/profile",
  getProfile
);

/**
 * UPDATE Profile
 */
router.put(
  "/profile",
  updateProfile
);

/**
 * Change Password
 */
router.put(
  "/change-password",
  changePassword
);

/**
 * Update Avatar
 */
router.put(
  "/avatar",
  updateAvatar
);

/**
 * Delete Account
 */
router.delete(
  "/account",
  deleteAccount
);

export default router;