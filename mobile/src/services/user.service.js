import api, { baseURL } from "../api/baseURL";
export const getFriendRequests = async () => {
  try {
    const response = await api.get("user/getFriendRequests");
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

export const getReceiverService = async (receiverId) => {
  try {
    const response = await api.post(`/user/`, {
      userId: receiverId,
    });
    const { EC, EM, DT } = response.data;
    if (EC === 0 && EM === "Success") {
      return DT;
    } else {
      return {};
    }
  } catch (error) {
    console.log("error:::", error); // eslint-disable-line no-console
    return {};
  }
};

export const getFriends = async () => {
  try {
    const response = await api.get("user/getFriends");
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
export const searchUser = async (phone) => {
  try {
    const response = await api.post("user/getByPhone", { phone });
    return response.data;
  } catch (error) {
    console.log("Error:::", error);
    return {};
  }
};

export const getSendFriendRequests = async () => {
  try {
    const response = await api.get("user/getSentFriendRequests");
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
export const acceptFriendRequest = async (senderId) => {
  try {
    const response = await baseURL.post("user/acceptFriendRequest", {
      senderId,
    });
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
export const rejectFriendRequest = async (senderId) => {
  try {
    const response = await api.post("user/rejectFriendRequest", { senderId });
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
export const sendFriendRequest = async (receiverId) => {
  try {
    const response = await api.post("user/sendFriendRequest", {
      receiverId,
    });
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

export const getUserInfo = async () => {
  try {
    // const response = await baseURL.get("/info", {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    const response = await api.get("/info");
    return response.data;
  } catch (error) {
    return {};
  }
};
export const sendFriendRequestService = async (receiverId) => {
  try {
    const res = await api.post("/user/sendFriendRequest", {
      receiverId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
