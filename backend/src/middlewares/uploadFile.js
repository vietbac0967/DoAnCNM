import multer from "multer";
import path from "path";

const storage = multer.memoryStorage({
  destination(req, res, cb) {
    cb(null, "");
  },
});

function checkFileType(file, cb) {
  const extname = path.extname(file.originalname).toLowerCase();
  if (extname) {
    return cb(null, true);
  } else {
    return cb("Error: Files only!");
  }
}

const uploadFile = multer({
  storage,
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
});

export default uploadFile;
