import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { decodetoken, generateRefreshToken } from "../utils/generateToken.js";
import { Types } from "mongoose";

export const verifyAccount = async (req, res, next) => {
  try {
    let token = req.cookies?.jwt;
    if (token) {
      let decoded = await decodetoken(token);
      let user = await User.findById({ _id: decoded.id });
      req.user = {
        name: user.name,
        email: user.email,
        gender: user.gender,
        is_online: user.is_online,
        avatar: user.avatar,
        phoneNumber: user.phoneNumber
      }
      next();
    } else {
      return res.status(403).json({
        EC: 1,
        EM: "you not authentication",
        DT: ''
      })
    }
    // const token = req.headers.authorization.split(" ")[1];
    // const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    // if (!decoded) {
    //   return res.status(400).json({ message: "Invalid token" });
    // }
    // if (decoded.exp < Date.now().valueOf() / 1000) {
    //   return res.status(400).json({ message: "Token expired" });
    // }
    // const user = await User.findById(decoded.id)
    // if (!user) {
    //   return res.status(400).json({ message: "User not found" });
    // }
    // req.user = user;
    // next();
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({
      EC: 1,
      EM: "you not authentication",
      DT: ''
    })
  }
};
