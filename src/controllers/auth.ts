import { Request, Response } from "express";
import { compare } from "bcrypt";

import UserRepo from "../repos/UserRepo";
import UserService from "../services/UserService";

class AuthController {
  async signUp(req: Request, res: Response) {
    const user = await UserRepo.userByEmail(req.body.email);
    if (user) return res.status(400).send("User already registered");

    const addUser = await UserRepo.addUser(req.body);

    const [accessToken, refreshToken] = await Promise.all([
      UserService.generateAccessToken({
        _id: addUser!._id as string,
        role: addUser!.role,
      }),
      UserService.generateRefreshToken({ _id: addUser!._id as string }),
    ]);
    res.send({ access_token: accessToken, refresh_token: refreshToken });
  }

  async login(req: Request, res: Response) {
    const user = await UserRepo.userByEmail(req.body.email);
    if (!user) return res.status(400).send("Invalid email or password");

    const match = await compare(req.body.password, user.password);
    if (!match) return res.status(400).send("Invalid email or password");

    const [accessToken, refreshToken] = await Promise.all([
      UserService.generateAccessToken({
        _id: user._id as string,
        role: user.role,
      }),
      UserService.generateRefreshToken({ _id: user._id as string }),
    ]);
    res.send({ access_token: accessToken, refresh_token: refreshToken });
  }
}

export default new AuthController();
