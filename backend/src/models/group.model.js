import mongoose from "mongoose";
const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message",
                default: [],
            },
        ],
        deputyLeader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        avatar: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);
const Group = mongoose.model("Group", groupSchema);
export default Group;