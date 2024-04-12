import express from "express";
// import multer from "multer";
import { verifyAccount } from "../middlewares/verifyAccount.js";
import {
    getMessages,
    //   deleteMessage,
    //   getMessages,
    //   recallMessage,
    //   sendImage,
    sendMessage,
} from "../controllers/message.controller.js";
// import path from "path";
// import AWS from "aws-sdk";
// import Message from "../models/message.model.js";
const router = express.Router();
// const storage = multer.memoryStorage({
//   destination(req, res, cb) {
//     cb(null, "");
//   },
// });
// function checkFileType(file, cb) {
//   const fileTypes = /jpg||jpeg||png||gif/;
//   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = fileTypes.test(file.mimetype);
//   if (mimetype && extname) {
//     return cb("", true);
//   } else {
//     return cb("Error image only");
//   }
// }
// const maxsize = 1024 * 1024 * 5;
// const upload = multer({
//   storage,
//   limits: { fileSize: maxsize },
//   fileFilter(req, file, cb) {
//     checkFileType(file, cb);
//   },
// });
router.post("/message/sendMessage", verifyAccount, sendMessage);
// router.post("/message/sendImage",verifyAccount,upload.single("image"),sendImage);
router.post("/message/getMessages", verifyAccount, getMessages);
// router.post("/message/deleteMessage", verifyAccount, deleteMessage);
// router.post("/message/recallMessage", verifyAccount, recallMessage);
export default router;