import mongoose from "mongoose";
import envConfig from "./envConfig";

const connectDB = () => {
  const DB_URL = envConfig.databaseUrl as string;
  mongoose
    .connect(DB_URL, {
      dbName: "Job-Portal",
    })
    .then((c) => console.log("Connected to database"))
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};

export default connectDB;
