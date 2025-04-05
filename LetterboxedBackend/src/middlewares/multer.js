import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "letterboxd",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

const upload = multer(storage);

export default upload;