import {
  countTotalUser,
  getAllUserService,
  getNumberOfSendMessaagesService,
  getNumberOfSendImageService,
  getFriendsFollowMonthAndYearService,
  getNewRegisterUsersService,
  getTotalDataSizeOfUserService,
} from "../services/admin.service.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { Types } from "mongoose";
import Group from "../models/group.model.js";
import { jest, it, describe, expect } from "@jest/globals";

jest.mock("../models/user.model.js");
jest.mock("../models/message.model.js");
jest.mock("../models/conversation.model.js");
jest.mock("../models/group.model.js");

describe("countTotalUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return count of all entities", async () => {
    User.countDocuments.mockResolvedValueOnce(10);
    Message.countDocuments.mockResolvedValueOnce(20);
    Conversation.countDocuments.mockResolvedValueOnce(30);
    Group.countDocuments.mockResolvedValueOnce(40);

    const result = await countTotalUser();

    expect(result).toEqual({
      EC: 0,
      EM: "Success",
      DT: {
        countUser: 10,
        countMessage: 20,
        countConversation: 30,
        countGroup: 40,
      },
    });
  });

  it("should get all users except the admin", async () => {
    const mockUsers = [
      { _id: "1", name: "User1", avatar: "avatar1", phoneNumber: "123456789" },
      { _id: "2", name: "User2", avatar: "avatar2", phoneNumber: "987654321" },
    ];
    User.find.mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUsers),
    });

    const result = await getAllUserService("admin");

    expect(result).toEqual({
      EC: 0,
      EM: "Success",
      DT: mockUsers,
    });
  });

  it("should get the new registered users for a given month and year", async () => {
    const mockUsers = [
      { _id: "1", name: "User1", avatar: "avatar1" },
      { _id: "2", name: "User2", avatar: "avatar2" },
    ];
    User.find.mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUsers),
    });

    const result = await getNewRegisterUsersService(1, 2022);

    expect(result).toEqual({
      EC: 0,
      EM: "Success",
      DT: mockUsers,
    });
  });

  it("should get the number of images sent by a user", async () => {
    const mockMessages = [
      { _id: "1", senderId: "user1", content: "Hello", messageType: "image" },
      { _id: "2", senderId: "user1", content: "World", messageType: "image" },
    ];
    Message.find.mockResolvedValue(mockMessages);

    const result = await getNumberOfSendImageService("user1");

    expect(result).toEqual({
      EC: 0,
      EM: "Success",
      DT: mockMessages.length,
    });
  });

  it("should get friends of a user for a given month and year", async () => {
    const mockConversations = [
      {
        _id: "1",
        participants: ["user1", "user2"],
        createdAt: new Date(2022, 1, 1),
      },
      {
        _id: "2",
        participants: ["user1", "user3"],
        createdAt: new Date(2022, 1, 2),
      },
    ];
    Conversation.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockConversations),
    });

    const result = await getFriendsFollowMonthAndYearService("user1", 2, 2022);

    expect(result).toEqual({
      EC: 0,
      EM: "Success",
      DT: mockConversations,
    });
  });
});
