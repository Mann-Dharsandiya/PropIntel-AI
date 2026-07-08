import mongoose from "mongoose";
import { env } from "../config/env";
import { UserModel } from "../models/User.model";

async function main() {
  try {
    await mongoose.connect(env.mongoUri);

    console.log("Connected to MongoDB\n");

    const users = await UserModel.find().select(
      "_id name email role"
    );

    console.table(
      users.map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      }))
    );

    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
}

main();