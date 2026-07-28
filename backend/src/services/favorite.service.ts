 import { Types } from "mongoose";
import { FavoriteModel } from "../models/Favorite.model";
import { PropertyModel } from "../models/Property.model";

export class FavoriteService {
  async addFavorite(userId: string, propertyId: string) {
    const property = await PropertyModel.findById(propertyId);

    if (!property) {
      throw new Error("Property not found");
    }

    const existing = await FavoriteModel.findOne({
      user: userId,
      property: propertyId,
    });

    if (existing) {
      return existing;
    }

    const favorite = await FavoriteModel.create({
      user: userId,
      property: propertyId,
    });

    return favorite;
  }

  async removeFavorite(userId: string, propertyId: string) {
    await FavoriteModel.findOneAndDelete({
      user: userId,
      property: propertyId,
    });

    return {
      success: true,
    };
  }

  async toggleFavorite(userId: string, propertyId: string) {
    const favorite = await FavoriteModel.findOne({
      user: userId,
      property: propertyId,
    });

    if (favorite) {
      await FavoriteModel.findByIdAndDelete(favorite._id);

      return {
        favorite: false,
      };
    }

    await FavoriteModel.create({
      user: userId,
      property: propertyId,
    });

    return {
      favorite: true,
    };
  }

  async getFavorites(userId: string) {
    return FavoriteModel.find({
      user: userId,
    })
      .populate("property")
      .sort({
        createdAt: -1,
      });
  }

  async isFavorite(userId: string, propertyId: string) {
    const favorite = await FavoriteModel.exists({
      user: userId,
      property: propertyId,
    });

    return !!favorite;
  }

  async countFavorites(userId: string) {
    return FavoriteModel.countDocuments({
      user: userId,
    });
  }

  async clearFavorites(userId: string) {
    await FavoriteModel.deleteMany({
      user: userId,
    });

    return {
      success: true,
    };
  }
}