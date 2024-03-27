import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { generateRefreshToken } from "../utils/generateToken.js";

export const verifyAccount = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
      try {
        decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
      }
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }
    if (decoded.type === "refresh") {
      const newAccessToken = generateRefreshToken(decoded.id,process.env.JWT_REFRESH_SECRET);
      res.setHeader("Authorization", `Bearer ${newAccessToken}`);
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
