import api, { baseURL } from "../api/baseURL";

export const sendNotificationService = async (
  receiverId,
  groupId,
  messageType,
  content
) => {
  try {
    const response = await api.post("/notification/sendNotification", {
      receiverId,
      groupId,
      messageType,
      content,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getNotificationService = async (receiver) => {
  try {
    const response = await api.get("/notification/getNotifications", {
      params: {
        receiver,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const readNotificationService = async (receiver) => {
  try {
    const response = await api.post("/notification/readNotification", {
      receiver,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
