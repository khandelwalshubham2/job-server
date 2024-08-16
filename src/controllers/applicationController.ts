import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Job from "../models/jobModel";
import createError from "http-errors";
import Application from "../models/applicationModel";

const submitApplication = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { job: jobId } = req.body;
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

const getJobApplicants = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { jobId } = req.params;
    const applications = await Application.find({
      job: jobId,
    })
      .populate("applicant")
      .sort({ createdAt: -1 });
    return res.status(201).json({ success: true, applications });
  }
);

const updateApplicationStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: applicationId } = req.params;
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      applicationId,
      {
        status,
      },
      { new: true, runValidators: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "status successfully updated" });
  }
);

const getUserJobApplication = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const applications = await Application.find({
      applicant: req.userInformation?.id,
    })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, applications });
  }
);

export {
  submitApplication,
  getJobApplicants,
  updateApplicationStatus,
  getUserJobApplication,
};
