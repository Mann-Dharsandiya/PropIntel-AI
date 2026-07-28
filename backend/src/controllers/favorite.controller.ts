 import { Request, Response } from "express";
import { FavoriteService } from "../services/favorite.service";

const favoriteService = new FavoriteService();

export class FavoriteController {
  async getFavorites(req: Request, res: Response) {
    try {
      const userId = (req.user as any)._id;

      const favorites = await favoriteService.getFavorites(userId);

      res.status(200).json({
        success: true,
        count: favorites.length,
        data: favorites,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async addFavorite(req: Request, res: Response) {
    try {
      const userId = (req.user as any)._id;
      const { propertyId } = req.params;

      const favorite = await favoriteService.addFavorite(
        userId,
        propertyId
      );

      res.status(201).json({
        success: true,
        message: "Property added to favorites",
        data: favorite,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async removeFavorite(req: Request, res: Response) {
    try {
      const userId = (req.user as any)._id;
      const { propertyId } = req.params;

      await favoriteService.removeFavorite(
        userId,
        propertyId
      );

      res.status(200).json({
        success: true,
        message: "Property removed from favorites",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async toggleFavorite(req: Request, res: Response) {
    try {
      const userId = (req.user as any)._id;
      const { propertyId } = req.params;

      const result = await favoriteService.toggleFavorite(
        userId,
        propertyId
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async checkFavorite(req: Request, res: Response) {
    try {
      const userId = (req.user as any)._id;
      const { propertyId } = req.params;

      const favorite = await favoriteService.isFavorite(
        userId,
        propertyId
      );

      res.status(200).json({
        success: true,
        favorite,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async clearFavorites(req: Request, res: Response) {
    try {
      const userId = (req.user as any)._id;

      await favoriteService.clearFavorites(userId);

      res.status(200).json({
        success: true,
        message: "All favorites cleared",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}