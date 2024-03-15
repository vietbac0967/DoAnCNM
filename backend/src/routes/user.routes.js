import express from "express";
import { verifyAccount } from "../middlewares/verifyAccount.js";
import { getUsers } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/users",verifyAccount, getUsers);

export default router;
