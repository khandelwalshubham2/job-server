import express from "express";
import isAuthenticated from "../middleware/authentication";
import isAuthorised from "../middleware/authorization";
import {
  submitApplication,
  getJobApplicants,
  updateApplicationStatus,
  getUserJobApplication,
} from "../controllers/applicationController";
import validateData from "../middleware/validation";
import { applicationSchema } from "../utils/schema";

const router = express.Router();

router
  .route("/")
  .post(
    isAuthenticated,
    isAuthorised("student"),
    validateData(applicationSchema),
    submitApplication
  );

router
  .route("/job-applicants/:jobId")
  .get(isAuthenticated, isAuthorised("recruiter"), getJobApplicants);

router
  .route("/user-applications")
  .get(isAuthenticated, isAuthorised("student"), getUserJobApplication);

router
  .route("/:id")
  .patch(isAuthenticated, isAuthorised("recruiter"), updateApplicationStatus);

export default router;
