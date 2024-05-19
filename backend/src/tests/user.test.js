import {
  findUserByPhone,
  showFriends,
  getUserByIdService,
  sendFriendRequestToUser,
  showFriendRequests,
  acceptFriendRequestToUser,
  rejectFriendRequestToUser,
  showSentFriendRequests,
  getUserInfoService,
  updateUserInfoService,
  updateUserImageService,
  getFriendsNotInGroupService,
  deleteFriendService,
} from "../services/user.service";
import User from "../models/user.model";
import Group from "../models/group.model";
import Conversation from "../models/conversation.model";
import { jest } from "@jest/globals";

jest.mock("../models/user.model");
jest.mock("../models/group.model");
jest.mock("../models/conversation.model");

describe("User Service Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findUserByPhone", () => {
    it("should return error if user is not found", async () => {
      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      const result = await findUserByPhone("1234567890", "senderId");

      expect(result).toEqual({
        EC: 1,
        EM: "User not found",
        DT: "",
      });
    });

    it("should return error if user is already a friend", async () => {
      const mockUser = { _id: "userId", friends: ["senderId"] };

      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });

      const result = await findUserByPhone("1234567890", "senderId");

      expect(result).toEqual({
        EC: 1,
        EM: "User is already your friend",
        DT: mockUser,
      });
    });

    it("should return success if user is found and not a friend", async () => {
      const mockUser = { _id: "userId", friends: [] };

      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });

      const result = await findUserByPhone("1234567890", "senderId");

      expect(result).toEqual({
        EC: 0,
        EM: "Success",
        DT: mockUser,
      });
    });
  });

  describe("showFriends", () => {
    it("should return error if user is not found", async () => {
      const userId = "userId";

      User.findById.mockReturnValueOnce({
        populate: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(null),
      });

      const result = await showFriends(userId);

      expect(result).toEqual({
        EC: 1,
        EM: "User not found",
        DT: "",
      });
    });

    it("should return success with user's friends", async () => {
      const userId = "userId";
      const mockFriends = [
        {
          _id: "friendId1",
          name: "Friend 1",
          avatar: "avatar1.png",
          phoneNumber: "1234567890",
        },
        {
          _id: "friendId2",
          name: "Friend 2",
          avatar: "avatar2.png",
          phoneNumber: "9876543210",
        },
      ];

      User.findById.mockReturnValueOnce({
        populate: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue({ friends: mockFriends }),
      });

      const result = await showFriends(userId);

      expect(result).toEqual({
        EC: 0,
        EM: "Success",
        DT: mockFriends,
      });
    });
  });

  describe("rejectFriendRequestToUser", () => {
    it("should return error if sender or receiver is not found", async () => {
      User.findById.mockResolvedValueOnce(null).mockResolvedValueOnce(null);

      const result = await rejectFriendRequestToUser("senderId", "receiverId");

      expect(result).toEqual({ EC: 1, EM: "User not found", DT: "" });
    });

    it("should return error if friend request is not found", async () => {
      User.findById
        .mockResolvedValueOnce({
          _id: "senderId",
          sentFriendRequests: ["receiverId"],
          save: jest.fn(),
        })
        .mockResolvedValueOnce({
          _id: "receiverId",
          friendRequests: [],
          save: jest.fn(),
        });

      const result = await rejectFriendRequestToUser("senderId", "receiverId");

      expect(result).toEqual({ EC: 1, EM: "Friend request not found", DT: "" });
    });

    it("should return success when friend request is rejected", async () => {
      User.findById
        .mockResolvedValueOnce({
          _id: "senderId",
          sentFriendRequests: ["receiverId"],
          save: jest.fn(),
        })
        .mockResolvedValueOnce({
          _id: "receiverId",
          friendRequests: ["senderId"],
          save: jest.fn(),
        });

      const result = await rejectFriendRequestToUser("senderId", "receiverId");

      expect(result).toEqual({ EC: 0, EM: "Success", DT: "" });
    });
  });

  describe("showSentFriendRequests", () => {
    it("should return success if user is found with sent friend requests", async () => {
      const sentFriendRequests = [
        {
          _id: "friendId",
          name: "Friend",
          phoneNumber: "1234567890",
          avatar: "avatar.png",
        },
      ];
      User.findById.mockReturnValueOnce({
        populate: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(sentFriendRequests),
      });

      const result = await showSentFriendRequests("userId");

      expect(result.EC).toEqual(0);
      expect(result.EM).toEqual("Success");
    });
  });

  describe("getUserInfoService", () => {
    it("should return success if user is found", async () => {
      const user = {
        _id: "userId",
        name: "User",
        phoneNumber: "1234567890",
        avatar: "avatar.png",
      };
      User.findById.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(user),
      });

      const result = await getUserInfoService("userId");

      expect(result.EC).toEqual(0);
      expect(result.EM).toEqual("Success");
    });
  });

  describe("updateUserInfoService", () => {
    it("should return success if user information is updated", async () => {
      const user = { _id: "userId", name: "User", save: jest.fn() };
      User.findOne.mockResolvedValue(user);

      const result = await updateUserInfoService("userId", {
        name: "Updated User",
      });

      expect(user.name).toBe("Updated User");
      expect(result).toEqual({ EC: 0, EM: "Success", DT: user });
    });
  });

  describe("updateUserImageService", () => {
    it("should return error if user is not found", async () => {
      User.findOne.mockResolvedValue(null);

      const result = await updateUserImageService("userId", "newAvatar.png");

      expect(result).toEqual({ EC: 1, EM: "User not found", DT: "" });
    });

    it("should return success if user image is updated", async () => {
      const user = { _id: "userId", avatar: "avatar.png", save: jest.fn() };
      User.findOne.mockResolvedValue(user);
      const result = await updateUserImageService("userId", "newAvatar.png");
      expect(user.avatar).toBe("newAvatar.png");
      expect(result).toEqual({ EC: 0, EM: "Success", DT: "" });
    });
  });

  describe("deleteFriendService", () => {
    it("should return success when friend is deleted", async () => {
      User.findByIdAndUpdate.mockResolvedValue(true);
      Conversation.deleteMany.mockResolvedValue(true);

      const result = await deleteFriendService("userId", "friendId");

      expect(result).toEqual({ EC: 0, EM: "Success", DT: "" });
    });
  });

  describe("getFriendsNotInGroupService", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return an error if the group is not found", async () => {
      User.findById.mockResolvedValue({
        friends: [{ _id: "friend1" }, { _id: "friend2" }],
        populate: jest.fn().mockReturnThis(),
      });
      Group.findById.mockResolvedValue(null);

      const result = await getFriendsNotInGroupService("userId", "groupId");

      expect(result).toEqual({
        EC: 1,
        EM: "Group not found",
        DT: "",
      });
      expect(User.findById).toHaveBeenCalledWith("userId");
      expect(Group.findById).toHaveBeenCalledWith("groupId");
    });

    it("should return friends not in the group excluding the deputy leader", async () => {
      const userId = "userId";
      const groupId = "groupId";
      const deputyLeaderId = "deputyLeaderId";

      const mockUser = {
        friends: [
          { _id: "friend1" },
          { _id: "friend2" },
          { _id: deputyLeaderId },
        ],
      };
      const mockGroup = {
        _id: groupId,
        deputyLeader: deputyLeaderId,
      };

      User.findById.mockReturnValueOnce({
        populate: jest.fn().mockResolvedValue(mockUser),
      })
      Group.findById.mockResolvedValue(mockGroup);

      User.find.mockResolvedValue([
        { _id: "friend1", name: "Friend One" },
        { _id: "friend2", name: "Friend Two" },
      ]);

      const result = await getFriendsNotInGroupService(userId, groupId);

      expect(result).toEqual({
        EC: 0,
        EM: "Success",
        DT: [
          { _id: "friend1", name: "Friend One" },
          { _id: "friend2", name: "Friend Two" },
        ],
      });

      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(Group.findById).toHaveBeenCalledWith(groupId);
      expect(User.find).toHaveBeenCalledWith({
        _id: { $in: ["friend1", "friend2"] },
        groups: { $nin: [groupId] },
      });
    });
  });
});
