import { body } from 'express-validator';
import { USER_ROLES } from '../models/User.model';

const REGISTER_ROLES = USER_ROLES.filter(role => role !== 'admin');

export const registerValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\+?[0-9]{7,15}$/)
    .withMessage('Invalid phone number'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must contain at least 8 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must contain one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain one special character'),

  body('role')
    .optional()
    .isIn(REGISTER_ROLES)
    .withMessage('Invalid role'),
];

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];