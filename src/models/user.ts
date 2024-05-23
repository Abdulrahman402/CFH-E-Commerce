import { Schema, model, Types } from "mongoose";
import { hash, genSalt } from "bcrypt";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email address format",
      },
    },
    password: {
      type: String,
      required: true,
    },
    orders: [{ type: Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const salt = await genSalt(10);
    user.password = await hash(user.password, salt);
  }

  next();
});

export const User = model("User", UserSchema);
