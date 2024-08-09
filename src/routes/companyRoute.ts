import express from "express";
import isAuthenticated from "../middleware/authentication";
import isAuthorised from "../middleware/authorization";
import {
  getCompaniesCreatedByRecruiter,
  getCompanyById,
  registerCompany,
} from "../controllers/companyController";

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
  .post(isAuthenticated, isAuthorised("recruiter"), registerCompany);

router.route("/:id").get(isAuthenticated, getCompanyById);

export default router;
