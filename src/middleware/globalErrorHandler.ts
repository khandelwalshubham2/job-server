import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import envConfig from "../config/envConfig";

const globalErrorHandler = (
  error: HttpError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
    stack: envConfig.env === "development" ? error.stack : "",
  });
};

export default globalErrorHandler;
