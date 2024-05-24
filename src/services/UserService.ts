import { sign } from "jsonwebtoken";
import { JWTPayload } from "../types/userTypes";

class UserService {
  ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
  REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

  async generateAccessToken(user: {
    _id: string;
    role: string;
  }): Promise<string> {
    const payload: JWTPayload = { _id: user._id, role: user.role };
    return sign(payload, this.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
  }

  async generateRefreshToken(user: { _id: string }): Promise<string> {
    const payload = { _id: user._id };
    return sign(payload, this.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  }
}

export default new UserService();
