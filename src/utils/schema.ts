import { z } from "zod";
import { userRole } from "./constants";
import mongoose from "mongoose";

export const userRegistrationSchema = z
  .object({
    firstName: z
      .string({
        invalid_type_error: "Please Enter valid First Name",
        required_error: "First Name is required",
      })
      .min(1, "First Name must not be empty"),
    lastName: z
      .string({
        invalid_type_error: "Please Enter valid Last Name",
        required_error: "Last Name is required",
      })
      .min(1, "Last Name must not be empty"),
    email: z
      .string({
        invalid_type_error: "Please Enter valid Email",
        required_error: "Email is required",
      })
      .email("Please enter valid email"),
    password: z
      .string({
        invalid_type_error: "Please Enter valid Password",
        required_error: "Password is required",
      })
      .min(6, "Password must have 6 characters"),
    role: z.enum(userRole, {
      required_error: "Please enter user role",
      invalid_type_error: "Please enter valid user role",
    }),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: "Please Enter valid Email",
        required_error: "Email is required",
      })
      .email("Please enter valid email"),
    password: z
      .string({
        invalid_type_error: "Please Enter valid Password",
        required_error: "Password is required",
      })
      .min(6, "Password must have 6 characters"),
  })
  .strict();

export const createCompanySchema = z.object({
  name: z.string().min(1, "Please enter valid company name"),
  location: z.string().min(1, "Please enter valid location"),
});

export const createJobSchema = z.object({
  title: z.string().min(1, "Please enter valid title"),
  description: z.string().min(1, "Please enter valid description"),
  requirements: z.string(),
  salary: z.number().positive(),
  location: z.string().min(1, "Please enter valid location"),
  experienceYears: z.number().nonnegative(),
  company: z.string().refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
});

export const applicationSchema = z.object({
  job: z.string().refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
});
