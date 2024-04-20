import Notification from "../models/notification.model.js";

export const createNotificationService = async (
  senderId,
  receiverId,
  groupId,
  content,
  messageType
) => {
  try {
    const notification = new Notification({
      senderId,
      receiverId,
      groupId,
      content,
      type: messageType,
    });
    await notification.save();
    return {
      EC: 0,
      EM: "Success",
      DT: notification,
    };
  } catch (error) {
    return {
      EC: 1,
      EM: error.message,
      DT: "",
    };
  }
};
export const getNotificationsService = async (receiver) => {
  try {
    const notifications = await Notification.find({
      $and: [
        {
          $or: [{ receiverId: receiver }, { groupId: receiver }],
        },
        { read: false },
      ],
    });
    return {
      EC: 0,
      EM: "Success",
      DT: notifications,
    };
  } catch (error) {
    return {
      EC: 1,
      EM: error.message,
      DT: "",
    };
  }
};
export const readNotificationService = async (receiver) => {
  try {
    const notifications = await Notification.updateMany(
      {
        $or: [{ receiverId: receiver }, { groupId: receiver }],
      },
      { read: true }
    );
    return {
      EC: 0,
      EM: "Success",
      DT: notifications,
    };
  } catch (error) {
    return {
      EC: 1,
      EM: error.message,
      DT: "",
    };
  }
};
