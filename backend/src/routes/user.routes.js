import express from "express";
import { verifyAccount } from "../middlewares/verifyAccount.js";
import {
    acceptFriendRequest, deleteFriend, getFriendRequests, getFriends,
    getSentFriendRequests, getUser, getUserByPhone, getUsers, rejectFriendRequest, sendFriendRequest
} from "../controllers/user.controller.js";
const router = express.Router();

router.get("/users", verifyAccount, getUsers);
router.get("/user", verifyAccount, getUser);

router.post("/user/getByPhone", getUserByPhone);
router.post("/user/sendFriendRequest", verifyAccount, sendFriendRequest);
router.post("/user/acceptFriendRequest", verifyAccount, acceptFriendRequest);
router.get("/user/getSentFriendRequests", verifyAccount, getSentFriendRequests);
router.get("/user/getFriendRequests", verifyAccount, getFriendRequests);
router.get("/user/getFriends", verifyAccount, getFriends);
router.post("/user/rejectFriendRequest", verifyAccount, rejectFriendRequest);
router.post("/user/deleteFriend", verifyAccount, deleteFriend);

export default router;
