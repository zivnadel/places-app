import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: {
    fileSize: 500000,
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "src/uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP];
      cb(null, uuidv4() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid =
      !!MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP];
    let error: any = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
  },
});

export default fileUpload;
