 import { Schema, model, Types, Document } from "mongoose";

export interface IRecentlyViewed extends Document {
  user: Types.ObjectId;
  property: Types.ObjectId;
  viewedAt: Date;
}

const recentlyViewedSchema = new Schema<IRecentlyViewed>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
      index: true,
    },
    viewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate entries for the same user/property
recentlyViewedSchema.index(
  { user: 1, property: 1 },
  { unique: true }
);

export const RecentlyViewedModel = model<IRecentlyViewed>(
  "RecentlyViewed",
  recentlyViewedSchema
);