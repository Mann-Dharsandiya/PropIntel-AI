import { Request, Response, NextFunction } from "express";

import {
  UserService,
  UpdateProfileInput,
  ChangePasswordInput,
} from "../services/user.service";

import { ApiError } from "../utils/ApiError";

/**
 * GET /users/profile
 */
export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = (req as any).user;

    if (!payload) {
      throw ApiError.unauthorized();
    }

    const user = await UserService.getProfile(payload.sub);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /users/profile
 */
export async function updateProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = (req as any).user;

    if (!payload) {
      throw ApiError.unauthorized();
    }

    const body: UpdateProfileInput = {
      name: req.body.name,
      phone: req.body.phone,
      profileImage: req.body.profileImage,
    };

    const user = await UserService.updateProfile(
      payload.sub,
      body
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /users/change-password
 */
export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = (req as any).user;

    if (!payload) {
      throw ApiError.unauthorized();
    }

    const body: ChangePasswordInput = {
      currentPassword: req.body.currentPassword,
      newPassword: req.body.newPassword,
    };

    await UserService.changePassword(
      payload.sub,
      body
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /users/avatar
 */
export async function updateAvatar(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = (req as any).user;

    if (!payload) {
      throw ApiError.unauthorized();
    }

    const imageUrl = req.body.profileImage;

    if (!imageUrl) {
      throw ApiError.badRequest(
        "Profile image is required"
      );
    }

    const user = await UserService.updateAvatar(
      payload.sub,
      imageUrl
    );

    res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /users/account
 */
export async function deleteAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = (req as any).user;

    if (!payload) {
      throw ApiError.unauthorized();
    }

    await UserService.deleteAccount(payload.sub);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}