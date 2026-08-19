import mongoose, {
  Document,
  Schema,
} from "mongoose";

export interface IAIReport
  extends Document {
  user: mongoose.Types.ObjectId;

  reportType: string;

  title: string;

  summary: string;

  portfolioSnapshot: {
    totalProperties: number;
    totalInvestment: number;
    currentValue: number;
    totalProfit: number;
    roi: number;
    monthlyRentalIncome: number;
    annualRentalIncome: number;
    rentalYield: number;
    loanToValue: number;
  };

  insights: {
    title: string;
    message: string;
    type: "positive" | "neutral" | "warning";
  }[];

  recommendations: string[];

  createdAt: Date;
  updatedAt: Date;
}

const AIReportSchema =
  new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      reportType: {
        type: String,
        required: true,
        default: "portfolio",
        trim: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      summary: {
        type: String,
        required: true,
        trim: true,
      },

      portfolioSnapshot: {
        totalProperties: {
          type: Number,
          default: 0,
        },

        totalInvestment: {
          type: Number,
          default: 0,
        },

        currentValue: {
          type: Number,
          default: 0,
        },

        totalProfit: {
          type: Number,
          default: 0,
        },

        roi: {
          type: Number,
          default: 0,
        },

        monthlyRentalIncome: {
          type: Number,
          default: 0,
        },

        annualRentalIncome: {
          type: Number,
          default: 0,
        },

        rentalYield: {
          type: Number,
          default: 0,
        },

        loanToValue: {
          type: Number,
          default: 0,
        },
      },

      insights: [
        {
          title: {
            type: String,
            required: true,
          },

          message: {
            type: String,
            required: true,
          },

          type: {
            type: String,
            enum: [
              "positive",
              "neutral",
              "warning",
            ],
            default: "neutral",
          },
        },
      ],

      recommendations: [
        {
          type: String,
          trim: true,
        },
      ],
    },
    {
      timestamps: true,
    }
  );

AIReportSchema.index({
  user: 1,
  createdAt: -1,
});

export const AIReportModel =
  mongoose.model<IAIReport>(
    "AIReport",
    AIReportSchema
  );