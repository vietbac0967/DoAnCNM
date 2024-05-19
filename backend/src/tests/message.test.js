import {
  sendMessageService,
  getMessagesService,
  getAllMessageService,
  deleteMessageService,
  recallMessageService,
  sendMessageGroupService,
  getMessagesGroupService,
  forwardMessageService,
} from "../services/message.service";
import Message from "../models/message.model";
import Conversation from "../models/conversation.model";
import { jest } from "@jest/globals";
import { populate } from "dotenv";

jest.mock("../models/message.model");
jest.mock("../models/conversation.model");

describe("sendMessageService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return error if conversation not found", async () => {
    const receiverId = "receiverId";
    const senderId = "senderId";
    const content = "Hello";
    const messageType = "text";

    Conversation.findOne.mockResolvedValueOnce(null);

    const result = await sendMessageService(
      receiverId,
      senderId,
      content,
      messageType
    );

    expect(result).toEqual({
      EC: 1,
      EM: "Conversation not found",
      DT: "",
    });
  });

  // Write more test cases for other scenarios
});

// describe("getMessagesService", () => {
//   // Write unit tests for getMessagesService function
//   it("should return messages between sender and receiver", async () => {
//     const senderId = "senderId";
//     const receiverId = "receiverId";
//     const messages = [{ _id: "messageId1", content: "Message 1" }];

//     // Mock the Message.find() method to return messages
//     Message.find.mockResolvedValueOnce({
//       populate: jest.fn().mockResolvedValueOnce(messages), // Mocking populate function
//     });

//     const result = await getMessagesService(senderId, receiverId);

//     expect(result).toEqual({
//       EC: 0,
//       EM: "Success",
//       DT: messages,
//     });
//     // Check if Message.find() is called with the correct filter
//     expect(Message.find).toHaveBeenCalledWith({
//       $and: [
//         {
//           $or: [
//             { senderId: senderId, receiverId: receiverId },
//             { senderId: receiverId, receiverId: senderId },
//           ],
//         },
//         { senderDelete: { $ne: senderId } },
//       ],
//     });
//     // Check if populate(), sort(), skip(), and limit() methods are called with correct parameters
//     expect(Message.find().populate).toHaveBeenCalledWith(
//       "senderId",
//       "_id name avatar fileSize"
//     );
//     expect(Message.find().sort).toHaveBeenCalledWith({ createdAt: -1 });
//     expect(Message.find().skip).toHaveBeenCalledWith(0);
//     expect(Message.find().limit).toHaveBeenCalledWith(20);
//   });
// });

describe("getAllMessageService", () => {
  it("should return all messages between sender and receiver", async () => {
    const senderId = "senderId";
    const receiverId = "receiverId";
    const messages = [{ _id: "messageId1", content: "Message 1" }];

    // Mock the Message.find() method to return messages
    const mockFindResult = {
      populate: jest.fn().mockResolvedValueOnce(messages),
    };
    Message.find.mockReturnValueOnce(mockFindResult);

    const result = await getAllMessageService(senderId, receiverId);

    expect(result).toEqual({
      EC: 0,
      EM: "Success",
      DT: messages,
    });
    // Check if Message.find() is called with the correct filter
    expect(Message.find).toHaveBeenCalledWith({
      $and: [
        {
          $or: [
            { senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        },
        { senderDelete: { $ne: senderId } },
      ],
    });
    // Check if populate() is called on the result of Message.find()
    expect(mockFindResult.populate).toHaveBeenCalledWith(
      "senderId",
      "_id name avatar fileSize"
    );
  });
});

describe("deleteMessageService", () => {
  // Write unit tests for deleteMessageService function
  it("should delete the message and return success", async () => {
    // Mock the Message.findByIdAndUpdate() method to return the message
    const messageId = "messageId";
    const senderId = "senderId";
    const mockMessage = { _id: messageId, content: "Message content" };
    Message.findByIdAndUpdate.mockResolvedValueOnce(mockMessage);

    const result = await deleteMessageService(messageId, senderId);

    expect(result).toEqual({
      EC: 0,
      EM: "Success",
      DT: mockMessage,
    });
    // Check if Message.findByIdAndUpdate() is called with the correct parameters
    expect(Message.findByIdAndUpdate).toHaveBeenCalledWith(messageId, {
      senderDelete: senderId,
    });
  });

  it("should return error if message is not found", async () => {
    // Mock the Message.findByIdAndUpdate() method to return null (message not found)
    const messageId = "messageId";
    const senderId = "senderId";
    Message.findByIdAndUpdate.mockResolvedValueOnce(null);

    const result = await deleteMessageService(messageId, senderId);

    expect(result).toEqual({
      EC: 1,
      EM: "Message not found",
      DT: "",
    });
  });
});


describe("getMessagesGroupService", () => {
  // Write unit tests for getMessagesGroupService function
  describe("getMessagesGroupService", () => {
    it("should return messages for the specified group and sender", async () => {
      const groupId = "groupId";
      const senderId = "senderId";
      const messages = [
        { _id: "messageId1", content: "Message 1" },
        { _id: "messageId2", content: "Message 2" },
      ];

      // Mock Message.find() to return messages
    Message.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue(messages),
    });

      const result = await getMessagesGroupService(groupId, senderId);

      expect(result).toEqual({
        EC: 0,
        EM: "Success",
        DT: messages,
      });
      // Verify that Message.find() is called with the correct filter
      expect(Message.find).toHaveBeenCalledWith({
        $and: [{ groupId: groupId }, { senderDelete: { $ne: senderId } }],
      });
      // Verify that populate() is called with the correct parameters
      expect(Message.find().populate).toHaveBeenCalledWith(
        "senderId",
        "_id name avatar"
      );
    });

    // Additional test cases for error scenarios...
  });
});

describe("forwardMessageService", () => {
  // Write unit tests for forwardMessageService function
});
