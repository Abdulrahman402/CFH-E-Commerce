import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { parse } from "stacktrace-parser";
import logger from "../logger";
import {
  CustomError,
  FourHundredErrorName,
  FourHundredError,
} from "./customeError";

export const handleRequestError: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (err.name === "CustomError") {
    const customError = err as CustomError;
    logger.error(customError.payload, {
      ...customError.extra,
      stack: parse(customError.stack || ""),
    });
    if (customError.extra?.status) {
      res.status(customError.extra.status as number);
      if (customError.extra?.body) res.send(customError.extra.body);
      return res.end();
    }
  } else if (err.name === FourHundredErrorName) {
    console.log("Hi");
    const fourHundredError = err as FourHundredError;
    fourHundredError.body.error = fourHundredError.body.error;
    logger.error(FourHundredErrorName, {
      error: fourHundredError.body,
      stack: parse(fourHundredError.stack || ""),
    });
    return res.status(400).send(fourHundredError.body);
  } else {
    logger.error({
      message: "Server error",
      stack: parse(err.stack || ""),
      error: err,
      errorMessage: err.message,
    });
  }
  return res.status(500).end();
};
