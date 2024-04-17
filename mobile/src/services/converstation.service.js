import { baseURL } from "../api/baseURL";

export const getConversationsService = async (token) => {
  try {
    const response = await baseURL.get("/conversation/getAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return [];
  }
};
