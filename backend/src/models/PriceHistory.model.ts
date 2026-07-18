import { Schema, model, Document } from "mongoose";

export interface IPriceHistory extends Document {
  city: string;
  locality: string;
  month: string;
  averagePrice: number;
}

const priceHistorySchema = new Schema<IPriceHistory>(
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

    month: {
      type: String,
      required: true,
    },

    averagePrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

priceHistorySchema.index({
  city: 1,
  locality: 1,
  month: 1,
});

export const PriceHistoryModel =
  model<IPriceHistory>(
    "PriceHistory",
    priceHistorySchema
  );