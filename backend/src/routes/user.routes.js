import express from "express";
import { verifyAccount } from "../middlewares/verifyAccount.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getFriends,
  getSentFriendRequests,
  getUser,
  getUserByPhone,
  getUserInfo,
  sendFriendRequest,
  updatedUserInfo,
} from "../controllers/user.controller.js";
const router = express.Router();
router.post("/user", verifyAccount, getUser);
router.get("/info", verifyAccount, getUserInfo);
router.get("/user/getFriendRequests", verifyAccount, getFriendRequests);
router.get("/user/getFriends", verifyAccount, getFriends);
router.post("/user/getByPhone", verifyAccount, getUserByPhone);
router.post("/user/sendFriendRequest", verifyAccount, sendFriendRequest);
router.post("/user/acceptFriendRequest", verifyAccount, acceptFriendRequest);
router.get("/user/getSentFriendRequests", verifyAccount, getSentFriendRequests);
router.post("/update", verifyAccount, updatedUserInfo)
export default router;
