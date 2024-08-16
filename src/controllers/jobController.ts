import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Job from "../models/jobModel";
import createError from "http-errors";

const createJob = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const job = await Job.create({
      ...data,
      requirements: data.requirements.split(","),
      createdBy: req.userInformation?.id,
    });
    return res
      .status(201)
      .json({ success: true, job, message: "New job create successfully" });
  }
);

const getAllJobs = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { keyword, location, profile } = req.query;
    let query: any = {};
    if (keyword)
      query = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { location: { $regex: keyword, $options: "i" } },
        ],
      };
    if (location) query.location = { $regex: location, $options: "i" };
    if (profile) query.title = { $regex: profile, $options: "i" };
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, jobs });
  }
);

const getJobById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const job = await Job.findById(id);
    if (!job) return next(createError(400, "No Company Found"));
    return res.status(200).json({ success: true, job });
  }
);

const getJobsCreatedByRecruiter = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const recruiterId = req.userInformation?.id;
    const jobs = await Job.find({ createdBy: recruiterId })
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, jobs });
  }
);

const updateJob = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const job = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) return next(createError(400, "No Company Found"));
    return res.status(200).json({ success: true, job });
  }
);

export {
  createJob,
  getAllJobs,
  getJobById,
  getJobsCreatedByRecruiter,
  updateJob,
};
