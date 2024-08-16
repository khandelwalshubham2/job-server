import mongoose from "mongoose";

/* export interface IJob {
  title: string;
  description: string;
  requirements: string[];
  salary: number;
  experienceYears: number;
  location: string;
  jobType: string;
  position: string;
  company: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  applications: mongoose.Types.ObjectId[];
} */

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [String],
    salary: {
      type: Number,
      required: true,
    },
    experienceYears: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

jobSchema.virtual("id").get(function () {
  return this._id;
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
