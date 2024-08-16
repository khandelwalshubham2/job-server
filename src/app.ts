import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoute";
import companyRouter from "./routes/companyRoute";
import jobRouter from "./routes/jobRoute";
import applicationRouter from "./routes/applicationRoute";
import globalErrorHandler from "./middleware/globalErrorHandler";
import envConfig from "./config/envConfig";
import { localhostFrontendUrl, productionFrontEndUrl } from "./utils/constants";

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/companies", companyRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/applications", applicationRouter);

app.use(globalErrorHandler);

export default app;
