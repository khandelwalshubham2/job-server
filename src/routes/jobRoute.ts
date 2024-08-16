import express from "express";
import isAuthenticated from "../middleware/authentication";
import isAuthorised from "../middleware/authorization";
import {
  createJob,
  getAllJobs,
  getJobById,
  getJobsCreatedByRecruiter,
  updateJob,
} from "../controllers/jobController";
import validateData from "../middleware/validation";
import { createJobSchema } from "../utils/schema";

const router = express.Router();

router
  .route("/jobs-by-recruiter")
  .get(isAuthenticated, isAuthorised("recruiter"), getJobsCreatedByRecruiter);

router
  .route("/")
  .post(
    isAuthenticated,
    isAuthorised("recruiter"),
    validateData(createJobSchema),
    createJob
  )
  .get(getAllJobs);

router
  .route("/:id")
  .get(getJobById)
  .patch(isAuthenticated, isAuthorised("recruiter"), updateJob);

export default router;
