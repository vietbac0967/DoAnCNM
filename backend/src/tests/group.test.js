import {
  createGroupService,
  getGroupsForUserService,
  deleteGroupService,
  addMemberToGroupService,
  deleteMemberFromGroupService,
  updateNameGroupService,
  updateDeputyLeaderService,
  getGroupByIdService,
} from "../services/group.service.js"; // Update the path accordingly
import Group from "../models/group.model.js"; // Import Group model
import User from "../models/user.model.js"; // Import User model
import Conversation from "../models/conversation.model.js"; // Import Conversation model
// Mock the Group and User models
jest.mock("../models/group.model.js");
jest.mock("../models/user.model.js");
jest.mock("../models/conversation.model.js");
describe("Group Service", () => {
  afterEach(() => {
    // Clear all mock calls after each test
    jest.clearAllMocks();
  });

  describe("createGroupService", () => {
    it("should return an error if groupName is not provided", async () => {
      const result = await createGroupService(
        "authorId",
        ["member1", "member2"],
        ""
      );
      expect(result).toEqual({
        EC: 1,
        EM: "Group name is required",
        DT: "",
      });
    });

    it("should return an error if members list has less than 2 members", async () => {
      const result = await createGroupService(
        "authorId",
        ["member1"],
        "Test Group"
      );
      expect(result).toEqual({
        EC: 1,
        EM: "Group must have at least 3 members",
        DT: "",
      });
    });

    it("should create a group successfully", async () => {
      const authorId = "authorId";
      const members = ["member1", "member2"];
      const groupName = "Test Group";

      const mockUser = { _id: authorId, groups: [], save: jest.fn() };
      const mockGroup = { _id: "groupId", save: jest.fn() };
      const mockConversation = { save: jest.fn() };

      User.findById.mockReturnValueOnce(mockUser);
      Group.prototype.save.mockResolvedValue(mockGroup);
      Conversation.prototype.save.mockResolvedValue(mockConversation);

      User.findById.mockImplementation((id) => {
        return id === authorId
          ? mockUser
          : { _id: id, groups: [], save: jest.fn() };
      });

      const result = await createGroupService(authorId, members, groupName);

      expect(result.EC).toEqual(0);
      expect(result.EM).toEqual("Create group successfully");
    });
  });

  describe("updateDeputyLeaderService", () => {
    it("should update the deputy leader of the group", async () => {
      // Mock data
      const groupId = "groupId";
      const userId = "userId";

      // Mock the Group.findById() method to return the group
      const mockGroup = {
        _id: groupId,
        deputyLeader: null,
        save: jest.fn(),
      };
      Group.findById.mockResolvedValue(mockGroup);

      // Call the function
      const result = await updateDeputyLeaderService(groupId, userId);

      // Verify the result
      expect(result).toEqual({
        EC: 0,
        EM: "Success",
        DT: mockGroup,
      });

      // Verify that Group.findById() is called with the correct groupId
      expect(Group.findById).toHaveBeenCalledWith(groupId);

      // Verify that the deputyLeader is updated
      expect(mockGroup.deputyLeader).toBe(userId);

      // Verify that group.save() is called
      expect(mockGroup.save).toHaveBeenCalled();
    });

    it("should return an error if the group is not found", async () => {
      // Mock the Group.findById() method to return null (group not found)
      Group.findById.mockResolvedValue(null);

      // Call the function
      const result = await updateDeputyLeaderService(
        "nonExistentGroupId",
        "userId"
      );

      // Verify the result
      expect(result).toEqual({
        EC: 1,
        EM: "Group not found",
        DT: "",
      });
    });
  });

  describe("getGroupByIdService", () => {
    it("should return the group if found", async () => {
      // Mock data
      const groupId = "groupId";
      const mockGroup = {
        _id: groupId,
        author: { _id: "authorId", name: "Author" },
        // Other group properties...
      };

      // Mock Group.findById() to return the group
      Group.findById.mockReturnValueOnce({
        populate: jest.fn().mockResolvedValue(mockGroup),
      });

      // Call the function
      const result = await getGroupByIdService(groupId);

      // Verify the result
      expect(result).toEqual({
        EC: 0,
        EM: "Success",
        DT: mockGroup,
      });

      // Verify that Group.findById() is called with the correct groupId
      expect(Group.findById).toHaveBeenCalledWith(groupId);
    });

    it("should return an error if the group is not found", async () => {
      // Mock Group.findById() to return null (group not found)
      Group.findById.mockReturnValueOnce({
        populate: jest.fn().mockResolvedValue(null),
      });
      // Call the function
      const result = await getGroupByIdService("nonExistentGroupId");

      // Verify the result
      expect(result).toEqual({
        EC: 1,
        EM: "Group not found",
        DT: "",
      });

      // Verify that Group.findById() is called with the correct groupId
      expect(Group.findById).toHaveBeenCalledWith("nonExistentGroupId");
    });
  });
  describe("addMemberToGroupService", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return an error if the group is not found", async () => {
      Group.findById.mockResolvedValue(null);

      const result = await addMemberToGroupService("groupId", [
        "member1",
        "member2",
      ]);

      expect(result).toEqual({
        EC: 1,
        EM: "Group not found",
        DT: "",
      });

      expect(Group.findById).toHaveBeenCalledWith("groupId");
    });

    it("should add members to the group successfully", async () => {
      const groupId = "groupId";
      const members = ["member1", "member2"];

      const mockGroup = {
        _id: groupId,
        members: [],
        save: jest.fn().mockResolvedValue(true),
      };
      const mockUser1 = {
        _id: "member1",
        groups: [],
        save: jest.fn().mockResolvedValue(true),
      };
      const mockUser2 = {
        _id: "member2",
        groups: [],
        save: jest.fn().mockResolvedValue(true),
      };

      Group.findById.mockResolvedValue(mockGroup);
      User.findById.mockImplementation((id) => {
        if (id === "member1") return mockUser1;
        if (id === "member2") return mockUser2;
      });

      const result = await addMemberToGroupService(groupId, members);

      expect(result).toEqual({
        EC: 0,
        EM: "Success",
        DT: mockGroup,
      });

     
    });

    it("should handle errors during the process", async () => {
      Group.findById.mockRejectedValue(new Error("Database error"));

      const result = await addMemberToGroupService("groupId", [
        "member1",
        "member2",
      ]);

      expect(result).toEqual({
        EC: 1,
        EM: "Database error",
        DT: "",
      });
    });
  });
});
