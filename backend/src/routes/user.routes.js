import express from "express";
import { verifyAccount } from "../middlewares/verifyAccount.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getFriends,
  getFriendsInNotGroup,
  getSentFriendRequests,
  getUser,
  getUserByPhone,
  getUserInfo,
  sendFriendRequest,
  updateUserImage,
} from "../controllers/user.controller.js";
import upload from "../middlewares/uploadImage.js";
const router = express.Router();
router.post("/user", verifyAccount, getUser);
router.get("/info", verifyAccount, getUserInfo);
router.get("/user/getFriendRequests", verifyAccount, getFriendRequests);
router.get("/user/getFriends", verifyAccount, getFriends);
router.post("/user/getByPhone", verifyAccount, getUserByPhone);
router.post("/user/sendFriendRequest", verifyAccount, sendFriendRequest);
router.post("/user/acceptFriendRequest", verifyAccount, acceptFriendRequest);
router.get("/user/getSentFriendRequests", verifyAccount, getSentFriendRequests);
router.post(
  "/user/updateImage",
  verifyAccount,
  upload.single("image"),
  updateUserImage
);
router.get("/user/getFriendsInNotGroup", verifyAccount, getFriendsInNotGroup);
export default router;
