import { Request, Response } from "express";
import { RecentlyViewedService } from "../services/recentlyViewed.service";

const recentlyViewedService = new RecentlyViewedService();

export class RecentlyViewedController {
  async add(req: Request, res: Response) {
    try {
      const userId = (req.user as any)._id;
      const { propertyId } = req.params;

      const recentlyViewed = await recentlyViewedService.add(
        userId,
        propertyId
      );

      res.status(201).json({
        success: true,
        message: "Property added to recently viewed.",
        data: recentlyViewed,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const userId = (req.user as any)._id;

      const recentlyViewed =
        await recentlyViewedService.getAll(userId);

      res.status(200).json({
        success: true,
        count: recentlyViewed.length,
        data: recentlyViewed,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async clear(req: Request, res: Response) {
    try {
      const userId = (req.user as any)._id;

      await recentlyViewedService.clear(userId);

      res.status(200).json({
        success: true,
        message: "Recently viewed history cleared.",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}