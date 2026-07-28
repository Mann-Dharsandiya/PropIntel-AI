 import { UserModel, IUser } from "../models/User.model";
import {
  RegisterInput,
  LoginInput,
  AuthResponse,
  JwtPayload,
} from "../types/auth.types";

import { generateTokens } from "./token.service";

import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "./email.service";

import { ApiError } from "../utils/ApiError";

import crypto from "crypto";

const EMAIL_VERIFY_EXPIRES = 24 * 60 * 60 * 1000;

/**
 * ---------------------------------------------------------
 * Generate Secure Token
 * ---------------------------------------------------------
 */
function generateSecureToken() {
  const token = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  return {
    token,
    hashedToken,
  };
}

/**
 * ---------------------------------------------------------
 * Register User
 * ---------------------------------------------------------
 */
export async function registerUser(
  input: RegisterInput,
): Promise<AuthResponse> {
  const existingUser = await UserModel.findOne({
    email: input.email.toLowerCase(),
  });

  if (existingUser) {
    throw ApiError.badRequest("Email already exists");
  }

  const user = await UserModel.create({
    name: input.name,
    email: input.email.toLowerCase(),
    phone: input.phone,
    password: input.password,
    role: input.role ?? "buyer",
  });

  /**
   * Generate Verification Token
   */
  const {
    token,
    hashedToken,
  } = generateSecureToken();

  user.emailVerificationToken = hashedToken;

  user.emailVerificationExpires = new Date(
    Date.now() + EMAIL_VERIFY_EXPIRES,
  );

  await user.save();

  /**
   * Verification URL
   */

  const verificationUrl =
    `${process.env.CLIENT_ORIGIN}/verify-email/${token}`;

  await sendVerificationEmail(
    user.email,
    user.name,
    verificationUrl,
  );

  /**
   * JWT
   */

  const payload: JwtPayload = {
    _id: user.id,
    sub: user.id,
    email: user.email,
    role: user.role,
  };

  const tokens = generateTokens(payload);

  return {
    user,
    tokens,
  };
}

/**
 * ---------------------------------------------------------
 * Login
 * ---------------------------------------------------------
 */
export async function loginUser(
  input: LoginInput,
): Promise<AuthResponse> {

  const user = await UserModel.findOne({
    email: input.email.toLowerCase(),
  }).select("+password");

  if (!user) {
    throw ApiError.unauthorized(
      "Invalid email or password",
    );
  }

  const isMatch = await user.comparePassword(
    input.password,
  );

  if (!isMatch) {
    throw ApiError.unauthorized(
      "Invalid email or password",
    );
  }

  /**
   * Email must be verified
   */

  if (!user.isVerified) {
    throw ApiError.unauthorized(
      "Please verify your email before logging in.",
    );
  }

  const payload: JwtPayload = {
    _id: user.id,
    sub: user.id,
    email: user.email,
    role: user.role,
  };

  const tokens = generateTokens(payload);

  return {
    user,
    tokens,
  };
}

/**
 * ---------------------------------------------------------
 * Get User
 * ---------------------------------------------------------
 */

export async function getUserById(
  id: string,
): Promise<IUser> {

  const user = await UserModel.findById(id);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return user;
}

/**
 * ---------------------------------------------------------
 * Generate Password Reset Token
 * ---------------------------------------------------------
 */

function generateResetToken() {
  const token = crypto
    .randomBytes(32)
    .toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  return {
    token,
    hashedToken,
  };
}
/**
 * ---------------------------------------------------------
 * Forgot Password
 * ---------------------------------------------------------
 */
export async function forgotPassword(email: string) {
  const user = await UserModel.findOne({
    email: email.toLowerCase(),
  });

  /**
   * Don't reveal whether user exists
   */
  if (!user) {
    return {
      success: true,
      message:
        "If an account exists with this email, a password reset link has been sent.",
    };
  }

  const { token, hashedToken } = generateResetToken();

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = new Date(
    Date.now() + 15 * 60 * 1000,
  );

  await user.save();

  const resetUrl = `${process.env.CLIENT_ORIGIN}/reset-password/${token}`;

  await sendPasswordResetEmail(
    user.email,
    user.name,
    resetUrl,
  );

  return {
    success: true,
    message:
      "Password reset link has been sent to your email.",
  };
}

/**
 * ---------------------------------------------------------
 * Reset Password
 * ---------------------------------------------------------
 */
export async function resetPassword(
  token: string,
  password: string,
) {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await UserModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: new Date(),
    },
  }).select("+password");

  if (!user) {
    throw ApiError.badRequest(
      "Invalid or expired password reset token.",
    );
  }

  user.password = password;

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  return {
    success: true,
    message:
      "Password has been reset successfully.",
  };
}

/**
 * ---------------------------------------------------------
 * Verify Email
 * ---------------------------------------------------------
 */
export async function verifyEmail(token: string) {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await UserModel.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: {
      $gt: new Date(),
    },
  });

  if (!user) {
    throw ApiError.badRequest(
      "Invalid or expired verification link.",
    );
  }

  user.isVerified = true;

  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;

  await user.save();

  return {
    success: true,
    message:
      "Email verified successfully.",
  };
}

/**
 * ---------------------------------------------------------
 * Resend Verification Email
 * ---------------------------------------------------------
 */
export async function resendVerificationEmail(
  email: string,
) {
  const user = await UserModel.findOne({
    email: email.toLowerCase(),
  });

  if (!user) {
    throw ApiError.notFound("User not found.");
  }

  if (user.isVerified) {
    throw ApiError.badRequest(
      "Email is already verified.",
    );
  }

  const { token, hashedToken } =
    generateSecureToken();

  user.emailVerificationToken = hashedToken;

  user.emailVerificationExpires = new Date(
    Date.now() + EMAIL_VERIFY_EXPIRES,
  );

  await user.save();

  const verificationUrl =
    `${process.env.CLIENT_ORIGIN}/verify-email/${token}`;

  await sendVerificationEmail(
    user.email,
    user.name,
    verificationUrl,
  );

  return {
    success: true,
    message:
      "Verification email sent successfully.",
  };
}