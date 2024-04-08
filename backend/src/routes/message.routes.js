import express from "express";
import { verifyAccount } from "../middlewares/verifyAccount.js";
import {
  deleteMessage,
  getMessages,
  recallMessage,
  sendMessage,
} from "../controllers/message.controller.js";
const router = express.Router();

router.post("/message/sendMessage", verifyAccount, sendMessage);
router.post("/message/getMessages", verifyAccount, getMessages);
router.post("/message/deleteMessage", verifyAccount, deleteMessage);
router.post("/message/recallMessage", verifyAccount, recallMessage);
export default router;
