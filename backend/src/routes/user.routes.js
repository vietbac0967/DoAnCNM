import express from "express";
import { verifyAccount } from "../middlewares/verifyAccount.js";
import {
    acceptFriendRequest, getFriendRequests, getFriends,
    getSentFriendRequests, getUser, getUserByPhone, getUsers, sendFriendRequest
} from "../controllers/user.controller.js";
const router = express.Router();

router.get("/users", verifyAccount, getUsers);
router.get("/user", verifyAccount, getUser);

router.post("/user/getByPhone", getUserByPhone);
router.post("/user/sendFriendRequest", verifyAccount, sendFriendRequest);
router.post("/user/acceptFriendRequest", verifyAccount, acceptFriendRequest);
router.get("/user/getSentFriendRequests", getSentFriendRequests);
router.get("/user/getFriendRequests", getFriendRequests);
router.get("/user/getFriends", getFriends);

export default router;
