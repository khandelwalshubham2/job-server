import { NextFunction, Request, Response } from "express";
import Company from "../models/companyModel";
import createError from "http-errors";
import catchAsync from "../utils/catchAsync";
import uploadImage from "../utils/uploadImage";

const registerCompany = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, location, description, website } = req.body;
    const company = await Company.findOne({ name: name.toLowerCase() });
    if (company) return next(createError(400, "Company is already registered"));
    let imageUrl = "";
    if (req.file) imageUrl = await uploadImage(req.file as Express.Multer.File);
    const createCompany = await Company.create({
      name,
      location,
      description,
      website,
      userId: req.userInformation?.id,
      logo: imageUrl,
    });
    return res
      .status(201)
      .json({ success: true, message: "Company registered successfully" });
  }
);

const getCompaniesCreatedByRecruiter = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const companies = await Company.find({
      userId: req.userInformation?.id,
    }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, companies });
  }
);

const getCompanyById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const company = await Company.findById(id);
    if (!company) return next(createError(400, "Company not found"));
    return res.status(200).json({ success: true, company });
  }
);

const updateCompany = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, location, description, website } = req.body;
    const id = req.params.id;
    let imageUrl = "";
    if (req.file) imageUrl = await uploadImage(req.file as Express.Multer.File);
    const company = await Company.findByIdAndUpdate(
      id,
      {
        name,
        location,
        description,
        website,
        logo: imageUrl,
      },
      { runValidators: true, new: true }
    );
    if (!company) return next(createError(400, "Company not found"));
    return res.status(200).json({ success: true, company });
  }
);

export {
  registerCompany,
  getCompaniesCreatedByRecruiter,
  getCompanyById,
  updateCompany,
};
