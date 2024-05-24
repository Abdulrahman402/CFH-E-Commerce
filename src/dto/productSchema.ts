import Joi from "joi";
import { describe } from "node:test";

export const addProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number().min(1),
  quantity: Joi.number(),
});
