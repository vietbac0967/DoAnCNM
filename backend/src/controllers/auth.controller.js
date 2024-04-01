import User from "../models/user.model.js";
import {
  loginService,
  registerService,
  verifyOTPService,
} from "../services/auth.service.js";
import otpGenerator from "otp-generator";
import { generateRefreshToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import { sendOTPForUser } from "../services/sendMail.service.js";
import { insertOTP } from "../services/otp.service.js";

export const register = async (req, res) => {
  try {
    const { EC, EM, DT } = await registerService(req.body);
    return res.status(201).json({ EC, EM, DT });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const { EM, EC, DT } = await verifyOTPService({ email, otp });
    res.status(200).json({ EC, EM, DT });
  } catch (error) {
    next(error);
  }
};

export const reSendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    // create OTP for user
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    // insert OTP to database
    await insertOTP(otp, email);
    // send mail to user
    const { EC, EM, DT } = await sendOTPForUser(otp, email);
    res.status(200).json({ EC, EM, DT });
  } catch (err) {
    res.status(500).json({
      EC: 1,
      EM: err.message,
      DT: "",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { EC, EM, DT } = await loginService(req.body);
    res.status(200).json({ EC, EM, DT });
  } catch (error) {
    res.status(500).json({
      EC: 1,
      EM: error.message,
      DT: "",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const phone = req.body.phone;
    const user = await User.findOne({ phoneNumber: phone }).lean();
    if (!user) {
      return res.status(400).json({ EC: 1, EM: "User not found", DT: "" });
    }
    res.status(200).json({ EC: 0, EM: "Success", DT: "" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const refreshToken = generateRefreshToken(
      decoded.id,
      process.env.REFRESH_SECRET
    );
    res.status(200).json({ message: "Token refreshed", token: refreshToken });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
