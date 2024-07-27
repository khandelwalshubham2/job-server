import app from "./app";
import envConfig from "./config/envConfig";
import connectDB from "./config/db";

const PORT = envConfig.port;

connectDB();

app.listen(PORT, () => {
  console.log(`server is working on PORT ${PORT}`);
});
