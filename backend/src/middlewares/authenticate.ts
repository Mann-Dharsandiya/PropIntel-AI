 import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../services/token.service';
import { ApiError } from '../utils/ApiError';

export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  try {
    console.log('\n========== AUTH ==========');

    console.log('Headers:', req.headers);

    let token: string | undefined;

    const authHeader = req.headers.authorization;

    console.log('Authorization Header:', authHeader);

    // Read token from Authorization header
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    }

    console.log('Extracted Token Length:', token?.length);
    console.log('Extracted Token:', JSON.stringify(token));

    // If not found in header, try cookie
    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken.trim();

      console.log('Cookie Token Length:', token?.length);
      console.log('Cookie Token:', JSON.stringify(token));
    }

    // No token found
    if (!token) {
      return next(ApiError.unauthorized('Authentication required'));
    }

    // Verify JWT
    const payload = verifyAccessToken(token);

    console.log('Decoded Payload:', payload);
    console.log('========== AUTH SUCCESS ==========\n');

    (req as any).user = payload;

    next();
  } catch (err) {
    console.log('\n========== AUTH FAILED ==========');
    console.log('JWT Verify Error:', err);
    console.log('=================================\n');

    next(ApiError.unauthorized('Invalid or expired token'));
  }
}

export function authorize(...roles: string[]) {
  return (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void => {
    const user = (req as any).user;

    if (!user) {
      return next(
        ApiError.unauthorized('Authentication required'),
      );
    }

    if (!roles.includes(user.role)) {
      return next(
        ApiError.forbidden(
          'You are not allowed to access this resource',
        ),
      );
    }

    next();
  };
}