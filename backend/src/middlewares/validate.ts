import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError';

export function validate(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const details = errors.array().map((error) => ({
    field: 'path' in error ? error.path : undefined,
    message: error.msg,
  }));

  next(ApiError.badRequest('Validation failed', details));
}