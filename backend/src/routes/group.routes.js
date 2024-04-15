import express from "express";
import { verifyAccount } from "../middlewares/verifyAccount.js";
import {
  addMemberToGroup,
  createGroup,
  deleteGroup,
  deleteMemeberFromGroup,
  getGroupsForUser,
  getLeadForGroup,
  getUserForGroup,
  leaveGroup,
  updatNameGroup,
  updateDeputyLeader,
} from "../controllers/group.controller.js";
const router = express.Router();

router.post("/create", verifyAccount, createGroup);
router.get("/getGroups", verifyAccount, getGroupsForUser);
router.post("/deleteGroup", verifyAccount, deleteGroup);
router.get("/getUserForGroup", verifyAccount, getUserForGroup);
router.post("/leaveGroup", verifyAccount, leaveGroup);
router.post("/updateNameGroup", verifyAccount, updatNameGroup);
router.post("/addMember", verifyAccount, addMemberToGroup);
router.get("/lead", verifyAccount, getLeadForGroup);
router.post("/deleteMember", verifyAccount, deleteMemeberFromGroup);
router.post("/updateDeputyLeader", verifyAccount, updateDeputyLeader);

export default router;
