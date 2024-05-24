import { Schema, model, Types, Document } from "mongoose";
import { hash, genSalt } from "bcrypt";

interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  orders?: [];
}

const UserSchema = new Schema<IUser>(
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
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
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

const User = model<IUser>("User", UserSchema);

export { User, IUser };
