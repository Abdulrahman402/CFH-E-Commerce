import Joi from "joi";

export const addOrderSchema = Joi.object({
  products: Joi.array().items(
    Joi.object({
      product: Joi.string().required(),
      quantity: Joi.number().required(),
    })
  ),
});
