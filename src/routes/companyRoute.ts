import express from "express";
import isAuthenticated from "../middleware/authentication";
import isAuthorised from "../middleware/authorization";
import {
  getCompaniesCreatedByRecruiter,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/companyController";
import validateData from "../middleware/validation";
import { createCompanySchema } from "../utils/schema";
import singleUpload from "../middleware/multer";

const router = express.Router();

router
  .route("/companies-by-rerecruiter")
  .get(
    isAuthenticated,
    isAuthorised("recruiter"),
    getCompaniesCreatedByRecruiter
  );

router
  .route("/")
  .post(
    isAuthenticated,
    isAuthorised("recruiter"),
    singleUpload,
    validateData(createCompanySchema),
    registerCompany
  );

router
  .route("/:id")
  .get(isAuthenticated, isAuthorised("recruiter"), getCompanyById)
  .patch(
    isAuthenticated,
    isAuthorised("recruiter"),
    singleUpload,
    validateData(createCompanySchema),
    updateCompany
  );

router.route("/:id").get(isAuthenticated, getCompanyById);

export default router;
