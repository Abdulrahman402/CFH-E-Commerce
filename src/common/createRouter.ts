import express, { Router, Request, Response, NextFunction } from "express";

interface CreateRouterOptions {
  basePath: string;
  allowedUsers: string[];
  version: number;
}

const createRouter = ({
  basePath,
  allowedUsers,
  version,
}: CreateRouterOptions): Router => {
  const router = express.Router();

  router.use((req: Request, res: Response, next: NextFunction) => {
    (req as any).allowedUsers = allowedUsers;
    (req as any).apiVersion = version;
    next();
  });

  return router;
};

export default createRouter;
