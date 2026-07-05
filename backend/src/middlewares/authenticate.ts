import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../services/token.service';
import { ApiError } from '../utils/ApiError';

export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  try {
    let token: string | undefined;

    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }

    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return next(ApiError.unauthorized('Authentication required'));
    }

    const payload = verifyAccessToken(token);

    (req as any).user = payload;

    next();
  } catch {
    next(ApiError.unauthorized('Invalid or expired token'));
  }
}

export function authorize(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const user = (req as any).user;

    if (!user) {
      return next(ApiError.unauthorized('Authentication required'));
    }

    if (!roles.includes(user.role)) {
      return next(
        ApiError.forbidden('You are not allowed to access this resource'),
      );
    }

    next();
  };
}