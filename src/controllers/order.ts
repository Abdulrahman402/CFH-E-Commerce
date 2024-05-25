import { CustomRequest } from "../types/userTypes";
import { Response } from "express";
import OrderRepo from "../repos/OrderRepo";

export class OrderController {
  async addOrder(req: CustomRequest, res: Response) {
    const order = await OrderRepo.addOrder(req.user!._id, req.body.products);

    res.send(order);
  }

  async getOrders(req: CustomRequest, res: Response) {
    const order = await OrderRepo.getOrders(req.user!._id);

    res.send(order || []);
  }
}

export default new OrderController();
