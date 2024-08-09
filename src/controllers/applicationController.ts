import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Job from "../models/jobModel";
import createError from "http-errors";
import Application from "../models/applicationModel";

const applyJob = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { jobId } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return next(createError("400", "No job exist"));
    const userId = req.userInformation?.id;
    // to check user already applied
    const application = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (application) return next(createError("400", "you already applied"));
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    return res
      .status(201)
      .json({ success: true, message: "job applied successfully" });
  }
);

export { applyJob };
