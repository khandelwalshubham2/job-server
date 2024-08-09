import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoute";
import companyRouter from "./routes/companyRoute";
import jobRouter from "./routes/jobRoute";
import applicationRouter from "./routes/applicationRoute";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

/* app.route("/").get((req, res) => {
  res.status(200).json({ message: "hi" });
});
 */

app.use("/api/v1/users", userRouter);
app.use("/api/v1/companies", companyRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/application", applicationRouter);

app.use(globalErrorHandler);

export default app;
