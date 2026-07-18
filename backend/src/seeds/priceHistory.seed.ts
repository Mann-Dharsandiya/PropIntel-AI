import mongoose from "mongoose";
import dotenv from "dotenv";

import { LocalityModel } from "../models/Locality.model";
import { PriceHistoryModel } from "../models/PriceHistory.model";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/propintel-ai";

const MONTHS = [
  "Jul 2025",
  "Aug 2025",
  "Sep 2025",
  "Oct 2025",
  "Nov 2025",
  "Dec 2025",
  "Jan 2026",
  "Feb 2026",
  "Mar 2026",
  "Apr 2026",
  "May 2026",
  "Jun 2026",
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

async function seedPriceHistory() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB Connected");

    await PriceHistoryModel.deleteMany({});

    console.log("🗑 Old price history removed");

    const localities = await LocalityModel.find();

    const records: any[] = [];

    for (const locality of localities) {
      const currentPrice = locality.averagePrice;

      const yearlyGrowth = locality.priceGrowth / 100;

      const monthlyGrowth =
        yearlyGrowth / 12;

      let price =
        currentPrice /
        Math.pow(
          1 + monthlyGrowth,
          MONTHS.length - 1
        );

      for (const month of MONTHS) {
        const variation =
          randomBetween(-0.005, 0.005);

        records.push({
          city: locality.city,
          locality: locality.locality,
          month,
          averagePrice: Math.round(
            price * (1 + variation)
          ),
        });

        price =
          price *
          (1 + monthlyGrowth);
      }
    }

    await PriceHistoryModel.insertMany(
      records
    );

    console.log(
      `🎉 Inserted ${records.length} price history records`
    );

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

seedPriceHistory();