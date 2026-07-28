import { apiClient } from "./axios";

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  profileImage: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  name: string;
  phone: string;
  profileImage?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

/**
 * Get Profile
 */
export const getProfile = async () => {
  const response =
    await apiClient.get<ApiResponse<UserProfile>>(
      "/users/profile"
    );

  return response.data;
};

/**
 * Update Profile
 */
export const updateProfile = async (
  data: UpdateProfileRequest
) => {
  const response =
    await apiClient.put<ApiResponse<UserProfile>>(
      "/users/profile",
      data
    );

  return response.data;
};

/**
 * Change Password
 */
export const changePassword = async (
  data: ChangePasswordRequest
) => {
  const response =
    await apiClient.put<ApiResponse<null>>(
      "/users/change-password",
      data
    );

  return response.data;
};

/**
 * Update Avatar
 */
export const updateAvatar = async (
  profileImage: string
) => {
  const response =
    await apiClient.put<ApiResponse<UserProfile>>(
      "/users/avatar",
      {
        profileImage,
      }
    );

  return response.data;
};

/**
 * Delete Account
 */
export const deleteAccount = async () => {
  const response =
    await apiClient.delete<ApiResponse<null>>(
      "/users/account"
    );

  return response.data;
};