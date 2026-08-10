 import mongoose, {
  Document,
  Schema,
} from "mongoose";

export interface IPortfolioHistory
  extends Document {
  user: mongoose.Types.ObjectId;

  value: number;

  totalInvestment: number;

  totalProfit: number;

  roi: number;

  monthlyRentalIncome: number;

  recordedAt: Date;

  createdAt: Date;

  updatedAt: Date;
}

const PortfolioHistorySchema =
  new Schema<IPortfolioHistory>(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      value: {
        type: Number,
        required: true,
        min: 0,
      },

      totalInvestment: {
        type: Number,
        required: true,
        min: 0,
      },

      totalProfit: {
        type: Number,
        required: true,
      },

      roi: {
        type: Number,
        required: true,
      },

      monthlyRentalIncome: {
        type: Number,
        default: 0,
        min: 0,
      },

      recordedAt: {
        type: Date,
        required: true,
        default: Date.now,
        index: true,
      },
    },
    {
      timestamps: true,
    }
  );

PortfolioHistorySchema.index({
  user: 1,
  recordedAt: -1,
});

export const PortfolioHistoryModel =
  mongoose.model<IPortfolioHistory>(
    "PortfolioHistory",
    PortfolioHistorySchema
  );