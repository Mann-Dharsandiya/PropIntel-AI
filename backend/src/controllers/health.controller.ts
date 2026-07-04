import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import { getDBStatus } from '../config/db';

/**
 * GET /api/v1/health
 * Basic liveness probe - confirms the API process is up.
 */
export const getLiveness = asyncHandler(async (_req: Request, res: Response) => {
  sendSuccess(res, {
    status: 'ok',
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  }, 'PropIntel AI backend is alive');
});

/**
 * GET /api/v1/health/ready
 * Readiness probe - confirms downstream dependencies (DB) are reachable.
 */
export const getReadiness = asyncHandler(async (_req: Request, res: Response) => {
  const dbStatus = getDBStatus();
  const isReady = dbStatus === 'connected' || mongoose.connection.readyState === 1;

  sendSuccess(
    res,
    {
      status: isReady ? 'ready' : 'not_ready',
      database: dbStatus,
      timestamp: new Date().toISOString(),
    },
    isReady ? 'Service ready' : 'Service not fully ready',
    isReady ? 200 : 503,
  );
});
