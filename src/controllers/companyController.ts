import { NextFunction, Request, Response } from "express";
import Company from "../models/companyModel";
import createError from "http-errors";
import catchAsync from "../utils/catchAsync";

const registerCompany = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, location } = req.body;
    const company = await Company.findOne({ name: name.toLowerCase() });
    if (company) return next(createError(400, "Company is already registered"));
    const createCompany = await Company.create({
      name,
      location,
      userId: req.userInformation?.id,
    });
    return res
      .status(201)
      .json({ success: true, message: "Company registered successfully" });
  }
);

const getCompaniesCreatedByRecruiter = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const companies = await Company.find({ userId: req.userInformation?.id });
    console.log(companies);
    return res.status(200).json({ success: true, companies });
  }
);

const getCompanyById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const company = await Company.findById(id);
    console.log(company);
    if (!company) return next(createError(400, "Company not found"));
    return res.status(200).json({ success: true, company });
  }
);

export { registerCompany, getCompaniesCreatedByRecruiter, getCompanyById };
