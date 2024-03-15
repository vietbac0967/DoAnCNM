import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyAccount = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
