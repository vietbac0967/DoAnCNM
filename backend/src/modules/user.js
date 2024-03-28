import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    fullName: {
        type: String
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    is_online: {
        type: String,
        default: '0'
    },
    otp: {
        type: String,
    },
    refresh_token: {
        type: String,
    },
    exp_refresh_token: {
        type: Date
    }

},
    { timestamps: true }
)

const User = mongoose.model("User", userShema);

export default User;