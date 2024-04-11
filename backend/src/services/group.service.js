
import Group from "../models/group.model.js";
export const createGroup = async (author, member, name) => {
  try {
    const group = new Group({
      author,
      member,
      name,
    });
    await group.save();
    return {
      EC: 0,
      EM: "Create group successfully",
      DT: group,
    };
  } catch (error) {
    return {
      EC: 1,
      EM: error.message,
      DT: "",
    };
  }
};
