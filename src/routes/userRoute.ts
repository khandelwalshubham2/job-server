import express from "express";
import { login, logout, signup } from "../controllers/authController";
import { loginSchema, userRegistrationSchema } from "../utils/schema";
import validateData from "../middleware/validation";
import isAuthenticated from "../middleware/authentication";
import isAuthorised from "../middleware/authorization";
import singleUpload from "../middleware/multer";
import { updateUser } from "../controllers/userController";

const router = express.Router();

router.route("/signup").post(validateData(userRegistrationSchema), signup);
router.route("/login").post(validateData(loginSchema), login);
router.route("/logout").post(isAuthenticated, logout);
router
  .route("/update-me")
  .patch(isAuthenticated, isAuthorised("student"), singleUpload, updateUser);
export default router;
