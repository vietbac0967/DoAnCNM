import express from "express";

const router = express.Router();
import { verifyAccount } from "../middlewares/verifyAccount.js";
import { getConverstations } from "../controllers/converstation.controller.js";
router.get("/getAll", verifyAccount, getConverstations);
export default router;
