import express from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import {
  getAllUser,
  getFriendsFollowMonthAndYear,
  getNewRegisterUsers,
  getNumberOfSendImage,
  getNumberOfSendMessaages,
} from "../controllers/admin.controller.js";
import User from "../models/user.model.js";
import logger from "../helpers/winston.log.js";
const router = express.Router();

router.get("/users", verifyAdmin, getAllUser);
router.get("/messages", verifyAdmin, getNumberOfSendMessaages);
router.get("/images", verifyAdmin, getNumberOfSendImage);
router.get("/newFriends", verifyAdmin, getFriendsFollowMonthAndYear);
router.get("/newUsers", verifyAdmin, getNewRegisterUsers);
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    logger.error(error.message);
  }
});
export default router;
