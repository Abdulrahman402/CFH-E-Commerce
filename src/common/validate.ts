import * as Joi from "joi";
import { AnySchema, ValidationError, Schema } from "joi";

export type ResponseSchema = Record<
  number | "default",
  { schema?: Schema; [key: string]: any }
>;

export type ValidationResult<T> =
  | { error: ValidationError; value: undefined }
  | { error: undefined; value: T };

export function validate<T extends AnySchema>(
  validation: T,
  body: unknown,
  options?: Joi.ValidationOptions
): ValidationResult<Joi.extractType<T>> {
  return validation.validate(body, { abortEarly: false, ...options });
}
