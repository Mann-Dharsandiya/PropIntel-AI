 import { body, query } from 'express-validator';

export const createPropertyValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),

  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .isFloat({ min: 1 })
    .withMessage('Price must be greater than 0'),

  body('propertyType')
    .isIn([
      'Apartment',
      'House',
      'Villa',
      'Plot',
      'Commercial',
    ])
    .withMessage('Invalid property type'),

  body('bedrooms')
    .isInt({ min: 0 })
    .withMessage('Bedrooms must be 0 or greater'),

  body('bathrooms')
    .isInt({ min: 0 })
    .withMessage('Bathrooms must be 0 or greater'),

  body('area')
    .isFloat({ min: 1 })
    .withMessage('Area must be greater than 0'),

  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),

  body('city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),

  body('state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),

  body('country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),

  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array'),
];

/**
 * Update Property Validator
 * All fields optional while updating
 */
export const updatePropertyValidator = [
  body('title')
    .optional()
    .trim()
    .notEmpty(),

  body('description')
    .optional()
    .trim()
    .notEmpty(),

  body('price')
    .optional()
    .isNumeric()
    .isFloat({ min: 1 }),

  body('propertyType')
    .optional()
    .isIn([
      'Apartment',
      'House',
      'Villa',
      'Plot',
      'Commercial',
    ]),

  body('bedrooms')
    .optional()
    .isInt({ min: 0 }),

  body('bathrooms')
    .optional()
    .isInt({ min: 0 }),

  body('area')
    .optional()
    .isFloat({ min: 1 }),

  body('address')
    .optional()
    .trim()
    .notEmpty(),

  body('city')
    .optional()
    .trim()
    .notEmpty(),

  body('state')
    .optional()
    .trim()
    .notEmpty(),

  body('country')
    .optional()
    .trim()
    .notEmpty(),

  body('images')
    .optional()
    .isArray(),
];

/**
 * Query Validator
 */
export const propertyQueryValidator = [
  query('minPrice')
    .optional()
    .isFloat({ min: 0 }),

  query('maxPrice')
    .optional()
    .isFloat({ min: 0 }),

  query('bedrooms')
    .optional()
    .isInt({ min: 0 }),

  query('page')
    .optional()
    .isInt({ min: 1 }),

  query('limit')
    .optional()
    .isInt({ min: 1 }),
];