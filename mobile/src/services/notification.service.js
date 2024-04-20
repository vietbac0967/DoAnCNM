import { baseURL } from "../api/baseURL";

export const sendNotificationService = async (
  receiverId,
  groupId,
  messageType,
  content,
  token
) => {
  try {
    const response = await baseURL.post(
      "/notification/sendNotification",
      {
        receiverId,
        groupId,
        messageType,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getNotificationService = async (token, receiver) => {
  try {
    const response = await baseURL.get(
      "/notification/getNotifications",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      {
        params: {
          receiver,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const readNotificationService = async (token, receiver) => {
  try {
    const response = await baseURL.post(
      "/notification/readNotification",
      { receiver },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
