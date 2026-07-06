 import { Router } from 'express';

import healthRoutes from './health.routes';
import authRoutes from './auth.routes';
import propertyRoutes from './property.routes';

const router = Router();

/**
 * Health Routes
 */
router.use('/health', healthRoutes);

/**
 * Authentication Routes
 */
router.use('/auth', authRoutes);

/**
 * Property Routes
 */
router.use('/properties', propertyRoutes);

export default router;