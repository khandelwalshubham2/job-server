import express from "express";
import { signup } from "../controllers/authController";
import { userRegistrationSchema } from "../utils/schema";
import validateData from "../middleware/validation";

const router = express.Router();

router.route("/signup").post(validateData(userRegistrationSchema), signup);

export default router;
