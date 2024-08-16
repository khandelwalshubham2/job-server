import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import createError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig";
import mongoose from "mongoose";

const sendToken = (user: any, statusCode: number, res: Response) => {
  const token = jwt.sign({ id: user._id }, envConfig.jwtSecret as string);
  user.password = undefined;
  res
    .status(statusCode)
    .cookie("token", token)
    .json({ success: true, user, message: "You are successfully login" });
};

const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (user) next(createError(400, "User alredy exist"));
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ success: true, message: "successfully signup" });
  }
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(createError(400, "User does not exist"));
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
      return next(createError(400, "email and password do not match"));
    sendToken(user, 200, res);
  }
);

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export { signup, login };
