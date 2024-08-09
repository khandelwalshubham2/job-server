import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoute";
import companyRouter from "./routes/companyRoute";
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

app.use(globalErrorHandler);

export default app;
