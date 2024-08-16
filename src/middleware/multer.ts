import multer from "multer";

const storage = multer.memoryStorage();
const singleUpload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
}).single("file");

export default singleUpload;
