 import { Schema, model, Document, Types } from "mongoose";

export const PROPERTY_TYPES = [
  "Apartment",
  "House",
  "Villa",
  "Plot",
  "Commercial",
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];

export interface IProperty extends Document {
  title: string;

  description: string;

  builder: string;

  projectName: string;

  price: number;

  propertyType: PropertyType;

  bedrooms: number;

  bathrooms: number;

  area: number;

  address: string;

  city: string;

  locality: string;

  state: string;

  country: string;

  images: string[];

  owner: Types.ObjectId;

  status: "available" | "sold";

  aiScore: number;

  investmentScore: number;

  rentalYield: number;

  appreciation: number;

  amenities: string[];

  nearby: string[];

  featured: boolean;

  verified: boolean;

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

    builder: {
      type: String,
      required: true,
      index: true,
    },

    projectName: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },

    propertyType: {
      type: String,
      enum: PROPERTY_TYPES,
      required: true,
      index: true,
    },

    bedrooms: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
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
      index: true,
    },

    locality: {
      type: String,
      required: true,
      index: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      default: "India",
    },

    images: {
      type: [String],
      default: [],
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
      index: true,
    },

    /* ---------- AI Fields ---------- */

    aiScore: {
      type: Number,
      default: 8.5,
      min: 0,
      max: 10,
    },

    investmentScore: {
      type: Number,
      default: 4,
      min: 1,
      max: 5,
    },

    rentalYield: {
      type: Number,
      default: 4.5,
    },

    appreciation: {
      type: Number,
      default: 10,
    },

    amenities: {
      type: [String],
      default: [],
    },

    nearby: {
      type: [String],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    verified: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PropertyModel = model<IProperty>(
  "Property",
  propertySchema
);