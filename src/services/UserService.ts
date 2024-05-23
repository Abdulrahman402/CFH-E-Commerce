import { sign, verify } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import {
  AuthenticatedRequest,
  ValidationResult,
  UserPayload,
} from "../types/userTypes";

export class UserService {
  ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
  REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

  async generateAccessToken(user: { id: string }) {
    return sign(user, this.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
  }

  async generateRefreshToken(user: { id: string }) {
    return sign(user, this.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  }

  validateToken(token: string, secret: string): ValidationResult {
    try {
      const payload = verify(token, secret) as UserPayload;
      return { valid: true, payload };
    } catch (error) {
      return { valid: false, payload: null };
    }
  }

  async authenticateToken(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    const validationResult: ValidationResult = this.validateToken(
      token,
      this.ACCESS_TOKEN_SECRET
    );
    if (!validationResult.valid || !validationResult.payload)
      return res.sendStatus(403);

    req.user = validationResult.payload;
    next();
  }
}
