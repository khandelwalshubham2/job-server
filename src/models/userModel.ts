import mongoose from "mongoose";

/* export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  password: string;
  role: "student" | "recruiter";
  profile: {
    bio: string;
    skills: string[];
    resume: string;
    resumeName: string;
    profilePhoto: string;
  };
} */

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
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

const User = mongoose.model("User", userSchema);

export default User;
