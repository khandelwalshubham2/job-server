import mongoose from "mongoose";
import envConfig from "./envConfig";

const connectDB = async () => {
  try {
    const DB_URL = envConfig.databaseUrl as string;
    await mongoose.connect(DB_URL, {
      dbName: "JOB-Search",
    });
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
