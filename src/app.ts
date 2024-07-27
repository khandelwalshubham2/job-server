import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

/* app.route("/").get((req, res) => {
  res.status(200).json({ message: "hi" });
});
 */
export default app;
