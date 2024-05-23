import { RequestHandler, Router } from "express";
import * as Joi from "joi";
import { AnySchema } from "joi";
import { AllowedUsers, allowedThirdPartyGroups } from "./types";
import { authorization } from "./authorization";
import { ErrorModules, getErrorCode } from "./errorCodes";

import {
  mapSwaggerPathParamsFromStrings,
  mapSwaggerQueryParamsFromStrings,
  ResponseSchema,
  swagger,
} from "app/common/swagger";
import { validate } from "app/common/validate";
import { handleRequestError } from "app/common/CustomError";
import { cacheMiddleware } from "app/db/cache";

export const routes: string[] = [];

type Options<S extends AnySchema> = {
  readonly tags?: Array<string>;
  readonly summary: string;
  readonly requestSchema?: S;
  readonly responseSchema: ResponseSchema;
  readonly allowedUsers?: AllowedUsers;
  readonly queryParams?: string[];
  readonly middleware?: RequestHandler[];
  readonly requestFormFields?: {
    [key: string]: { type: string; format?: string };
  };
  readonly validationOptions?: Joi.ValidationOptions;
  // allowedThirdPartyGroups takes effect only with 3rd_party authorization
  readonly allowedThirdPartyGroups?: allowedThirdPartyGroups;
};

type Handler<S extends AnySchema> = RequestHandler<
  Record<string, string>,
  unknown,
  Joi.extractType<S>
>;

// match anything between a : and / or end of line
export const matchPathParams = (path: string) =>
  path.match(/(?<=:).*?(?=\/||$)\w+/g) ?? [];

export const createRouter = (
  baseUrl: string,
  baseTags: string[] = [],
  version: number | string = 1
) => {
  const router = Router();

  type AvailableMethods = "get" | "post" | "put" | "patch" | "delete";

  const route =
    (method: AvailableMethods) =>
    <TPath extends string, S extends AnySchema>(
      path: TPath,
      options: Options<S>,
      handler: Handler<S>
    ) => {
      routes.push(baseUrl + path);

      router[method](
        path,
        authorization(options.allowedUsers, options.allowedThirdPartyGroups),
        async (req, res, next) => {
          try {
            if (options.requestSchema) {
              const result = validate(
                options.requestSchema,
                req.body,
                options.validationOptions
              );
              if (result.error) {
                return res.status(422).send({
                  error: "validation error",
                  error_code: getErrorCode(
                    ErrorModules.NEXTA,
                    "VALIDATION_ERROR"
                  ),
                  details: result.error,
                });
              }
            }

            return await handler(req, res, next);
          } catch (e) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            handleRequestError(e, req as any, res, next);
          }
        }
      );
    };

  return {
    get: route("get"),
    post: route("post"),
    put: route("put"),
    patch: route("patch"),
    delete: route("delete"),
    router,
  };
};
