import User from "../models/user.model.js";
import {
  generateRefreshToken,
  generateAccessToken,
} from "../utils/generateToken.js";
import {
  validateEmail,
  validateField,
  validatePassword,
  validatePhoneNumber,
} from "../utils/validate.js";
import { insertOTP, validateOTP } from "../services/otp.service.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import OTP from "../models/otp.model.js";
import { sendOTPForUser } from "./sendMail.service.js";

export const verifyOTPService = async ({ email, otp }) => {
  try {
    const otpHolder = await OTP.find({ email });
    if (otpHolder.length === 0)
      return {
        EC: 1,
        EM: "OTP expired",
        DT: "",
      };
    // get last otp
    const lastOTP = otpHolder[otpHolder.length - 1];
    const isValid = await validateOTP({ otp, hashOTP: lastOTP.otp });
    if (!isValid) return { EC: 1, EM: "Invalid OTP", DT: "" };
    if (isValid && email === lastOTP.email) {
      // update user verify
      const user = await User.findOne({ email });
      user.verify = true;
      await user.save();
      return {
        EC: 0,
        EM: "Success",
        DT: user.verify,
      };
    }
  } catch (err) {
    return {
      EC: 1,
      EM: err.message,
      DT: "",
    };
  }
};

/*
  - Check if any required data is missing
  - Validate email, phone number, and password
  - Check if passwords match
  - Check if the user already exists
  - Hash the password
  - Create a new user object
  - Save the new user to the database
  - create OTP for user
  - send mail to user
  - insert OTP to database
  - Return success message and the newly created user object
*/
export const registerService = async (data) => {
  try {
    const { name, phoneNumber, email, password, gender, confirmPassword } =
      data;

    if (
      !validateField(name) ||
      !validateField(phoneNumber) ||
      !validateField(email) ||
      !validateField(password) ||
      !validateField(gender) ||
      !validateField(confirmPassword)
    ) {
      return {
        EC: 1,
        EM: "Data is empty",
        DT: "",
      };
    }

    if (
      !validateEmail(email) ||
      !validatePhoneNumber(phoneNumber) ||
      !validatePassword(password)
    ) {
      return {
        EC: 1,
        EM: "Invalid data",
        DT: "",
      };
    }

    if (password !== confirmPassword) {
      return {
        EC: 1,
        EM: "Password does not match",
        DT: "",
      };
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    })
    // console.log("ExistingUser::::", existingUser);
    if (existingUser) {
      return {
        EC: 1,
        EM: "User already exists",
        DT: "",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("HashPassword::::", hashedPassword);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${name}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${name}`;
    const newUser = new User({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
      gender,
      avatar: gender === "Nam" ? boyProfilePic : girlProfilePic,
      verify: false,
    });
    await newUser.save();

    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const { EC, EM, DT } = await sendOTPForUser(otp, email);
    if (EC === 0 && EM === "Success") {
      await insertOTP(otp, email);
      return {
        EC: 0,
        EM: "Success",
        DT,
      };
    } else {
      return {
        EC: 1,
        EM: "Failed",
        DT: "",
      };
    }
  } catch (err) {
    return { EC: 1, EM: err.message, DT: "" };
  }
};

// Login service function
export const loginService = async (data) => {
  try {
    const { username, password } = data;
    if (username.trim() === "" || password.trim() === "") {
      return {
        EC: 1,
        EM: "Username or password is empty",
        DT: "",
      };
    }
    const user = await User.findOne({
      $or: [{ phoneNumber: username }, { email: username }],
    }).lean();

    if (!user) {
      return {
        EC: 1,
        EM: "User not found",
        DT: "",
      };
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return {
        EC: 1,
        EM: "Invalid password",
        DT: "",
      };
    }
    if (!user.verify) {
      return {
        EC: 1,
        EM: "User not verified",
        DT: "",
      };
    }
    const token = generateAccessToken(user._id);

    return {
      EC: 0,
      EM: "Success",
      DT: token,
    };
  } catch (err) {
    return {
      EC: 1,
      EM: err.message,
      DT: "",
    };
  }
};
