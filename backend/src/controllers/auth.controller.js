import User from "../models/user.model.js";
import {
  loginService,
  registerService,
} from "../services/auth.service.js";

export const register = async (req, res) => {
  const result = await registerService(req.body);
  try {
    res.status(200).json(result.message);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginService(req.body);
    res.status(200).json({
      token: result.token ? result.token : null,
      message: result.message,
      user: result.user ? result.user : null,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
export const logout = async (req, res) => {
  try {
    const phone = req.params.phone;
    const user = await User.findOne({ phoneNumber: phone });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.refresh_token = "";
    user.exp_refresh_token = ""
    await user.save();
    res.status(200).json({ message: "Logout success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const result = await refreshTokenService(req.body);
    res.status(200).json(result.message);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
