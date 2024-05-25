import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/CFH");
});

afterAll(async () => {
  await mongoose.connection.close();
});
