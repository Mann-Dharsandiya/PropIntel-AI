import { Schema, model, Document } from "mongoose";

export interface ILocality extends Document {
  city: string;

  locality: string;

  averagePrice: number;

  priceGrowth: number;

  investmentScore: number;

  metroConnectivity: number;

  schoolsNearby: number;

  hospitalsNearby: number;

  shoppingScore: number;

  rentalDemand: "Low" | "Medium" | "High";

  futureGrowth: "Low" | "Medium" | "High";
}

const localitySchema = new Schema<ILocality>(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },

    locality: {
      type: String,
      required: true,
      trim: true,
    },

    averagePrice: {
      type: Number,
      required: true,
    },

    priceGrowth: {
      type: Number,
      required: true,
    },

    investmentScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    metroConnectivity: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },

    schoolsNearby: {
      type: Number,
      required: true,
    },

    hospitalsNearby: {
      type: Number,
      required: true,
    },

    shoppingScore: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },

    rentalDemand: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    futureGrowth: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const LocalityModel =
  model<ILocality>(
    "Locality",
    localitySchema
  );