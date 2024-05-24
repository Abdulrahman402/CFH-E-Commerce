import { Response } from "express";
import createRouter from "../common/createRouter";
import { validateRequest, authorizeUsers } from "../common/validate";
import { addProductSchema, updateProductSchema } from "../dto/productSchema";
import ProductController from "../controllers/product";
import { CustomRequest } from "../types/userTypes";

export const productRouter = createRouter({
  basePath: "/api/v1/product",
  allowedUsers: ["admin"],
  version: 1,
});

productRouter.post(
  "/add_product",
  authorizeUsers(["admin"]),
  validateRequest(addProductSchema),
  async (req: CustomRequest, res: Response) =>
    await ProductController.addproduct(req, res)
);

productRouter.get(
  "/get_product/:product_id",
  authorizeUsers(["admin"]),
  async (req: CustomRequest, res: Response) =>
    await ProductController.getProduct(req, res)
);

productRouter.get(
  "/all_products_by_user",
  authorizeUsers(["admin"]),
  async (req: CustomRequest, res: Response) =>
    await ProductController.allByUser(req, res)
);

productRouter.put(
  "/update_product/:product_id",
  authorizeUsers(["admin"]),
  validateRequest(updateProductSchema),
  async (req: CustomRequest, res: Response) =>
    await ProductController.updateProduct(req, res)
);

productRouter.delete(
  "/delete_product/:product_id",
  authorizeUsers(["admin"]),
  async (req: CustomRequest, res: Response) =>
    await ProductController.deleteProduct(req, res)
);
