import mongoose from "mongoose";
import dotenv from "dotenv";

import { PropertyModel } from "../models/Property.model";
import { UserModel } from "../models/User.model";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/propintel-ai";

const PROPERTY_TYPES = [
  "Apartment",
  "House",
  "Villa",
  "Commercial",
];

const LOCALITIES = [
  {
    city: "Mumbai",
    state: "Maharashtra",
    locality: "Borivali West",
    pricePerSqFt: 26500,
  },
  {
    city: "Mumbai",
    state: "Maharashtra",
    locality: "Andheri East",
    pricePerSqFt: 30500,
  },
  {
    city: "Mumbai",
    state: "Maharashtra",
    locality: "Bandra West",
    pricePerSqFt: 52000,
  },
  {
    city: "Mumbai",
    state: "Maharashtra",
    locality: "Dadar",
    pricePerSqFt: 36500,
  },
  {
    city: "Pune",
    state: "Maharashtra",
    locality: "Baner",
    pricePerSqFt: 11800,
  },
  {
    city: "Pune",
    state: "Maharashtra",
    locality: "Hinjewadi",
    pricePerSqFt: 9800,
  },
  {
    city: "Pune",
    state: "Maharashtra",
    locality: "Kharadi",
    pricePerSqFt: 11200,
  },
  {
    city: "Pune",
    state: "Maharashtra",
    locality: "Wakad",
    pricePerSqFt: 9600,
  },
  {
    city: "Bengaluru",
    state: "Karnataka",
    locality: "Whitefield",
    pricePerSqFt: 14500,
  },
  {
    city: "Bengaluru",
    state: "Karnataka",
    locality: "Electronic City",
    pricePerSqFt: 9800,
  },
  {
    city: "Hyderabad",
    state: "Telangana",
    locality: "Gachibowli",
    pricePerSqFt: 10800,
  },
  {
    city: "Hyderabad",
    state: "Telangana",
    locality: "Hitech City",
    pricePerSqFt: 12600,
  },
];

const PROPERTY_NAMES = [
  "Sky Heights",
  "Sunshine Residency",
  "Green Valley",
  "Lake View",
  "Royal Palace",
  "Emerald Homes",
  "Blue Horizon",
  "Urban Nest",
  "Golden Residency",
  "Palm Meadows",
];
const PROPERTY_IMAGES = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
  "https://images.unsplash.com/photo-1605146769289-440113cc3d00",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
  "https://images.unsplash.com/photo-1600210492493-0946911123ea",
];

function random(min: number, max: number) {
  return (
    Math.floor(Math.random() * (max - min + 1)) +
    min
  );
}

async function getSeller() {
  let seller =
    await UserModel.findOne({
      email: "seller@propintel.ai",
    }).select("+password");

  if (!seller) {
    seller =
      await UserModel.create({
        name: "Demo Seller",
        email: "seller@propintel.ai",
        phone: "9876543210",
        password: "Password@123",
        role: "seller",
        isVerified: true,
      });

    console.log(
      "✅ Demo seller created"
    );
  }

  return seller;
}
function generateProperty(
  sellerId: mongoose.Types.ObjectId,
  localityData: (typeof LOCALITIES)[number],
  index: number
) {
  const bedrooms = random(1, 4);

  const bathrooms =
    bedrooms === 1
      ? 1
      : bedrooms === 2
      ? 2
      : random(2, 4);

  const area =
    bedrooms === 1
      ? random(550, 750)
      : bedrooms === 2
      ? random(800, 1200)
      : bedrooms === 3
      ? random(1200, 1800)
      : random(1800, 3200);

  const propertyType =
    PROPERTY_TYPES[
      random(
        0,
        PROPERTY_TYPES.length - 1
      )
    ];

  const price =
    area *
    localityData.pricePerSqFt;

  return {
    title: `${
      PROPERTY_NAMES[
        random(
          0,
          PROPERTY_NAMES.length - 1
        )
      ]
    } ${index + 1}`,

    description: `${bedrooms} BHK ${propertyType} in ${localityData.locality}, ${localityData.city}. Excellent investment opportunity with premium amenities.`,

    price,

    propertyType,

    bedrooms,

    bathrooms,

    area,

    address: `${random(
      1,
      250
    )}, ${localityData.locality}`,

    city: localityData.city,

    locality:
      localityData.locality,

    state: localityData.state,

    country: "India",

   images: [
  PROPERTY_IMAGES[
    random(
      0,
      PROPERTY_IMAGES.length - 1
    )
  ],
],

    owner: sellerId,

    status: "available",
  };
}

async function seedProperties() {
  try {
    await mongoose.connect(
      MONGO_URI
    );

    console.log(
      "✅ MongoDB Connected"
    );

    const seller =
      await getSeller();

    console.log(
      "✅ Seller Ready"
    );

    await PropertyModel.deleteMany(
      {}
    );

    console.log(
      "🗑 Old properties removed"
    );

    const properties = [];

    let counter = 1;

    for (const locality of LOCALITIES) {
      for (
        let i = 0;
        i < 8;
        i++
      ) {
        properties.push(
          generateProperty(
            seller._id as mongoose.Types.ObjectId,
            locality,
            counter++
          )
        );
      }
    }

    console.log(
      `🏗 Generated ${properties.length} properties`
    );
        await PropertyModel.insertMany(
      properties
    );

    console.log(
      `🎉 Successfully inserted ${properties.length} properties`
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "❌ Property Seeder Error:"
    );

    console.error(error);

    process.exit(1);
  }
}

seedProperties();