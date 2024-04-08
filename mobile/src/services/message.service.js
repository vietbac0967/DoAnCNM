import { baseURL } from "../api/baseURL";
export const getMessagesService = async (token, friendId) => {
  try {
    const response = await baseURL.post(
      "message/getMessages",
      { receiverId: friendId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { EC, EM, DT } = response.data;
    if (EC === 0 && EM === "Success") {
      return DT;
    } else {
      return [];
    }
  } catch (error) {
    console.log("error:::", error);
    return [];
  }
};

export const sendMessageService = async (token, receiverId, message) => {
  try {
    const response = await baseURL.post(
      "message/sendMessage",
      { receiverId, content: message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {};
  }
};

export const deleteMessageService = async (token, messageId) => {
  try {
    const response = await baseURL.post(
      "message/deleteMessage",
      { messageId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("Error deleting message:", err);
  }
};

export const recallMessageService = async (token, messageId) => {
  try {
    const response = await baseURL.post(
      "message/recallMessage",
      { messageId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.EC === 0 && response.data.EM === "Success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error:::", error);
    return false;
  }
};
