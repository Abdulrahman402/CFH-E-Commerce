import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import UserService from "../services/UserService";
import { validateRequest, authorizeUsers } from "../common/validate";
import OrderController from "../controllers/order";
import { addOrderSchema } from "../dto/orderSchema";

const app = express();
app.use(bodyParser.json());

app.post(
  "/add_order",
  validateRequest(addOrderSchema),
  authorizeUsers(["user"]),
  OrderController.addOrder
);

describe("ProductController", () => {
  let token: string;
  beforeAll(() => {
    token = UserService.generateAccessToken({
      _id: "665084b931aaa7d3542fcc7f",
      role: "user",
    });
  });

  it("should return 422 if body has a missing property", async () => {
    const response = await request(app)
      .post("/add_order")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(422);
  });

  it("should insert a new order", async () => {
    const response = await request(app)
      .post("/add_order")
      .send({
        products: [{ product: "665084b931aaa7d3542fcc7f", quantity: 1 }],
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
