import { baseURL } from "../api/baseURL";

export const getGroupsService = async (token) => {
  try {
    const response = await baseURL.get("/group/getGroups", {
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
export const deleteGroupService = async (token, groupId) => {
  try {
    const response = await baseURL.post(
      "/group/deleteGroup",
      { groupId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return {};
  }
};
export const getFriendsInNotGroupService = async (token, groupId) => {
  try {
    const response = await baseURL.get("/user/getFriendsInNotGroup", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        groupId,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return [];
  }
};

export const getUserForGroupService = async (token, groupId) => {
  try {
    const response = await baseURL.get("/group/getUserForGroup", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        groupId,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return [];
  }
};
export const getLeadForGroupService = async (token, groupId) => {
  try {
    const response = await baseURL.get("/group/lead", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        groupId,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return {};
  }
};

export const addMemberToGroup = async (token, groupId, members) => {
  try {
    const response = await baseURL.post(
      "/group/addMember",
      {
        groupId,
        members,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return {};
  }
};

export const deleteMemeberFromGroup = async (token, groupId, userId) => {
  try {
    const response = await baseURL.post(
      "/group/deleteMember",
      {
        groupId,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return {};
  }
};
export const updateDeputyLeader = async (token, groupId, userId) => {
  try {
    const response = await baseURL.post(
      "/group/updateDeputyLeader",
      {
        groupId,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return {};
  }
};

export const leaveGroupService = async (token, groupId) => {
  try {
    const response = await baseURL.post(
      "/group/leaveGroup",
      { groupId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return {};
  }
};

export const updateNameGroupService = async (token, groupId, name) => {
  try {
    const response = await baseURL.post(
      "/group/updateNameGroup",
      { groupId, name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return {};
  }
};
