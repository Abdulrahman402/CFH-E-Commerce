import { Types } from "mongoose";
import { Order, IOrder } from "../models/order";
import logger from "../logger";

class OrderRepo {
  async addOrder(
    user_id: Types.ObjectId,
    products: { product: Types.ObjectId[]; quantity: number }
  ) {
    try {
      const order = await new Order({ user_id, products }).save();

      return order;
    } catch (e) {
      logger.error(`Failed to add order ${e}`);
    }
  }

  async getOrders(user_id: Types.ObjectId) {
    try {
      const orders = await Order.find({ user_id }).populate("products.product");

      return orders;
    } catch (e) {
      logger.error(`Failed to get orders from database ${e}`);
    }
  }
}

export default new OrderRepo();
