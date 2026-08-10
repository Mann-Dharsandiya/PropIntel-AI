 import mongoose, {
  Document,
  Schema,
} from "mongoose";

export interface IPortfolio
  extends Document {
  user: mongoose.Types.ObjectId;

  property?: mongoose.Types.ObjectId;

  propertyName: string;

  city: string;

  propertyType: string;

  purchasePrice: number;

  currentValue: number;

  purchaseDate: Date;

  monthlyRent: number;

  loanAmount: number;

  notes?: string;

  createdAt: Date;

  updatedAt: Date;
}

const PortfolioSchema =
  new Schema<IPortfolio>(
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

        required: false,
      },

      propertyName: {
        type: String,

        required: true,

        trim: true,
      },

      city: {
        type: String,

        required: true,

        trim: true,
      },

      propertyType: {
        type: String,

        required: true,

        trim: true,
      },

      purchasePrice: {
        type: Number,

        required: true,

        min: 0,
      },

      currentValue: {
        type: Number,

        required: true,

        min: 0,
      },

      purchaseDate: {
        type: Date,

        required: true,
      },

      monthlyRent: {
        type: Number,

        default: 0,

        min: 0,
      },

      loanAmount: {
        type: Number,

        default: 0,

        min: 0,
      },

      notes: {
        type: String,

        trim: true,

        default: "",
      },
    },

    {
      timestamps: true,
    }
  );

PortfolioSchema.index({
  user: 1,

  createdAt: -1,
});

export const PortfolioModel =
  mongoose.model<IPortfolio>(
    "Portfolio",
    PortfolioSchema
  );