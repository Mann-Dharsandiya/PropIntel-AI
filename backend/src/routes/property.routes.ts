import { Router } from 'express';

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from '../controllers/property.controller';

import { authenticate } from '../middlewares/authenticate';
import { validate } from '../middlewares/validate';

import {
  createPropertyValidator,
  updatePropertyValidator,
} from '../middlewares/propertyValidators';

const router = Router();

/**
 * Public Routes
 */

// Get all properties
router.get('/', getAll);

// Get property by ID
router.get('/:id', getOne);

/**
 * Protected Routes
 */

// Create property
router.post(
  '/',
  authenticate,
  createPropertyValidator,
  validate,
  create,
);

// Update property
router.put(
  '/:id',
  authenticate,
  updatePropertyValidator,
  validate,
  update,
);

// Delete property
router.delete(
  '/:id',
  authenticate,
  remove,
);

export default router;