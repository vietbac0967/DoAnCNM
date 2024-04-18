import express from "express";
import { verifyAccount } from "../middlewares/verifyAccount.js";
import {
  deleteMessage,
  forwardMessage,
  getMessages,
  getMessagesGroup,
  recallMessage,
  sendImage,
  sendImageGroup,
  sendMessage,
  sendMessageGroup,
} from "../controllers/message.controller.js";
import updoad from "../middlewares/uploadImage.js";
const router = express.Router();
router.post("/message/sendMessage", verifyAccount, sendMessage);
router.post(
  "/message/sendImage",
  verifyAccount,
  updoad.single("image"),
  sendImage
);
router.post("/message/getMessages", verifyAccount, getMessages);
router.post("/message/deleteMessage", verifyAccount, deleteMessage);
router.post("/message/recallMessage", verifyAccount, recallMessage);
router.get("/message/messagesGroup", verifyAccount, getMessagesGroup);
router.post("/message/sendMessageGroup", verifyAccount, sendMessageGroup);
router.post(
  "/message/sendImageGroup",
  verifyAccount,
  updoad.single("image"),
  sendImageGroup
);
router.post("/message/forwardMessage", verifyAccount, forwardMessage);
export default router;
