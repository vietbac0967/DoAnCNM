import mongoose from "mongoose";

const otpModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: String,
  time: {
    type: Date,
    default: Date.now,
    index: { expires: "120" },
  },
});

const OTP = mongoose.model("OTP", otpModel);
export default OTP;
