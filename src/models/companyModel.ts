import mongoose from "mongoose";

export interface ICompany {
  name: string;
  description: string;
  website: string;
  location: string;
  logo: string;
  userId: mongoose.Types.ObjectId;
}

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: String,
    website: String,
    location: {
      type: String,
      required: true,
    },
    logo: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

companySchema.virtual("id").get(function () {
  return this._id;
});

const Company = mongoose.model("Company", companySchema);

export default Company;
