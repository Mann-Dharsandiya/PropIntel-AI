import { body } from "express-validator";
import { validate } from "./middlewares/validate";

/**
 * ---------------------------------------------------------
 * Register Validator
 * ---------------------------------------------------------
 */
export const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  validate,
];

/**
 * ---------------------------------------------------------
 * Login Validator
 * ---------------------------------------------------------
 */
export const loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  validate,
];

/**
 * ---------------------------------------------------------
 * Forgot Password Validator
 * ---------------------------------------------------------
 */
export const forgotPasswordValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email"),

  validate,
];

/**
 * ---------------------------------------------------------
 * Reset Password Validator
 * ---------------------------------------------------------
 */
export const resetPasswordValidator = [
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  validate,
];

/**
 * ---------------------------------------------------------
 * Resend Verification Validator
 * ---------------------------------------------------------
 */
export const resendVerificationValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email"),

  validate,
];