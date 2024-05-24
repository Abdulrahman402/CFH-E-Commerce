import { Schema, model, Types, Document } from "mongoose";

interface IOrder extends Document {
  products: [product: Types.ObjectId, quantity: number];
  user_id?: Types.ObjectId;
  orderDate: Date;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    user_id: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", OrderSchema);

export { Order, IOrder };
