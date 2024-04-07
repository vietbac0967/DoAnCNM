import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.GMAIL_AUTH, // generated ethereal user
    pass: process.env.KEY_GMAIL_SECRET, // generated ethereal password
  },
});
export const sendOTPForUser = async (otp, toEmail) => {
  try {
    transporter.sendMail({
      from: { name: "Chat App", address: "testingmtt2808@gmail.com" }, // sender address
      to: toEmail, // list of receivers
      subject:
        "Bạn đã đăng ký thành công vui lòng xác nhận để sử dụng tài khoản", // Subject line
      text: "Mã OTP của bạn là", // plain text body
      html: `<p>OTP của bạn là <b>${otp}<b></p>`, // html body
    });
    return { EC: 0, EM: "Success", DT: otp };
  } catch (error) {
    return { EC: 1, EM: error.message, DT: "" };
  }
};
