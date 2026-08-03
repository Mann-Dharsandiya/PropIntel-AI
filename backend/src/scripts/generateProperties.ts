 import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

import { PropertyModel } from "../models/Property.model";
import { UserModel } from "../models/User.model";

import { builders } from "../data/builders";
import { projectNames } from "../data/projectNames";
import { amenities } from "../data/amenities";
import { nearby } from "../data/nearby";
import { propertyImages } from "../data/propertyImages";

type PropertyType =
  | "Apartment"
  | "Villa"
  | "House"
  | "Commercial"
  | "Plot";

interface CityData {
  city: string;
  state: string;
  localities: string[];
  minPrice: number;
  maxPrice: number;
}

const cities: CityData[] = [
  {
    city: "Mumbai",
    state: "Maharashtra",
    minPrice: 9000000,
    maxPrice: 55000000,
    localities: [
      "Andheri",
      "Bandra",
      "Borivali",
      "Powai",
      "Malad",
      "Chembur",
      "Dadar",
      "Thane",
    ],
  },

  {
    city: "Ahmedabad",
    state: "Gujarat",
    minPrice: 3500000,
    maxPrice: 22000000,
    localities: [
      "Satellite",
      "Bopal",
      "Science City",
      "Navrangpura",
      "SG Highway",
      "Vastrapur",
      "Gota",
      "Chandkheda",
    ],
  },

  {
    city: "Pune",
    state: "Maharashtra",
    minPrice: 4500000,
    maxPrice: 26000000,
    localities: [
      "Baner",
      "Hinjewadi",
      "Wakad",
      "Aundh",
      "Kharadi",
      "Hadapsar",
      "Kothrud",
      "Viman Nagar",
    ],
  },

  {
    city: "Bangalore",
    state: "Karnataka",
    minPrice: 5000000,
    maxPrice: 30000000,
    localities: [
      "Whitefield",
      "Electronic City",
      "Sarjapur",
      "Koramangala",
      "Marathahalli",
      "Hebbal",
      "Indiranagar",
      "Yelahanka",
    ],
  },

  {
    city: "Hyderabad",
    state: "Telangana",
    minPrice: 4000000,
    maxPrice: 24000000,
    localities: [
      "Gachibowli",
      "Kondapur",
      "Madhapur",
      "Kukatpally",
      "Hitech City",
      "Begumpet",
      "Miyapur",
      "Banjara Hills",
    ],
  },
];

const propertyTypes: PropertyType[] = [
  "Apartment",
  "Villa",
  "House",
  "Commercial",
  "Plot",
];

function random<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomMany<T>(
  items: T[],
  min = 3,
  max = 6
): T[] {
  const shuffled = [...items].sort(
    () => Math.random() - 0.5
  );

  return shuffled.slice(
    0,
    faker.number.int({
      min,
      max,
    })
  );
}

function randomImage(
  type: PropertyType
) {
  return random(
    propertyImages[type]
  );
}

function aiScore() {
  return Number(
    faker.number
      .float({
        min: 7.5,
        max: 9.9,
        fractionDigits: 1,
      })
      .toFixed(1)
  );
}

function investmentScore() {
  return faker.number.int({
    min: 3,
    max: 5,
  });
}

function rentalYield() {
  return Number(
    faker.number
      .float({
        min: 3.5,
        max: 7.5,
        fractionDigits: 1,
      })
      .toFixed(1)
  );
}

function appreciation() {
  return faker.number.int({
    min: 8,
    max: 18,
  });
}

function description(
  builder: string,
  project: string,
  locality: string
) {
  return `${project} by ${builder} is a premium residential development located in ${locality}. The project offers spacious homes with modern amenities, excellent connectivity, high investment potential and a comfortable lifestyle for families and professionals.`;
}
async function generate() {
  await mongoose.connect(
    process.env.MONGO_URI ||
      "mongodb://localhost:27017/propintel_ai"
  );

  console.log("==================================");
  console.log("Connected to MongoDB");
  console.log("==================================");

  const owner = await UserModel.findOne();

  if (!owner) {
    console.log("No user found.");
    console.log("Create one user first.");
    process.exit(0);
  }

  await PropertyModel.deleteMany({});

  const properties: any[] = [];

  for (const cityInfo of cities) {
    console.log(`Generating ${cityInfo.city}...`);

    for (let i = 0; i < 120; i++) {

      const propertyType = random(propertyTypes);

      const builder = random(builders);

      const projectName = random(projectNames);

      const locality = random(cityInfo.localities);

      const bedrooms =
        propertyType === "Commercial" ||
        propertyType === "Plot"
          ? 0
          : faker.number.int({
              min: 1,
              max: 5,
            });

      const bathrooms =
        propertyType === "Commercial" ||
        propertyType === "Plot"
          ? 0
          : faker.number.int({
              min: 1,
              max: 4,
            });

      const area =
        propertyType === "Plot"
          ? faker.number.int({
              min: 1200,
              max: 6000,
            })
          : faker.number.int({
              min: 550,
              max: 4200,
            });

      const price = faker.number.int({
        min: cityInfo.minPrice,
        max: cityInfo.maxPrice,
      });

      const image = randomImage(propertyType);

      const property = {

        title:
          builder +
          " " +
          projectName,

        projectName,

        builder,

        description: description(
          builder,
          projectName,
          locality
        ),

        propertyType,

        bedrooms,

        bathrooms,

        area,

        price,

        address:
          faker.location.streetAddress(),

        city: cityInfo.city,

        locality,

        state: cityInfo.state,

        country: "India",

        images: [
  image,
  randomImage(propertyType),
  randomImage(propertyType),
  randomImage(propertyType),
  randomImage(propertyType),
  randomImage(propertyType),
],

        owner: owner._id,

        status:
          faker.helpers.arrayElement([
            "available",
            "available",
            "available",
            "sold",
          ]),

        aiScore: aiScore(),

        investmentScore:
          investmentScore(),

        rentalYield:
          rentalYield(),

        appreciation:
          appreciation(),

        amenities:
          randomMany(
            amenities,
            4,
            8
          ),

        nearby:
          randomMany(
            nearby,
            3,
            6
          ),

        featured:
          Math.random() > 0.8,

        verified:
          Math.random() > 0.1,
      };

      properties.push(property);
    }
  }
    console.log("==================================");
  console.log("Saving properties...");
  console.log("==================================");

  await PropertyModel.insertMany(properties);

  console.log("");
  console.log("==================================");
  console.log("PROPERTY GENERATION COMPLETED");
  console.log("==================================");
  console.log(`Total Properties : ${properties.length}`);
  console.log(`Cities           : ${cities.length}`);
  console.log(`Builders         : ${builders.length}`);
  console.log(`Projects         : ${projectNames.length}`);
  console.log(`Amenities        : ${amenities.length}`);
  console.log(`Nearby Places    : ${nearby.length}`);
  console.log("==================================");

  const cityStats: Record<string, number> = {};

  for (const property of properties) {
    cityStats[property.city] =
      (cityStats[property.city] || 0) + 1;
  }

  console.log("");
  console.log("City Distribution");
  console.log("----------------------------------");

  Object.entries(cityStats).forEach(([city, count]) => {
    console.log(`${city.padEnd(15)} : ${count}`);
  });

  console.log("----------------------------------");

  const featured = properties.filter(
    (property) => property.featured
  ).length;

  const verified = properties.filter(
    (property) => property.verified
  ).length;

  console.log("");
  console.log(`Featured Properties : ${featured}`);
  console.log(`Verified Properties : ${verified}`);

  console.log("");
  console.log("Sample Property");
  console.log("----------------------------------");

  console.log({
    title: properties[0].title,
    city: properties[0].city,
    locality: properties[0].locality,
    builder: properties[0].builder,
    project: properties[0].projectName,
    propertyType: properties[0].propertyType,
    aiScore: properties[0].aiScore,
    investmentScore: properties[0].investmentScore,
    rentalYield: properties[0].rentalYield,
    appreciation: properties[0].appreciation,
  });

  console.log("----------------------------------");

  process.exit(0);
}

generate().catch((error) => {
  console.error("");
  console.error("==================================");
  console.error("PROPERTY GENERATOR FAILED");
  console.error("==================================");
  console.error(error);

  process.exit(1);
});