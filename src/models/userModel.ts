import mongoose from "mongoose";
import { userRole } from "../utils/constants";

export type Role = "student" | "recruiter";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  password: string;
  role: Role;
  profile: {
    bio: string;
    skills: string[];
    resume: string;
    resumeName: string;
    profilePhoto: string;
  };
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phoneNumber: {
      type: Number,
    },
    role: {
      type: String,
      enum: userRole,
      required: true,
    },
    profile: {
      bio: String,
      skills: [String],
      resume: String,
      resumeName: String,
      profilePhoto: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});
userSchema.virtual("id").get(function () {
  return this._id;
});

const User = mongoose.model("User", userSchema);

export default User;
