import { NextFunction, Request, Response } from "express";
import createError from "http-errors";

type AsyncFuncion = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const catchAsync = (fn: AsyncFuncion) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((error: any) => {
      return next(createError(500, error.message));
    });
  };
};

export default catchAsync;
