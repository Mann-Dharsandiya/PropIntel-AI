import mongoose from "mongoose";

import {
  PortfolioModel,
} from "../models/Portfolio.model";

import {
  CreatePortfolioInput,
  UpdatePortfolioInput,
} from "../types/portfolio.types";

export class PortfolioService {

  /**
   * Add investment
   */
  async create(
    userId: string,
    input: CreatePortfolioInput
  ) {
    if (
      !mongoose.Types.ObjectId.isValid(
        userId
      )
    ) {
      throw new Error(
        "Invalid user ID"
      );
    }

    if (
      input.property &&
      !mongoose.Types.ObjectId.isValid(
        input.property
      )
    ) {
      throw new Error(
        "Invalid property ID"
      );
    }

    if (
      input.purchasePrice < 0 ||
      input.currentValue < 0
    ) {
      throw new Error(
        "Property values cannot be negative"
      );
    }

    const portfolio =
      await PortfolioModel.create({
        user: userId,
        ...input,
        monthlyRent:
          input.monthlyRent ?? 0,
        loanAmount:
          input.loanAmount ?? 0,
      });

    return portfolio;
  }

  /**
   * Get user's portfolio
   */
  async getAll(userId: string) {
    return PortfolioModel.find({
      user: userId,
    })
      .populate("property")
      .sort({
        createdAt: -1,
      });
  }

  /**
   * Get one investment
   */
  async getById(
    userId: string,
    portfolioId: string
  ) {
    if (
      !mongoose.Types.ObjectId.isValid(
        portfolioId
      )
    ) {
      throw new Error(
        "Invalid portfolio ID"
      );
    }

    const portfolio =
      await PortfolioModel.findOne({
        _id: portfolioId,
        user: userId,
      }).populate("property");

    if (!portfolio) {
      throw new Error(
        "Investment not found"
      );
    }

    return portfolio;
  }

  /**
   * Update investment
   */
  async update(
    userId: string,
    portfolioId: string,
    input: UpdatePortfolioInput
  ) {
    if (
      !mongoose.Types.ObjectId.isValid(
        portfolioId
      )
    ) {
      throw new Error(
        "Invalid portfolio ID"
      );
    }

    if (
      input.purchasePrice !== undefined &&
      input.purchasePrice < 0
    ) {
      throw new Error(
        "Purchase price cannot be negative"
      );
    }

    if (
      input.currentValue !== undefined &&
      input.currentValue < 0
    ) {
      throw new Error(
        "Current value cannot be negative"
      );
    }

    const portfolio =
      await PortfolioModel.findOneAndUpdate(
        {
          _id: portfolioId,
          user: userId,
        },
        input,
        {
          new: true,
          runValidators: true,
        }
      ).populate("property");

    if (!portfolio) {
      throw new Error(
        "Investment not found"
      );
    }

    return portfolio;
  }

  /**
   * Delete investment
   */
  async delete(
    userId: string,
    portfolioId: string
  ) {
    if (
      !mongoose.Types.ObjectId.isValid(
        portfolioId
      )
    ) {
      throw new Error(
        "Invalid portfolio ID"
      );
    }

    const portfolio =
      await PortfolioModel.findOneAndDelete({
        _id: portfolioId,
        user: userId,
      });

    if (!portfolio) {
      throw new Error(
        "Investment not found"
      );
    }

    return {
      success: true,
    };
  }

  /**
   * Portfolio summary
   */
  async getSummary(userId: string) {
    const investments =
      await PortfolioModel.find({
        user: userId,
      });

    const totalInvestment =
      investments.reduce(
        (sum, item) =>
          sum + item.purchasePrice,
        0
      );

    const currentValue =
      investments.reduce(
        (sum, item) =>
          sum + item.currentValue,
        0
      );

    const totalProfit =
      currentValue -
      totalInvestment;

    const roi =
      totalInvestment > 0
        ? (totalProfit /
            totalInvestment) *
          100
        : 0;

    const monthlyRentalIncome =
      investments.reduce(
        (sum, item) =>
          sum + item.monthlyRent,
        0
      );

    return {
      totalProperties:
        investments.length,

      totalInvestment,

      currentValue,

      totalProfit,

      roi,

      monthlyRentalIncome,

      annualRentalIncome:
        monthlyRentalIncome * 12,
    };
  }
}