import {
  acceptFriendRequestToUser,
  findUserByPhone,
  getFriendsNotInGroupService,
  getUserByIdService,
  getUserInfoService,
  rejectFriendRequestToUser,
  sendFriendRequestToUser,
  showFriendRequests,
  showFriends,
  showSentFriendRequests,
  updateUserInfoService,
  updateUserImageService,
} from "../services/user.service.js";
import s3 from "../utils/UploadCloud.js";

export const getUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        EC: 1,
        EM: "userId query parameter is required",
        DT: "",
      });
    }
    const user = await getUserByIdService(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      EC: 1,
      EM: error.message,
      DT: "",
    });
  }
};
export const getUserInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await getUserInfoService(userId);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      EC: 1,
      EM: error.message,
      DT: "",
    });
  }
};

export const getUserByPhone = async (req, res) => {
  try {
    const { phone } = req.body;
    const senderId = req.user._id;
    const user = await findUserByPhone(phone, senderId);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      EC: 1,
      EM: error.message,
      DT: "",
    });
  }
};
export const sendFriendRequest = async (req, res) => {
  try {
    const sender = req.user._id;
    const receiver = req.body.receiver;
    const result = await sendFriendRequestToUser(sender, receiver);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      EC: 1,
      EM: error.message,
      DT: "",
    });
  }
};

// Path: backend/src/services/friendRequest.service.js
export const getFriendRequests = async (req, res) => {
  try {
    const user = req.user;
    const friendRequests = await showFriendRequests(user._id);
    res.status(200).json(friendRequests);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      EC: 1,
      EM: error.message,
      DT: "",
    });
  }
};
export const acceptFriendRequest = async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.user._id;
    const result = await acceptFriendRequestToUser(senderId, receiverId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      EC: 1,
      EM: error.message,
      DT: "",
    });
  }
};
export const rejectFriendRequest = async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.user._id;
    const result = await rejectFriendRequestToUser(senderId, receiverId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      EC: 1,
      EM: error.message,
      DT: "",
    });
  }
};
// endpoint to get friends
export const getFriends = async (req, res) => {
  try {
    const user = req.user;
    console.log("UserID:::::", user._id);
    const friends = await showFriends(user._id);
    res.status(200).json(friends);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      EC: 1,
      EM: error.message,
      DT: "",
    });
  }
};
// endpoint to get sent friend requests
export const getSentFriendRequests = async (req, res) => {
  try {
    const user = req.user;
    const sentFriendRequests = await showSentFriendRequests(user._id);
    res.status(200).json(sentFriendRequests);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      EC: 1,
      EM: error.message,
      DT: "",
    });
  }
};

export const updatedUserInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedUser = await updateUserInfoService(userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      EC: 1,
      EM: "Error updating user info",
      DT: "",
    });
  }
}

// endpoint to update user image
export const updateUserImage = async (req, res) => {
  try {
    const userId = req.user._id;
    const image = req.file?.originalname;
    console.log("image::::", image);
    const fileType = image.split(".").pop();
    const filePath = `${userId}_${Date.now()}.${fileType}`;
    console.log("filePath::::", filePath);
    s3.upload(
      {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: filePath,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      },
      async (err, data) => {
        if (err) {
          res.status(500).json({ EC: 1, EM: "Error", DT: "" });
        } else {
          const result = await updateUserImageService(userId, data.Location);
          res.status(200).json(result);
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      EC: 1,
      EM: error.message,
      DT: "",
    });
  }
};
export const getFriendsInNotGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const userId = req.user._id;
    const users = await getFriendsNotInGroupService(userId, groupId);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      EC: 1,
      EM: error.message,
      DT: "",
    });
  }
};

