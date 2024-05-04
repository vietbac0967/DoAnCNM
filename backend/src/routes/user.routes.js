import express from "express";
import { verifyAccount } from "../middlewares/verifyAccount.js";
import {
    acceptFriendRequest, deleteFriend, getFriendRequests, getFriends,
    getSentFriendRequests, getUser, getUserByPhone, getUsers, rejectFriendRequest, sendFriendRequest,
    updateUserImage,
    updatedUserInfo
} from "../controllers/user.controller.js";
import upload from "../middlewares/uploadImage.js";
import { sendImageGroup } from "../controllers/message.controller.js";
const router = express.Router();

router.get("/users", verifyAccount, getUsers);
router.post("/user", verifyAccount, getUser);

router.post("/user/getByPhone", getUserByPhone);
router.post("/user/sendFriendRequest", verifyAccount, sendFriendRequest);
router.post("/user/acceptFriendRequest", verifyAccount, acceptFriendRequest);
router.get("/user/getSentFriendRequests", verifyAccount, getSentFriendRequests);
router.get("/user/getFriendRequests", verifyAccount, getFriendRequests);
router.get("/user/getFriends", verifyAccount, getFriends);
router.post("/user/rejectFriendRequest", verifyAccount, rejectFriendRequest);
router.post("/user/deleteFriend", verifyAccount, deleteFriend);
router.post(
    "/user/updateImage",
    verifyAccount,
    upload.single("image"),
    updateUserImage
);

router.post("/update", verifyAccount, updatedUserInfo);


export default router;
