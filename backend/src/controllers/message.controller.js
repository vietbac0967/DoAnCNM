import {
  deleteMessageService,
  getMessagesService,
  recallMessageService,
  sendMessageService,
} from "../services/message.service.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user._id;
    const sendMessage = await sendMessageService(receiverId, senderId, content);
    res.status(200).json(sendMessage);
  } catch (error) {
    res.status(500).json({ EC: 1, EM: error.message, DT: "" });
  }
};
export const getMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.body.receiverId;
    console.log("receiverID::::", receiverId);
    console.log("senderID::::", senderId);
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
