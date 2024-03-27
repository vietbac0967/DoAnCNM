import User from "../models/user.model.js";
import {
  generateRefreshToken,
  generateAccessToken,
} from "../utils/generateToken.js";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../utils/validate.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
// Register service function
export const registerService = async (data) => {
  try {
    const { name, phoneNumber, email, password, gender, confirmPassword } =
      data;
    console.log(data);
    // Check if any required data is missing
    if (
      name === null ||
      phoneNumber === null ||
      email === null ||
      password === null ||
      confirmPassword == null ||
      gender === null
    ) {
      return { message: "Data is empty" };
    }

    // Validate email, phone number, and password
    if (
      !validateEmail(email) ||
      !validatePhoneNumber(phoneNumber) ||
      !validatePassword(password)
    ) {
      return { message: "Invalid data" };
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return { message: "Password does not match" };
    }

    // Check if the user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    }).exec();
    if (existingUser) {
      return { message: "User already exists" };
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user object
    const newUser = new User({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
      gender
    });

    // Save the new user to the database
    await newUser.save();

    // Return success message and the newly created user object
    return { message: "Register success", user: newUser };
  } catch (error) {
    return { message: error.message };
  }
};

// Login service function
export const loginService = async (data) => {
  try {
    const { username, password } = data;
    if (
      username === null ||
      username === "" ||
      password === null ||
      password === ""
    ) {
      return { message: "Data is empty" };
    }
    const user = await User.findOne({
      $or: [{ phoneNumber: username }, { email: username }],
    }).exec();
    if (!user) {
      return { message: "User not found" };
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return { message: "Invalid password" };
    }
    const date = new Date();

    const token = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    user.refresh_token = refreshToken;
    const expired = new Date(date.setDate(date.getDate() + 15));
    user.exp_refresh_token = expired; 
    await user.save();
    return { message: "Login success", token, refreshToken,expired };
  } catch (error) {
    return { message: error.message };
  }
};


