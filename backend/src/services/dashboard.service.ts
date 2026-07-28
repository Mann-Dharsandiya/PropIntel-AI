 import { FavoriteModel } from "../models/Favorite.model";
import { RecentlyViewedModel } from "../models/RecentlyViewed.model";

export class DashboardService {
  async getDashboard(userId: string) {
    const [
      favoriteCount,
      recentlyViewedCount,
      favorites,
      recentlyViewed,
    ] = await Promise.all([
      FavoriteModel.countDocuments({
        user: userId,
      }),

      RecentlyViewedModel.countDocuments({
        user: userId,
      }),

      FavoriteModel.find({
        user: userId,
      })
        .populate("property")
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .lean(),

      RecentlyViewedModel.find({
        user: userId,
      })
        .populate("property")
        .sort({
          viewedAt: -1,
        })
        .limit(5)
        .lean(),
    ]);

    const favoritePreview = favorites.map((item: any) => ({
      _id: item.property?._id,
      title: item.property?.title,
      city: item.property?.city,
      price: item.property?.price,
      image: item.property?.images?.[0] ?? "",
    }));

    const recentlyViewedPreview = recentlyViewed.map((item: any) => ({
      _id: item._id,
      viewedAt: item.viewedAt,
      property: {
        _id: item.property?._id,
        title: item.property?.title,
        city: item.property?.city,
        price: item.property?.price,
        images: item.property?.images ?? [],
      },
    }));

    const activities = [
      ...favorites.map((item: any) => ({
        title: "Added to Favorites ❤️",
        description: item.property?.title,
        createdAt: item.createdAt,
      })),

      ...recentlyViewed.map((item: any) => ({
        title: "Viewed Property 👀",
        description: item.property?.title,
        createdAt: item.viewedAt,
      })),
    ].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    return {
      stats: {
        favorites: favoriteCount,
        recentlyViewed: recentlyViewedCount,
      },

      favorites: favoritePreview,

      recentlyViewed: recentlyViewedPreview,

      activities,

      reports: [],

      comparisons: [],
    };
  }
}