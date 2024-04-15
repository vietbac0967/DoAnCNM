import {
  deleteMessageService,
  getMessagesGroupService,
  getMessagesService,
  recallMessageService,
  sendMessageGroupService,
  sendMessageService,
} from "../services/message.service.js";
import AWS from "aws-sdk";
AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();
const bucketName = process.env.S3_BUCKET_NAME;
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId, content } = req.body;
    const sendMessage = await sendMessageService(
      receiverId,
      senderId,
      content,
      "text"
    );
    res.status(200).json(sendMessage);
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
/**
 * Sends an image to the recipient.
 * @param {Object} req - The request object.
 * @param {Object} req.user - The user object from the request.
 * @param {string} req.user._id - The ID of the sender.
 * @param {Object} req.file - The uploaded file object.
 * @param {string} req.file.originalname - The original name of the uploaded file.
 * @param {Buffer} req.file.buffer - The buffer containing the file data.
 * @param {string} req.file.mimetype - The MIME type of the file.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the image is sent.
 */
export const sendImage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const image = req.file?.originalname;
    console.log("image::::", image);
    const fileType = image.split(".").pop();
    console.log("fileType::::", fileType);
    const filePath = `${senderId}_${Date.now()}.${fileType}`;
    s3.upload(
      {
        Bucket: bucketName,
        Key: filePath,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      },
      async (err, data) => {
        if (err) {
          res.status(500).json({ EC: 1, EM: "Error", DT: "" });
        } else {
          const sendMessage = await sendMessageService(
            req.body.receiverId,
            senderId,
            data.Location,
            "image"
          );
          res.status(200).json(sendMessage);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ EC: 1, EM: error.message, DT: "" });
  }
};
/**
 * Sends an image to a group.
 * @param {Object} req - The request object.
 * @param {Object} req.user - The user object.
 * @param {string} req.user._id - The ID of the sender.
 * @param {Object} req.file - The uploaded file object.
 * @param {string} req.file.originalname - The original name of the uploaded file.
 * @param {Buffer} req.file.buffer - The buffer containing the file data.
 * @param {string} req.file.mimetype - The MIME type of the file.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the image is sent to the group.
 */
export const sendImageGroup = async (req, res) => {
  try {
    const senderId = req.user._id;
    const image = req.file?.originalname;
    console.log("image::::", image);
    const fileType = image.split(".").pop();
    console.log("fileType::::", fileType);
    const filePath = `${senderId}_${Date.now()}.${fileType}`;
    s3.upload(
      {
        Bucket: bucketName,
        Key: filePath,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      },
      async (err, data) => {
        if (err) {
          res.status(500).json({ EC: 1, EM: "Error", DT: "" });
        } else {
          const sendMessage = await sendMessageGroupService(
            senderId,
            req.body.groupId,
            data.Location,
            "image"
          );
          res.status(200).json(sendMessage);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ EC: 1, EM: error.message, DT: "" });
  }
};

/* 
  
*/
/**
 * Retrieves messages between the sender and receiver.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the retrieved messages.
 */
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
/**
 * Deletes a message.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the message is deleted.
 */
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
/**
 * Recall a message.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the message is recalled.
 */
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
    const senderId = req.user._id
    const groupId = req.query.groupId;
    console.log("groupId::::", groupId);
    const messages = await getMessagesGroupService(groupId,senderId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ EC: 1, EM: error.message, DT: "" });
  }
};
