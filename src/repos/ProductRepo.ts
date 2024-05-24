import { Product, IProduct } from "../models/product";
import logger from "../logger";
import { Types } from "mongoose";

class ProductRepo {
  async addProduct(args: IProduct) {
    try {
      const product = await new Product(args).save();

      return product;
    } catch (e) {
      logger.error(`Failed to add product ${e}`);
    }
  }

  async productbyId(product_id: string) {
    try {
      const product = await Product.findById(product_id);

      return product;
    } catch (e) {
      logger.error(`Failed to get product ${e}`);
    }
  }

  async allProductsByUser(user_id: Types.ObjectId) {
    try {
      const products = await Product.find({ user_id });

      return products;
    } catch (e) {
      logger.error(`Failed to get products ${e}`);
    }
  }

  async updateProduct(product_id: string, args: IProduct) {
    try {
      const product = await Product.findByIdAndUpdate(
        { _id: product_id },
        { ...args },
        { new: true }
      );

      return product;
    } catch (e) {
      logger.error(`Failed to update product ${e}`);
    }
  }

  async deleteProduct(product_id: string) {
    try {
      const product = await Product.findByIdAndDelete({ _id: product_id });

      return product;
    } catch (e) {
      logger.error(`Failed to delete product ${e}`);
    }
  }
}

export default new ProductRepo();
