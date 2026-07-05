import { Request, Response, NextFunction } from 'express';
import {
  registerUser,
  loginUser,
  getUserById,
} from '../services/auth.service';
import {
  verifyRefreshToken,
  generateTokens,
} from '../services/token.service';
import {
  setAuthCookies,
  clearAuthCookies,
} from '../utils/cookies';
import { ApiError } from '../utils/ApiError';

/**
 * Register
 */
export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { user, tokens } = await registerUser(req.body);

    setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        user,
        accessToken: tokens.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Login
 */
export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { user, tokens } = await loginUser(req.body);

    setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user,
        accessToken: tokens.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Current User
 */
export async function me(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = (req as any).user;

    if (!payload) {
      throw ApiError.unauthorized();
    }

    const user = await getUserById(payload.sub);

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Refresh Token
 */
export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const refreshToken =
      req.cookies?.refreshToken ||
      req.body?.refreshToken;

    if (!refreshToken) {
      throw ApiError.unauthorized('Refresh token missing');
    }

    const payload = verifyRefreshToken(refreshToken);

    const user = await getUserById(payload.sub);

    const tokens = generateTokens({
      sub: user.id,
      role: user.role,
    });

    setAuthCookies(
      res,
      tokens.accessToken,
      tokens.refreshToken,
    );

    res.json({
      success: true,
      data: {
        accessToken: tokens.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Logout
 */
export function logout(
  _req: Request,
  res: Response,
) {
  clearAuthCookies(res);

  res.json({
    success: true,
    message: 'Logged out successfully',
  });
}