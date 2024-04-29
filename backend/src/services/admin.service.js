import logger from "../helpers/winston.log.js";
import Conversation from "../models/converstation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getAllUserService = async (admin) => {
  try {
    const users = await User.find({ _id: { $ne: admin } }).select(
      "_id name avart phoneNumber"
    );
    return {
      EC: 0,
      EM: "Success",
      DT: users,
    };
  } catch (error) {
    logger.error(error.message);
    return {
      EC: 1,
      EM: error.message,
      DT: error,
    };
  }
};
export const getNumberOfSendMessaagesService = async (userId) => {
  try {
    const messages = await Message.find({ senderId: userId });
    return {
      EC: 0,
      EM: "Success",
      DT: messages.length,
    };
  } catch (error) {
    logger.error(error.message);
    return {
      EC: 1,
      EM: error.message,
      DT: "",
    };
  }
};
export const getNumberOfSendImageService = async (userId) => {
  try {
    const messages = await Message.find({
      senderId: userId,
      messageType: "image",
    });
    return {
      EC: 0,
      EM: "Success",
      DT: messages.length,
    };
  } catch (error) {
    logger.error(error.message);
    return {
      EC: 1,
      EM: error.message,
      DT: "",
    };
  }
};

export const getFriendsFollowMonthAndYearService = async (
  userId,
  month,
  year
) => {
  try {
    // Convert month to zero-indexed
    month = month - 1;

    const startDate = new Date(year, month);
    const endDate = new Date(year, month + 1);

    const friends = await Conversation.find({
      participants: { $in: [userId] },
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    }).populate("participants", "_id name avatar");

    return {
      EC: 0,
      EM: "Success",
      DT: friends,
    };
  } catch (error) {
    logger.error(error.message);
    return {
      EC: 1,
      EM: error.message,
      DT: "",
    };
  }
};

export const getNewRegisterUsersService = async (month, year) => {
  try {
    month = month - 1;
    const startDate = new Date(year, month);
    const endDate = new Date(year, month + 1);
    const users = await User.find({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    }).select("_id name avatar");
    return {
      EC: 0,
      EM: "Success",
      DT: users,
    };
  } catch (error) {
    logger.error(error.message);
    return {
      EC: 1,
      EM: error.message,
      DT: "",
    };
  }
};
