import { NextFunction, Request, Response } from "express";
import { Role } from "../models/userModel";
import createError from "http-errors";

const isAuthorised = (role: Role) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.userInformation?.role;
    if (!userRole) return next(createError(401, "Please login First"));
    if (userRole !== role)
      return next(createError(403, "You are not authorised"));
    next();
  };
};

export default isAuthorised;
