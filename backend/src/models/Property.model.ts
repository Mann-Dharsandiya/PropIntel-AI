import { Schema, model, Document, Types } from 'mongoose';

export const PROPERTY_TYPES = [
  'Apartment',
  'House',
  'Villa',
  'Plot',
  'Commercial',
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];

export interface IProperty extends Document {
  title: string;
  description: string;

  price: number;

  propertyType: PropertyType;

  bedrooms: number;

  bathrooms: number;

  area: number;

  address: string;

  city: string;

  state: string;

  country: string;

  images: string[];

  owner: Types.ObjectId;

  status: 'available' | 'sold';

  createdAt: Date;

  updatedAt: Date;
}

const propertySchema = new Schema<IProperty>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    propertyType: {
      type: String,
      enum: PROPERTY_TYPES,
      required: true,
    },

    bedrooms: {
      type: Number,
      default: 0,
      min: 0,
    },

    bathrooms: {
      type: Number,
      default: 0,
      min: 0,
    },

    area: {
      type: Number,
      required: true,
      min: 1,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    status: {
      type: String,
      enum: ['available', 'sold'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  },
);

export const PropertyModel = model<IProperty>(
  'Property',
  propertySchema,
);