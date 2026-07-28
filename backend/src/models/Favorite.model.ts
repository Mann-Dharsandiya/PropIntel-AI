 import { Schema, model, Document, Types } from "mongoose";

export interface IFavorite extends Document {
  user: Types.ObjectId;
  property: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const favoriteSchema = new Schema<IFavorite>(
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
  },
  {
    timestamps: true,
  }
);

/**
 * One property can only be favorited once by a user.
 */
favoriteSchema.index(
  {
    user: 1,
    property: 1,
  },
  {
    unique: true,
  }
);

export const FavoriteModel = model<IFavorite>(
  "Favorite",
  favoriteSchema
);