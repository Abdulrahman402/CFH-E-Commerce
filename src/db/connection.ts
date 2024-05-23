import mongoose from "mongoose";

import logger from "../logger";

const DB_URL = process.env.DATABASE_URL as string;

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
