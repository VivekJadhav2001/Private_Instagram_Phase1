import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile-pics",
    format: async (req, file) => {
      const ext = file.originalname.split(".").pop();
      return ext;
    },
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedExt = ["png", "jpg", "jpeg"];
  const ext = file.originalname.split(".").pop().toLowerCase();

  if (!allowedExt.includes(ext)) {
    return cb(new Error("Only image files are allowed"), false);
  }

  cb(null, true);
};

// Multer parser
const upload = multer({
  storage,
  fileFilter,
});

export default upload;
