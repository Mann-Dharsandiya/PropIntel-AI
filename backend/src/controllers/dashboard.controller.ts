import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";

const dashboardService = new DashboardService();

export class DashboardController {
  async getDashboard(req: Request, res: Response) {
    const userId = (req.user as any)._id;

    const dashboard = await dashboardService.getDashboard(userId);

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  }
}