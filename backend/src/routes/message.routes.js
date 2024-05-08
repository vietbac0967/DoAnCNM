import express from "express";
// import multer from "multer";
import { verifyAccount } from "../middlewares/verifyAccount.js";
import {
    getMessages,
    deleteMessage,
    //   getMessages,
    recallMessage,
    //   sendImage,
    sendMessage,
    getMessagesGroup,
    sendMessageGroup,
    sendImage,
    sendImageGroup,
    sendFile,
    sendVideo,
} from "../controllers/message.controller.js";
import upload from "../middlewares/uploadImage.js";
import uploadFile from "../middlewares/uploadFile.js";

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
router.post("/message/deleteMessage", verifyAccount, deleteMessage);
router.post("/message/recallMessage", verifyAccount, recallMessage);
router.get("/message/messagesGroup", verifyAccount, getMessagesGroup);
router.post("/message/sendMessageGroup", verifyAccount, sendMessageGroup);
router.post(
    "/message/sendImage",
    verifyAccount,
    upload.single("image"),
    sendImage
);

router.post(
    "/message/sendImageGroup",
    verifyAccount,
    upload.single("image"),
    sendImageGroup
);

router.post(
    "/message/sendFile",
    verifyAccount,
    uploadFile.single("file"),
    sendFile
);

router.post("/message/sendVideo", verifyAccount, uploadFile.single("video"), sendVideo);

export default router;