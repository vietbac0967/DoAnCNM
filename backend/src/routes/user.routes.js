import express from "express";
import { verifyAccount } from "../middlewares/verifyAccount.js";
import { getUser, getUsers } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/users", verifyAccount, getUsers);
router.get("/user", verifyAccount, getUser);

export default router;
