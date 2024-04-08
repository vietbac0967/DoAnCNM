import Message from "../models/message.model.js";
export const sendMessageService = async (receiverId, senderId, content) => {
  try {
    const newMessage = new Message({
      senderId,
      receiverId,
      content,
    });
    await newMessage.save();
    return {
      EC: 0,
      EM: "Success",
      DT: newMessage,
    };
  } catch (error) {
    return {
      EC: 1,
      EM: "Error",
      DT: error,
    };
  }
};
export const getMessagesService = async (senderId, receiverId) => {
  try {
    const messages = await Message.find({
      $and: [
        {
          $or: [
            { senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        },
        { senderDelete: { $ne: senderId } },
      ],
    }).populate("senderId", "_id name");

    return {
      EC: 0,
      EM: "Success",
      DT: messages,
    };
  } catch (error) {
    return {
      EC: 1,
      EM: "Error",
      DT: error,
    };
  }
};
export const deleteMessageService = async (messageId, senderID) => {
  try {
    const message = await Message.findByIdAndUpdate(messageId, {
      senderDelete: senderID,
    });
    if (!message) {
      return {
        EC: 1,
        EM: "Message not found",
        DT: "",
      };
    }
    return {
      EC: 0,
      EM: "Success",
      DT: message,
    };
  } catch (error) {
    return {
      EC: 1,
      EM: "Error",
      DT: error,
    };
  }
};
export const recallMessageService = async (messageId) => {
  try {
    const messages = await Message.findByIdAndDelete(messageId);
    if (!messages) {
      return {
        EC: 1,
        EM: "Message not found",
        DT: "",
      };
    }
    return {
      EC: 0,
      EM: "Success",
      DT: messages,
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: "Error",
      DT: error,
    };
  }
};
