import express from "express";
import { login, signup } from "../controllers/authController";
import { loginSchema, userRegistrationSchema } from "../utils/schema";
import validateData from "../middleware/validation";

const router = express.Router();

router.route("/signup").post(validateData(userRegistrationSchema), signup);
router.route("/login").post(validateData(loginSchema), login);

export default router;
