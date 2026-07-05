 import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';
import { JwtPayload, AuthTokens } from '../types/auth.types';

export function generateAccessToken(payload: JwtPayload): string {
  return jwt.sign(
    payload,
    env.jwtAccessSecret,
    {
      expiresIn: env.jwtAccessExpiresIn,
    } as SignOptions,
  );
}

export function generateRefreshToken(payload: JwtPayload): string {
  return jwt.sign(
    payload,
    env.jwtRefreshSecret,
    {
      expiresIn: env.jwtRefreshExpiresIn,
    } as SignOptions,
  );
}

export function generateTokens(payload: JwtPayload): AuthTokens {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, env.jwtAccessSecret) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, env.jwtRefreshSecret) as JwtPayload;
}