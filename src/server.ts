import app from "./app";
import envConfig from "./config/envConfig";
import connectDB from "./config/db";
import configureCloudinary from "./config/cloudinary";

const PORT = envConfig.port;

connectDB();
configureCloudinary();

app.listen(PORT, () => {
  console.log(`server is working on PORT ${PORT}`);
});
