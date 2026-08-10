import {
  Request,
  Response,
  NextFunction,
} from "express";

import { PortfolioService } from "../services/portfolio.service";

const portfolioService =
  new PortfolioService();

function getUserId(req: Request) {
  const user = (req as any).user;

  if (!user) {
    throw new Error(
      "Authentication required"
    );
  }

  return user.sub || user._id;
}

export class PortfolioController {

  /**
   * GET /portfolio
   */
  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId =
        getUserId(req);

      const portfolio =
        await portfolioService.getAll(
          userId
        );

      res.status(200).json({
        success: true,
        count: portfolio.length,
        data: portfolio,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /portfolio/summary
   */
  async getSummary(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId =
        getUserId(req);

      const summary =
        await portfolioService.getSummary(
          userId
        );

      res.status(200).json({
        success: true,
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /portfolio/:id
   */
  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId =
        getUserId(req);

      const portfolio =
        await portfolioService.getById(
          userId,
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: portfolio,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /portfolio
   */
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId =
        getUserId(req);

      const portfolio =
        await portfolioService.create(
          userId,
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Investment added successfully",
        data: portfolio,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /portfolio/:id
   */
  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId =
        getUserId(req);

      const portfolio =
        await portfolioService.update(
          userId,
          req.params.id,
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          "Investment updated successfully",
        data: portfolio,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /portfolio/:id
   */
  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId =
        getUserId(req);

      await portfolioService.delete(
        userId,
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Investment deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}