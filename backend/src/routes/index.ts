 import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';

const router = Router();

// Health Check
router.use('/health', healthRoutes);

// Authentication
router.use('/auth', authRoutes);

export default router;