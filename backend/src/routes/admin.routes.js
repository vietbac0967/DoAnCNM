import express from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import {
  getAllUser,
  getFriendsFollowMonthAndYear,
  getNewRegisterUsers,
  getNumberOfSendImage,
  getNumberOfSendMessaages,
  getTotalDataSizeOfUser, 
  getCountUsers
} from "../controllers/admin.controller.js";
const router = express.Router();

router.get("/users", verifyAdmin, getAllUser);
router.get("/messages", verifyAdmin, getNumberOfSendMessaages);
router.get("/images", verifyAdmin, getNumberOfSendImage);
router.get("/newFriends", verifyAdmin, getFriendsFollowMonthAndYear);
router.get("/newUsers", verifyAdmin, getNewRegisterUsers);
router.get("/totalDataSize", verifyAdmin, getTotalDataSizeOfUser);
router.get("/count", getCountUsers)
export default router;
