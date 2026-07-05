import { IUser, UserRole } from '../models/User.model';

/**
 * JWT Payload
 */
export interface JwtPayload {
  sub: string;
  role: UserRole;
}

/**
 * Register Request
 */
export interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: UserRole;
}

/**
 * Login Request
 */
export interface LoginInput {
  email: string;
  password: string;
}

/**
 * Auth Tokens
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Auth Response
 */
export interface AuthResponse {
  user: IUser;
  tokens: AuthTokens;
}