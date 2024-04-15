import express from "express";
import {
  login,
  logout,
  reSendEmail,
  refreshToken,
  register,
  verifyOTP,
  forgotPassword,
  changePassword,
  account
} from "../controllers/auth.controller.js";
import { verifyAccount } from "../middlewares/verifyAccount.js";
const router = express.Router();
router.post("/register", register);
router.post("/verifyOTP", verifyOTP);
router.post("/reSendEmail", reSendEmail);
router.post("/verifyAccount", verifyAccount);
router.post("/login", login);
router.post("/logout",verifyAccount, logout);
router.post("/forgotPassword", forgotPassword);
router.post("/changePassword", changePassword);
router.get("/verifyAccount", verifyAccount, account);
// router.post("/refreshToken", refreshToken);
export default router;
