import { RecentlyViewedModel } from "../models/RecentlyViewed.model";

export class RecentlyViewedService {
  async add(userId: string, propertyId: string) {
    const existing = await RecentlyViewedModel.findOne({
      user: userId,
      property: propertyId,
    });

    if (existing) {
      existing.viewedAt = new Date();
      await existing.save();
      return existing;
    }

    return RecentlyViewedModel.create({
      user: userId,
      property: propertyId,
    });
  }

  async getAll(userId: string) {
    return RecentlyViewedModel.find({
      user: userId,
    })
      .populate("property")
      .sort({ viewedAt: -1 })
      .limit(20);
  }

  async clear(userId: string) {
    await RecentlyViewedModel.deleteMany({
      user: userId,
    });
  }
}