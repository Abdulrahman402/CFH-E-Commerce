import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import ProductController from "../controllers/product";
import UserService from "../services/UserService";
import { validateRequest, authorizeUsers } from "../common/validate";
import { addProductSchema } from "../dto/productSchema";

const app = express();
app.use(bodyParser.json());

app.post(
  "/add_product",
  validateRequest(addProductSchema),
  authorizeUsers(["user"]),
  ProductController.addproduct
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
      .post("/add_product")
      .send({
        price: 10,
        description: "Description",
        name: "Product name",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(422);
  });

  it("should insert a new product", async () => {
    const response = await request(app)
      .post("/add_product")
      .send({
        price: 10,
        description: "Description",
        name: "Product name",
        quantity: 10,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
