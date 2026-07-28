import bcrypt from "bcryptjs";

import { UserModel, IUser } from "../models/User.model";
import { ApiError } from "../utils/ApiError";

export interface UpdateProfileInput {
  name: string;
  phone: string;
  profileImage?: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export class UserService {
  /**
   * Get profile by user id
   */
  static async getProfile(userId: string): Promise<IUser> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw ApiError.notFound("User not found");
    }

    return user;
  }

  /**
   * Update Profile
   */
  static async updateProfile(
    userId: string,
    data: UpdateProfileInput
  ): Promise<IUser> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw ApiError.notFound("User not found");
    }

    user.name = data.name;
    user.phone = data.phone;

    if (data.profileImage !== undefined) {
      user.profileImage = data.profileImage;
    }

    await user.save();

    return user;
  }

  /**
   * Change Password
   */
  static async changePassword(
    userId: string,
    data: ChangePasswordInput
  ): Promise<void> {
    const user = await UserModel.findById(userId).select("+password");

    if (!user) {
      throw ApiError.notFound("User not found");
    }

    const isMatch = await user.comparePassword(
      data.currentPassword
    );

    if (!isMatch) {
      throw ApiError.badRequest(
        "Current password is incorrect"
      );
    }

    if (data.currentPassword === data.newPassword) {
      throw ApiError.badRequest(
        "New password cannot be same as current password"
      );
    }

    user.password = data.newPassword;

    await user.save();
  }

  /**
   * Update Avatar
   */
  static async updateAvatar(
    userId: string,
    imageUrl: string
  ): Promise<IUser> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw ApiError.notFound("User not found");
    }

    user.profileImage = imageUrl;

    await user.save();

    return user;
  }

  /**
   * Delete Account
   */
  static async deleteAccount(userId: string): Promise<void> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw ApiError.notFound("User not found");
    }

    await user.deleteOne();
  }
}