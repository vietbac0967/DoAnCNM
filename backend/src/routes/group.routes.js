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
    updateImageGroup,
} from "../controllers/group.controller.js";
import upload from "../middlewares/uploadImage.js";
// import upload from "../middlewares/uploadImage.js";
const router = express.Router();

router.post("/create", verifyAccount, createGroup);
router.get("/getGroups", verifyAccount, getGroupsForUser);
router.post("/deleteGroup", verifyAccount, deleteGroup);
router.get("/getUserForGroup", verifyAccount, getUserForGroup);
router.post("/leaveGroup", verifyAccount, leaveGroup);
router.post("/addMember", verifyAccount, addMemberToGroup);
router.get("/lead", verifyAccount, getLeadForGroup);
router.post("/deleteMember", verifyAccount, deleteMemeberFromGroup);
router.post("/updateDeputyLeader", verifyAccount, updateDeputyLeader);
router.post("/updateNameGroup", verifyAccount, updatNameGroup);
router.post(
    "/updateImageGroup",
    verifyAccount,
    upload.single("image"),
    updateImageGroup
);

export default router;