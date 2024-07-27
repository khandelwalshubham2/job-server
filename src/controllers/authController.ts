import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import createError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig";

const sendToken = (user: any, statusCode: number, res: Response) => {
  const token = jwt.sign({ id: user._id }, envConfig.jwtSecret as string);
  user.password = undefined;
  res.status(statusCode).cookie("token", token).json({ success: true, user });
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
    sendToken(createdUser, 201, res);
  }
);

export { signup };
