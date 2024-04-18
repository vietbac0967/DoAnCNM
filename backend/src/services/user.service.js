import User from "../models/user.model.js";

export const findUserByPhone = async (phone) => {
    try {
        const user = await User.findOne({ phoneNumber: phone }).select("-password");
        if (!user) {
            return { EC: 1, EM: "User not found", DT: "" };
        }
        // if (user.friends.includes(senderId)) {
        //     return { EC: 1, EM: "User is already your friend", DT: user };
        // }
        return { EC: 0, EM: "Success", DT: user };
    } catch (err) {
        return { EC: 1, EM: err.message, DT: "" };
    }
};

export const showFriends = async (userId) => {
    try {
        const user = await User.findById(userId)
            .populate("friends", "_id name avatar phoneNumber")
            .lean();
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
            DT: "Error in catch block",
        };
    }
};

// endpoint to get a user by id
export const getUserByIdService = async (userId) => {
    try {
        const user = await User.findById(userId)
            .select(["name", "phoneNumber", "avatar", "_id"])
            .lean();
        if (!user) {
            return { EC: 1, EM: "User not found", DT: "" };
        }
        return { EC: 0, EM: "Success", DT: user };
    } catch (error) {
        return {
            EC: 1,
            EM: error.message,
            DT: "",
        };
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

        // Check if the friendship already exists
        if (
            sender.friends.includes(receiverId) ||
            receiver.friends.includes(senderId)
        ) {
            return { EC: 1, EM: "Friendship already exists", DT: "" };
        }
        sender.friends.push(receiverId);
        receiver.friends.push(senderId);
        // delete request from user accepcted
        receiver.friendRequests = receiver.friendRequests.filter(
            (friend) => friend.toString() !== senderId.toString()
        );
        sender.sentFriendRequests = sender.sentFriendRequests.filter(
            (friend) => friend.toString() !== receiverId.toString()
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
        if (!receiver.friendRequests.includes(senderId)) {
            return { EC: 1, EM: "Friend request not found", DT: "" };
        }
        receiver.friendRequests = receiver.friendRequests.filter(
            (friend) => friend.toString() !== senderId
        );
        sender.sentFriendRequests = sender.sentFriendRequests.filter(
            (friend) => friend.toString() !== receiverId.toString()
        );
        await sender.save();
        await receiver.save();
        return { EC: 0, EM: "Success", DT: "" };
    } catch (error) {
        return { EC: 1, EM: error.message, DT: "" };
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
export const getUserInfoService = async (userId) => {
    try {
        const user = await User.findById(userId).select("-password").lean();
        if (!user) {
            return { EC: 1, EM: "User not found", DT: "" };
        }
        return { EC: 0, EM: "Success", DT: user };
    } catch (error) {
        return { EC: 1, EM: error.message, DT: "" };
    }
};

export const deleteFriendService = async (userId, friendId) => {
    try {
        // Remove the friend from the user's friends list
        await User.findByIdAndUpdate(userId, {
            $pull: { friends: friendId },
        });
        return {
            EC: 0,
            EM: "Success",
            DT: "",
        };
    } catch (error) {
        return {
            EC: 1,
            EM: error.message,
            DT: "",
        };
    }
};