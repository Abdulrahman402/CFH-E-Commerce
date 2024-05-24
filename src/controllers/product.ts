import { Response } from "express";

import { CustomRequest } from "../types/userTypes";

import ProductRepo from "../repos/ProductRepo";
import { Types } from "mongoose";

export class ProductController {
  async addproduct(req: CustomRequest, res: Response) {
    const productObject = {
      ...req.body,
      user_id: req.user!._id,
    };
    const product = await ProductRepo.addProduct(productObject);

    res.send(product);
  }

  async getProduct(req: CustomRequest, res: Response) {
    const product = await ProductRepo.productbyId(req.params.product_id);

    if (product!.user_id != (req.user!._id as unknown as Types.ObjectId))
      return res.status(403).send();

    res.send(product);
  }

  async allByUser(req: CustomRequest, res: Response) {
    const products = await ProductRepo.allProductsByUser(req.user!._id);

    res.send(products);
  }

  async updateProduct(req: CustomRequest, res: Response) {
    const productTobeUpdated = await ProductRepo.productbyId(
      req.params.product_id
    );

    if (
      productTobeUpdated!.user_id !=
      (req.user!._id as unknown as Types.ObjectId)
    )
      return res.status(403).send();

    const products = await ProductRepo.updateProduct(
      req.params.product_id,
      req.body
    );

    res.send(products);
  }

  async deleteProduct(req: CustomRequest, res: Response) {
    const productTobeDeleted = await ProductRepo.productbyId(
      req.params.product_id
    );

    if (
      productTobeDeleted!.user_id !=
      (req.user!._id as unknown as Types.ObjectId)
    )
      return res.status(403).send();

    const product = await ProductRepo.deleteProduct(req.params.product_id);

    res.send(product);
  }
}

export default new ProductController();
