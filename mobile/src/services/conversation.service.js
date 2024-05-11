import api, { baseURL } from "../api/baseURL";

export const getConversationsService = async () => {
  try {
    // const response = await baseURL.get("/conversation/getAll", {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    const response = await api.get("/conversation/getAll");
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return [];
  }
};
export const getConversationForward = async (messageId) => {
  try {
    const response = await api.get("/conversation/getForward", {
      params: {
        messageId,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error:::", error);
  }
};
