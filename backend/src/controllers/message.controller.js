import {
    deleteMessageService,
    getMessagesGroupService,
    getMessagesService,
    recallMessageService,
    sendMessageGroupService,
    sendMessageService,
} from "../services/message.service.js";
import Conversation from "../models/converstation.model.js";
import cloud from "../utils/cloudinary.js";

//   import AWS from "aws-sdk";
//   AWS.config.update({
//     region: process.env.REGION,
//     accessKeyId: process.env.ACCESS_KEY_ID,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   });
//   const s3 = new AWS.S3();
//   const bucketName = process.env.S3_BUCKET_NAME;
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const { receiverId, content } = req.body;
        const sendMessage = await sendMessageService(receiverId, senderId, content, "text");
        res.status(200).json(sendMessage);
    } catch (error) {
        res.status(500).json({ EC: 1, EM: error.message, DT: "" });
    }
};
export const sendImage = async (req, res) => {
    if (!req.file || !req.file.buffer) {
        return res.status(400).json({ EC: 1, EM: "No file provided", DT: "" });
    }
    try {
        const senderId = req.user._id;
        cloud.uploader
            .upload_stream({ resource_type: "auto" }, async (error, result) => {
                if (error) {
                    return res.status(500).json({ EC: 1, EM: "Error", DT: "" });
                } else {
                    const sendMessage = await sendMessageService(
                        req.body.receiverId,
                        senderId,
                        result.secure_url,
                        "image"
                    );
                    // push message to conversation
                    const converstation = await Conversation.findOne({
                        participants: { $all: [req.body.receiverId, senderId] },
                    });
                    if (!converstation) {
                        res.status(500).json({
                            EC: 1,
                            EM: "Error",
                            DT: "Conversation not found",
                        });
                    }
                    converstation.messages.push(sendMessage.DT._id);
                    await converstation.save();
                    return res.status(200).json(sendMessage);
                }
            })
            .end(req.file.buffer);
    } catch (error) {
        return res.status(500).json({ EC: 1, EM: error.message, DT: "" });
    }
};
export const getMessages = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.body.receiverId;

        const messages = await getMessagesService(senderId, receiverId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ EC: 1, EM: error.message, DT: "" });
    }
};
export const deleteMessage = async (req, res) => {
    try {
        const messageId = req.body.messageId;
        const senderId = req.user._id;
        const message = await deleteMessageService(messageId, senderId);
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ EC: 1, EM: error.message, DT: "" });
    }
};
export const recallMessage = async (req, res) => {
    try {
        const messageId = req.body.messageId;
        const response = await recallMessageService(messageId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ EC: 1, EM: error.message, DT: "" });
    }
};


export const getMessagesGroup = async (req, res) => {
    try {
        const senderId = req.user._id;
        const groupId = req.query.groupId;
        const messages = await getMessagesGroupService(groupId, senderId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ EC: 1, EM: error.message, DT: "" });
    }
};

export const sendMessageGroup = async (req, res) => {
    try {
        const senderId = req.user._id;
        const { groupId, content } = req.body;
        const sendMessage = await sendMessageGroupService(
            senderId,
            groupId,
            content,
            "text"
        );
        res.status(200).json(sendMessage);
    } catch (error) {
        res.status(500).json({ EC: 1, EM: error.message, DT: "" });
    }
};

export const sendImageGroup = async (req, res) => {
    if (!req.file || !req.file.buffer) {
        return res.status(400).json({ EC: 1, EM: "No file provided", DT: "" });
    }
    try {
        const senderId = req.user._id;
        cloud.uploader
            .upload_stream({ resource_type: "auto" }, async (error, result) => {
                if (error) {
                    res.status(500).json({ EC: 1, EM: "Error", DT: "" });
                } else {
                    const sendMessage = await sendMessageGroupService(
                        senderId,
                        req.body.groupId,
                        result.secure_url,
                        "image"
                    );
                    res.status(200).json(sendMessage);
                }
            })
            .end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ EC: 1, EM: error.message, DT: "" });
    }
};