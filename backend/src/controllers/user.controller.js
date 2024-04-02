import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    res.status(200).json({
      EC: 0,
      EM: "Success",
      DT: users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      EC: 1,
      EM: error.message,
      DT: "",
    });
  }
};
export const getUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      EC: 0,
      EM: "Success",
      DT: user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      EC: 1,
      EM: error.message,
      DT: "",
    });
  }
};
