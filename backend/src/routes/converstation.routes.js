import express from "express";

const router = express.Router();
import { verifyAccount } from "../middlewares/verifyAccount.js";
import {
  getConversationForward,
  getConverstations,
} from "../controllers/converstation.controller.js";
router.get("/getAll", verifyAccount, getConverstations);
router.get("/getForward", verifyAccount, getConversationForward);
export default router;
