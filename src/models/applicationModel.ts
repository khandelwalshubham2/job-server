import mongoose from "mongoose";
import { applicationStatus } from "../utils/constants";

export interface IApplication {}

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: applicationStatus,
      default: "pending",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

applicationSchema.virtual("id").get(function () {
  return this._id;
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
