import mongoose from "mongoose";
import dotenv from "dotenv";

import { LocalityModel } from "../models/Locality.model";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/propintel-ai";

const localities = [
  {
    city: "Mumbai",
    locality: "Borivali West",
    averagePrice: 26500,
    priceGrowth: 13.2,
    investmentScore: 9.5,
    metroConnectivity: 10,
    schoolsNearby: 18,
    hospitalsNearby: 12,
    shoppingScore: 9,
    rentalDemand: "High",
    futureGrowth: "High",
  },
  {
    city: "Mumbai",
    locality: "Andheri East",
    averagePrice: 30500,
    priceGrowth: 11.4,
    investmentScore: 9.2,
    metroConnectivity: 10,
    schoolsNearby: 16,
    hospitalsNearby: 11,
    shoppingScore: 10,
    rentalDemand: "High",
    futureGrowth: "High",
  },
  {
    city: "Mumbai",
    locality: "Bandra West",
    averagePrice: 52000,
    priceGrowth: 8.5,
    investmentScore: 8.7,
    metroConnectivity: 9,
    schoolsNearby: 14,
    hospitalsNearby: 10,
    shoppingScore: 10,
    rentalDemand: "High",
    futureGrowth: "Medium",
  },
  {
    city: "Mumbai",
    locality: "Dadar",
    averagePrice: 36500,
    priceGrowth: 9.4,
    investmentScore: 8.8,
    metroConnectivity: 9,
    schoolsNearby: 17,
    hospitalsNearby: 13,
    shoppingScore: 9,
    rentalDemand: "High",
    futureGrowth: "Medium",
  },
  {
    city: "Pune",
    locality: "Baner",
    averagePrice: 11800,
    priceGrowth: 14.5,
    investmentScore: 9.6,
    metroConnectivity: 8,
    schoolsNearby: 15,
    hospitalsNearby: 9,
    shoppingScore: 8,
    rentalDemand: "High",
    futureGrowth: "High",
  },
  {
    city: "Pune",
    locality: "Hinjewadi",
    averagePrice: 9800,
    priceGrowth: 17.2,
    investmentScore: 9.8,
    metroConnectivity: 8,
    schoolsNearby: 12,
    hospitalsNearby: 8,
    shoppingScore: 8,
    rentalDemand: "High",
    futureGrowth: "High",
  },
  {
    city: "Pune",
    locality: "Kharadi",
    averagePrice: 11200,
    priceGrowth: 16.4,
    investmentScore: 9.7,
    metroConnectivity: 8,
    schoolsNearby: 13,
    hospitalsNearby: 9,
    shoppingScore: 9,
    rentalDemand: "High",
    futureGrowth: "High",
  },
  {
    city: "Pune",
    locality: "Wakad",
    averagePrice: 9600,
    priceGrowth: 15.8,
    investmentScore: 9.3,
    metroConnectivity: 7,
    schoolsNearby: 12,
    hospitalsNearby: 8,
    shoppingScore: 8,
    rentalDemand: "High",
    futureGrowth: "High",
  },
  {
    city: "Ahmedabad",
    locality: "Satellite",
    averagePrice: 8900,
    priceGrowth: 11.8,
    investmentScore: 9.1,
    metroConnectivity: 8,
    schoolsNearby: 14,
    hospitalsNearby: 11,
    shoppingScore: 9,
    rentalDemand: "Medium",
    futureGrowth: "High",
  },
  {
    city: "Ahmedabad",
    locality: "SG Highway",
    averagePrice: 9600,
    priceGrowth: 15.1,
    investmentScore: 9.4,
    metroConnectivity: 8,
    schoolsNearby: 11,
    hospitalsNearby: 10,
    shoppingScore: 9,
    rentalDemand: "High",
    futureGrowth: "High",
  },
  {
    city: "Ahmedabad",
    locality: "Bopal",
    averagePrice: 7600,
    priceGrowth: 13.7,
    investmentScore: 9.0,
    metroConnectivity: 7,
    schoolsNearby: 12,
    hospitalsNearby: 8,
    shoppingScore: 8,
    rentalDemand: "Medium",
    futureGrowth: "High",
  },
  {
    city: "Bengaluru",
    locality: "Whitefield",
    averagePrice: 14500,
    priceGrowth: 16.1,
    investmentScore: 9.8,
    metroConnectivity: 9,
    schoolsNearby: 18,
    hospitalsNearby: 13,
    shoppingScore: 9,
    rentalDemand: "High",
    futureGrowth: "High",
  },
  {
    city: "Bengaluru",
    locality: "Electronic City",
    averagePrice: 9800,
    priceGrowth: 15.4,
    investmentScore: 9.5,
    metroConnectivity: 8,
    schoolsNearby: 13,
    hospitalsNearby: 10,
    shoppingScore: 8,
    rentalDemand: "High",
    futureGrowth: "High",
  },
  {
    city: "Hyderabad",
    locality: "Gachibowli",
    averagePrice: 10800,
    priceGrowth: 17.5,
    investmentScore: 9.9,
    metroConnectivity: 9,
    schoolsNearby: 15,
    hospitalsNearby: 11,
    shoppingScore: 9,
    rentalDemand: "High",
    futureGrowth: "High",
  },
  {
    city: "Hyderabad",
    locality: "Hitech City",
    averagePrice: 12600,
    priceGrowth: 16.3,
    investmentScore: 9.8,
    metroConnectivity: 9,
    schoolsNearby: 14,
    hospitalsNearby: 10,
    shoppingScore: 9,
    rentalDemand: "High",
    futureGrowth: "High",
  }
];

async function seedLocalities() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB Connected");

    await LocalityModel.deleteMany({});

    console.log("🗑 Old localities removed");

    await LocalityModel.insertMany(localities);

    console.log(
      `🎉 Successfully inserted ${localities.length} localities`
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder Error:", error);
    process.exit(1);
  }
}

seedLocalities();