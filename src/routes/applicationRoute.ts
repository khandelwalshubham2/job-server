import express from "express";
import isAuthenticated from "../middleware/authentication";
import isAuthorised from "../middleware/authorization";
import { applyJob } from "../controllers/applicationController";
import validateData from "../middleware/validation";
import { applicationSchema } from "../utils/schema";

const router = express.Router();

router
  .route("/")
  .post(
    isAuthenticated,
    isAuthorised("student"),
    validateData(applicationSchema),
    applyJob
  );

export default router;
