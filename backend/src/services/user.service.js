import User from "../models/user.model.js";

//endpoint to find a user by phone number
export const findUserByPhone = async (phone) => {
  try {
    const user = await User.findOne({ phoneNumber: phone }).select([
      "name",
      "phoneNumber",
      "avatar",
      "_id",
    ]);
    console.log(user);
    if (!user) {
      return { EC: 1, EM: "User not found", DT: "" };
    }
    return { EC: 0, EM: "Success", DT: user };
  } catch (err) {
    return { EC: 1, EM: err.message, DT: "" };
  }
};
// endpoint to send a friend request to a user
export const sendFriendRequestToUser = async (sender, receiver) => {
  try {
    await User.findByIdAndUpdate(sender, {
      $push: {
        sentFriendRequests: receiver,
      },
    });
    await User.findByIdAndUpdate(receiver, {
      $push: {
        friendRequests: sender,
      },
    });
    return { EC: 0, EM: "Success", DT: "" };
  } catch (error) {
    return { EC: 1, EM: error.message, DT: "" };
  }
};
//endpoint to show all the friend-requests of a particular user
export const showFriendRequests = async (userId) => {
  try {
    const user = await User.findById(userId)
      .populate("friendRequests", "_id name phoneNumber avatar")
      .lean();
    if (!user) {
      return { EC: 1, EM: "User not found", DT: "" };
    }
    console.log(user.friendRequests);
    return { EC: 0, EM: "Success", DT: user.friendRequests };
  } catch (error) {
    return { EC: 1, EM: error.message, DT: "" };
  }
};
// endpoint to accept a friend request
export const acceptFriendRequestToUser = async (senderId, receiverId) => {
  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (!sender || !receiver) {
      return { EC: 1, EM: "User not found", DT: "" };
    }
    sender.friends.push(receiverId);
    receiver.friends.push(senderId);
    // delete request from user accepcted
    receiver.friendRequests = sender.friendRequests.filter(
      (friend) => friend !== receiverId
    );
    // delete request from sender
    sender.sentFriendRequests = sender.sentFriendRequests.filter(
      (friend) => friend !== receiverId
    );
    await sender.save();
    await receiver.save();
    return { EC: 0, EM: "Success", DT: "" };
  } catch (error) {
    return { EC: 1, EM: error.message, DT: "" };
  }
};
// endpoint to reject a friend request
export const rejectFriendRequestToUser = async (senderId, receiverId) => {
  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (!sender || !receiver) {
      return { EC: 1, EM: "User not found", DT: "" };
    }
    if (!sender.friendRequests.includes(receiverId)) {
      return { EC: 1, EM: "Friend request not found", DT: "" };
    }
    receiver.friendRequests = sender.friendRequests.filter(
      (friend) => friend !== receiverId
    );
    sender.sentFriendRequests = sender.sentFriendRequests.filter(
      (friend) => friend !== receiverId
    );
    await sender.save();
    await receiver.save();
    return { EC: 0, EM: "Success", DT: "" };
  } catch (error) {
    return { EC: 1, EM: error.message, DT: "" };
  }
};
// get all the friends of a user
export const showFriends = async (userId) => {
  try {
    const user = await User.findById(userId).populate("friends","_id name avatar phoneNumber").lean();
    if (!user) {
      return {
        EC: 1,
        EM: "User not found",
        DT: "",
      };
    }
    return {
      EC: 0,
      EM: "Success",
      DT: user.friends,
    };
  } catch (error) {
    return {
      EC: 1,
      EM: error.message,
      DT: "",
    };
  }
};
export const showSentFriendRequests = async (userId) => {
  try {
    const user = await User.findById(userId)
      .populate("sentFriendRequests", "name phoneNumber avatar")
      .lean();
    if (!user) {
      return { EC: 1, EM: "User not found", DT: "" };
    }
    return { EC: 0, EM: "Success", DT: user.sentFriendRequests };
  } catch (error) {
    return { EC: 1, EM: error.message, DT: "" };
  }
};
