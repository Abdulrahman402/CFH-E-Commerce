import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(422).send(error.details[0].message);
    }
    next();
  };
};

const authorizeUsers = (allowedUsers: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET as string) as any;
      if (!allowedUsers.includes(decoded.role)) {
        return res.status(403).send("Access denied.");
      }
      (req as any).user = decoded;
      next();
    } catch (ex) {
      res.status(400).send("Invalid token.");
    }
  };
};

export { validateRequest, authorizeUsers };
