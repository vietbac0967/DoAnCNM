import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    is_online: {
      type: String,
      default: "0",
    },
    otp: {
      type: String,
    },
    refresh_token: {
      type: String,
    },
    exp_refresh_token: {
      type: Date,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
