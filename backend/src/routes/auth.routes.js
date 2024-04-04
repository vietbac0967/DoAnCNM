import express from "express";
import {
  account,
  login,
  logout,
  reSendEmail,
  refreshToken,
  register,
  verifyOTP,
} from "../controllers/auth.controller.js";
import { verifyAccount } from "../middlewares/verifyAccount.js";
const router = express.Router();
router.post("/register", register);
router.post("/verifyOTP", verifyOTP);
router.post("/reSendEmail", reSendEmail);
router.get("/verifyAccount", verifyAccount, account);
router.post("/login", login);
router.post("/logout/:phone", logout);
// router.post("/refreshToken", refreshToken);
export default router;
