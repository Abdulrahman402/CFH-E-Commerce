import { NextFunction, Request, Response } from "express";
import { compare } from "bcrypt";
import { decode } from "jsonwebtoken";

import UserRepo from "../repos/UserRepo";
import UserService from "../services/UserService";
import { FourHundredError } from "../common/customeError";
import { JWTPayload } from "../types/userTypes";

class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserRepo.userByEmail(req.body.email);
      if (user)
        throw new FourHundredError({
          error: "User already registered",
          error_code: "0000",
        });

      const addUser = await UserRepo.addUser(req.body);

      const [accessToken, refreshToken] = await Promise.all([
        UserService.generateAccessToken({
          _id: addUser!._id as string,
          role: addUser!.role,
        }),
        UserService.generateRefreshToken({ _id: addUser!._id as string }),
      ]);
      res.send({ access_token: accessToken, refresh_token: refreshToken });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserRepo.userByEmail(req.body.email);
      if (!user)
        throw new FourHundredError({
          error: "Invalid email or password",
          error_code: "0000",
        });

      const match = await compare(req.body.password, user.password);
      if (!match)
        throw new FourHundredError({
          error: "Invalid email or password",
          error_code: "0000",
        });

      const [accessToken, refreshToken] = await Promise.all([
        UserService.generateAccessToken({
          _id: user._id as string,
          role: user.role,
        }),
        UserService.generateRefreshToken({ _id: user._id as string }),
      ]);
      res.send({ access_token: accessToken, refresh_token: refreshToken });
    } catch (error) {
      next(error);
    }
  }

  async generateAccessToken(req: Request, res: Response) {
    const decoded = decode(req.body.refresh_token) as JWTPayload;
    if (!decoded) return res.status(401).send();

    const user = await UserRepo.userById(decoded._id);
    if (!user) return res.status(401).send();

    const accessToken = await UserService.generateAccessToken({
      _id: user?._id as string,
      role: user?.role,
    });

    res.status(200).send({ access_token: accessToken });
  }
}

export default new AuthController();
