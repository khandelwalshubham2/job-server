import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Job from "../models/jobModel";
import createError from "http-errors";

const createJob = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const job = await Job.create({
      ...data,
      createdBy: req.userInformation?.id,
    });
    return res
      .status(201)
      .json({ success: true, job, message: "New job create successfully" });
  }
);

const getAllJobs = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const search = req.query.search || "";
    const query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };
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

export { createJob, getAllJobs, getJobById, getJobsCreatedByRecruiter };
