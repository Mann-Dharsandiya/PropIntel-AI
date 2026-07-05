 import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from '../config/env';

/**
 * Roles supported across the platform. 'admin' is intentionally excluded
 * from public self-registration (enforced in the auth validators) — admin
 * accounts are expected to be provisioned separately (seeding / an internal
 * admin panel in a later module).
 */
export const USER_ROLES = ['buyer', 'seller', 'broker', 'builder', 'admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  profileImage: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name must be under 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^\+?[0-9]{7,15}$/, 'Please provide a valid phone number'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // never returned by default on find/findOne queries
    },
    role: {
      type: String,
      enum: { values: USER_ROLES, message: '{VALUE} is not a valid role' },
      default: 'buyer',
    },
    profileImage: {
      type: String,
      default: '',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt / updatedAt automatically
  },
);

// Note: the unique index on `email` is already created by `unique: true`
// on the field definition above — no separate schema.index() call needed
// (declaring both triggers a duplicate-index warning from Mongoose).

// Hash the password whenever it's set/changed, never twice.
userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();

  try {
    const saltRounds = env.bcryptSaltRounds;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

userSchema.methods.comparePassword = async function comparePassword(
  candidate: string,
): Promise<boolean> {
  // `this.password` may be undefined if the document was fetched without
  // `.select('+password')` — guard defensively rather than throwing.
  if (!this.password) return false;
  return bcrypt.compare(candidate, this.password);
};

// Strip sensitive/internal fields whenever a user document is serialized
// (res.json(user), JSON.stringify(user), etc.).
userSchema.set('toJSON', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (_doc, ret: any) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export const UserModel: Model<IUser> = model<IUser>('User', userSchema);