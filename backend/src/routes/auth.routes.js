import express from "express";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import { verifyAccount } from "../middlewares/verifyAccount.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout/:phone", logout);
router.post("/refresh", refreshToken);
export default router;
