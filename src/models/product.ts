import { Schema, model, Document, Types } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  user_id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    user_id: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", ProductSchema);

export { Product, IProduct };
