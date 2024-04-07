import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const verifyAccount = async (req, res, next) => {
  try {
    // const authHeader = req.headers["authorization"];
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (!decoded) {
      return res.status(400).json({ message: "Invalid token" });
    }
    if (decoded.exp < Date.now().valueOf() / 1000) {
      return res.status(400).json({ message: "Token expired" });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      
      return res.status(400).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
