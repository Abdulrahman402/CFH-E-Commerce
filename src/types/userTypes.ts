import { Request } from "express";
import { Types } from "mongoose";

export interface JWTPayload {
  _id: string;
  role?: string;
}

export interface CustomRequest extends Request {
  user?: {
    _id: Types.ObjectId;
    role: string;
  };
}
