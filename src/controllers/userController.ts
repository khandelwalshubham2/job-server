import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import uploadImage from "../utils/uploadImage";
import User from "../models/userModel";
import createError from "http-errors";
const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userInformation?.id;
    const { phoneNumber, bio, skills } = req.body;
    const user = await User.findById(userId);
    if (!user) return next(createError(400, "user not found"));
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile!.bio = bio;
    if (skills) user.profile!.skills = skills.split(",");
    let resumeUrl;
    let resumeName;
    if (req.file) {
      resumeName = req.file.originalname;
      resumeUrl = await uploadImage(req.file as Express.Multer.File);
      user.profile!.resume = resumeUrl;
      user.profile!.resumeName = resumeName;
    }

    await user.save();

    return res.status(200).json({ success: true, user });
  }
);

export { updateUser };
