import { UserModel, IUser } from '../models/User.model';
import {
  RegisterInput,
  LoginInput,
  AuthResponse,
  JwtPayload,
} from '../types/auth.types';
import { generateTokens } from './token.service';
import { ApiError } from '../utils/ApiError';

/**
 * Register a new user
 */
export async function registerUser(
  input: RegisterInput,
): Promise<AuthResponse> {
  const existingUser = await UserModel.findOne({
    email: input.email.toLowerCase(),
  });

  if (existingUser) {
    throw ApiError.badRequest('Email already exists');
  }

  const user = await UserModel.create({
    name: input.name,
    email: input.email.toLowerCase(),
    phone: input.phone,
    password: input.password,
    role: input.role ?? 'buyer',
  });

  const payload: JwtPayload = {
    sub: user.id,
    role: user.role,
  };

  const tokens = generateTokens(payload);

  return {
    user,
    tokens,
  };
}

/**
 * Login user
 */
export async function loginUser(
  input: LoginInput,
): Promise<AuthResponse> {
  const user = await UserModel.findOne({
    email: input.email.toLowerCase(),
  }).select('+password');

  if (!user) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const isMatch = await user.comparePassword(input.password);

  if (!isMatch) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const payload: JwtPayload = {
    sub: user.id,
    role: user.role,
  };

  const tokens = generateTokens(payload);

  return {
    user,
    tokens,
  };
}

/**
 * Get user by ID
 */
export async function getUserById(
  id: string,
): Promise<IUser> {
  const user = await UserModel.findById(id);

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  return user;
}