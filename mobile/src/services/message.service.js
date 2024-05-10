import { Alert } from "react-native";
import api, { baseURL } from "../api/baseURL";

export const getMessagesService = async (friendId, currentPage) => {
  try {
    const response = await api.post("/message/getMessages", {
      receiverId: friendId,
      page: currentPage,
    });
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

export const getAllMessagesService = async (receiverId) => {
  try {
    const response = await api.get("/message/getAllMessages", {
      params: {
        receiverId,
      },
    });
    return response.data;
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};

export const sendMessageService = async (receiverId, message) => {
  try {
    const response = await api.post("message/sendMessage", {
      receiverId,
      content: message,
    });
    return response.data;
  } catch (error) {
    return {};
  }
};
export const sendImageService = async (data) => {
  try {
    const response = await api.post("/message/sendImage", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return {};
  }
};
export const sendMessageGroupService = async (groupId, message) => {
  try {
    const response = await api.post("/message/sendMessageGroup", {
      groupId,
      content: message,
    });
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return {};
  }
};

export const deleteMessageService = async (messageId) => {
  try {
    const response = await api.post("message/deleteMessage", { messageId });
    return response.data;
  } catch (err) {
    console.log("Error deleting message:", err);
  }
};

export const recallMessageService = async (messageId) => {
  try {
    const response = await api.post("message/recallMessage", { messageId });
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return false;
  }
};

export const forwardMessageService = async (messageId, receiverId, groupId) => {
  try {
    const response = await api.post("/message/forwardMessage", {
      messageId,
      receiverId,
      groupId,
    });
    return response.data;
  } catch (error) {
    console.log("error:::", error);
  }
};

export const getMessagesGroupService = async (groupId) => {
  try {
    const response = await api.get("/message/messagesGroup", {
      params: {
        groupId,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
