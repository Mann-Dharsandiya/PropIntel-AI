 import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../services/token.service";
import { ApiError } from "../utils/ApiError";
import type { JwtPayload } from "../types/auth.types";

export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  try {
    console.log("\n========== AUTH ==========");

    console.log("Headers:", req.headers);

    let token: string | undefined;

    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    // Read token from Authorization header
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.substring(7).trim();
    }

    // If not found in header, try cookie
    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken.trim();
    }

    // No token found
    if (!token) {
      return next(
        ApiError.unauthorized("Authentication required")
      );
    }

    // Verify JWT
    const payload = verifyAccessToken(token) as JwtPayload;

    console.log("Decoded Payload:", payload);
    console.log("========== AUTH SUCCESS ==========\n");

    // Attach authenticated user to request
    req.user = payload;

    next();
  } catch (error) {
    console.log("\n========== AUTH FAILED ==========");
    console.log("JWT Verify Error:", error);
    console.log("=================================\n");

    next(
      ApiError.unauthorized(
        "Invalid or expired token"
      )
    );
  }
}

export function authorize(...roles: string[]) {
  return (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      return next(
        ApiError.unauthorized(
          "Authentication required"
        )
      );
    }

    if (!roles.includes(req.user.role)) {
      return next(
        ApiError.forbidden(
          "You are not allowed to access this resource"
        )
      );
    }

    next();
  };
}