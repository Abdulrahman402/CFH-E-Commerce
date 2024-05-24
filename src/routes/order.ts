import { Response } from "express";
import createRouter from "../common/createRouter";
import { validateRequest, authorizeUsers } from "../common/validate";
import { CustomRequest } from "../types/userTypes";
import { addOrderSchema } from "../dto/orderSchema";
import OrderController from "../controllers/order";

export const orderRouter = createRouter({
  basePath: "/api/v1/order",
  allowedUsers: ["user", "admin"],
  version: 1,
});

orderRouter.post(
  "/add_order",
  authorizeUsers(["user", "admin"]),
  validateRequest(addOrderSchema),
  async (req: CustomRequest, res: Response) =>
    await OrderController.addOrder(req, res)
);

orderRouter.get(
  "/get_orders",
  authorizeUsers(["user", "admin"]),
  async (req: CustomRequest, res: Response) =>
    await OrderController.getOrders(req, res)
);
