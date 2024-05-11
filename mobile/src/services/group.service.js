import api, { baseURL } from "../api/baseURL";

export const createGroupService = async (groupName, members) => {
  try {
    const response = await api.post("/group/create", {
      groupName,
      members,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getGroupsService = async () => {
  try {
    const response = await api.get("/group/getGroups");
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return [];
  }
};
export const deleteGroupService = async (groupId) => {
  try {
    const response = await api.post("/group/deleteGroup", { groupId });
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return {};
  }
};
export const getFriendsInNotGroupService = async (groupId) => {
  try {
    const response = await api.get("/user/getFriendsInNotGroup", {
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

export const getUserForGroupService = async (groupId) => {
  try {
    const response = await api.get("/group/getUserForGroup", {
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
export const getLeadForGroupService = async (groupId) => {
  try {
    const response = await api.get("/group/lead", {
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

export const addMemberToGroup = async (groupId, members) => {
  try {
    const response = await baseURL.post("/group/addMember", {
      groupId,
      members,
    });
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return {};
  }
};

export const deleteMemeberFromGroup = async (groupId, userId) => {
  try {
    const response = await api.post("/group/deleteMember", {
      groupId,
      userId,
    });
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return {};
  }
};

export const updateDeputyLeader = async (groupId, userId) => {
  try {
    const response = await api.post("/group/updateDeputyLeader", {
      groupId,
      userId,
    });
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return {};
  }
};

export const leaveGroupService = async (groupId) => {
  try {
    const response = await api.post("/group/leaveGroup", { groupId });
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return {};
  }
};

export const updateNameGroupService = async (groupId, name) => {
  try {
    const response = await api.post("/group/updateNameGroup", {
      groupId,
      name,
    });
    return response.data;
  } catch (error) {
    console.log("error:::", error);
    return {};
  }
};

export const getGroupByIdService = async (groupId) => {
  try {
    const group = await api.get("/group/byId", {
      params: {
        groupId,
      },
    });
    return group.data;
  } catch (error) {
    console.log("error:::", error);
    throw new Error(error);
  }
};
