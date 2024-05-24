import { Express, json } from "express";
import { authRouter } from "./auth";
import { productRouter } from "./product";
import { orderRouter } from "./order";

export const routes = (app: Express) => {
  app.use(json());
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/product", productRouter);
  app.use("/api/v1/order", orderRouter);
};
