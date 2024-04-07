import { baseURL } from "../api/baseURL";
export const getFriendRequests = async (token) => {
  try {
    const response = await baseURL.get("user/getFriendRequests", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { EC, EM, DT } = response.data;
    if (EC === 0 && EM === "Success") {
      return DT;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};
export const getFriends = async (token) => {
  try {
    const response = await baseURL.get("user/getFriends", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { EC, EM, DT } = response.data;
    if (EC === 0 && EM === "Success") {
      return DT;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};
export const searchUser = async (token, phone) => {
  try {
    const response = await baseURL.post(
      "user/getByPhone",
      { phone },
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
      return {};
    }
  } catch (error) {
    return {};
  }
};

export const getSendFriendRequests = async (token) => {
  try {
    const response = await baseURL.get("user/getSentFriendRequests", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { EC, EM, DT } = response.data;
    if (EC === 0 && EM === "Success") {
      return DT;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};
export const acceptFriendRequest = async (token, senderId) => {
  try {
    const response = await baseURL.post(
      "user/acceptFriendRequest",
      { senderId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { EC, EM } = response.data;
    if (EC === 0 && EM === "Success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const rejectFriendRequest = async (token, senderId) => {
  try {
    const response = await baseURL.post(
      "user/rejectFriendRequest",
      { senderId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { EC, EM } = response.data;
    if (EC === 0 && EM === "Success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const sendFriendRequest = async (token, receiverId) => {
  try {
    const response = await baseURL.post(
      "user/sendFriendRequest",
      { receiverId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { EC, EM } = response.data;
    if (EC === 0 && EM === "Success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error:::", error);
    return false;
  }
};
