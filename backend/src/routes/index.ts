 import { Router } from 'express';
import healthRoutes from './health.routes';

const router = Router();

// Health Check
router.use('/health', healthRoutes);

// Authentication routes will be added back in Phase 2
// router.use('/auth', authRoutes);

export default router;