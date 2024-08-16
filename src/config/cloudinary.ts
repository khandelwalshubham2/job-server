import { v2 as cloudinary } from "cloudinary";
import envConfig from "./envConfig";

const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: envConfig.cloudinaryCloud,
    api_key: envConfig.cloudinaryApiKey,
    api_secret: envConfig.cloudinarySecret,
  });
};

export default configureCloudinary;
