import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import envConfig from "../config/envConfig";
import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync";
import User, { Role } from "../models/userModel";

declare global {
  namespace Express {
    interface Request {
      userInformation?: {
        id: mongoose.Types.ObjectId;
        role: Role;
      };
    }
  }
}

interface customJwtPayload extends JwtPayload {
  id: mongoose.Types.ObjectId;
}

const isAuthenticated = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("authorization");
    if (!token) return next(createError(401, "Login First"));
    const decode = jwt.verify(
      token,
      envConfig.jwtSecret as Secret
    ) as customJwtPayload;
    const id = decode.id;
    const user = await User.findById(id);
    if (!user) return next(createError(401, "Invalid Token"));
    const userInformation = { id, role: user.role };
    req.userInformation = userInformation;
    next();
  }
);

export default isAuthenticated;
