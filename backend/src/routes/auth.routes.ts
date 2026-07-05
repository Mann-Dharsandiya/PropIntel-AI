import { Router } from 'express';

import {
  register,
  login,
  logout,
  me,
  refreshToken,
} from '../controllers/auth.controller';

import { authenticate } from '../middlewares/authenticate';
import { validate } from '../middlewares/validate';

import {
  registerValidator,
  loginValidator,
} from '../middlewares/authValidators';

const router = Router();

/**
 * Public Routes
 */
router.post(
  '/register',
  registerValidator,
  validate,
  register,
);

router.post(
  '/login',
  loginValidator,
  validate,
  login,
);

router.post(
  '/refresh-token',
  refreshToken,
);

router.post(
  '/logout',
  logout,
);

/**
 * Protected Route
 */
router.get(
  '/me',
  authenticate,
  me,
);

export default router;