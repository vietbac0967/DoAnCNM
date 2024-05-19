import Notification from "../models/notification.model.js";
import {
  createNotificationService,
  getNotificationsService,
  readNotificationService,
} from "../services/notification.service.js"; // Update the path accordingly

// Mock the Notification model
jest.mock("../models/notification.model.js");

describe("Notification Service", () => {
  afterEach(() => {
    // Clear all mock calls after each test
    jest.clearAllMocks();
  });

  describe("createNotificationService", () => {
    it("should create notification successfully", async () => {
      const senderId = "senderId";
      const receiverId = "receiverId";
      const groupId = "groupId";
      const content = "Notification content";
      const messageType = "info";

      const notification = {
        _id: "notificationId",
        senderId,
        receiverId,
        groupId,
        content,
        type: messageType,
      };

      // Mock the save method of the Notification model to resolve with the notification object
      Notification.prototype.save.mockResolvedValueOnce(notification);

      const result = await createNotificationService(
        senderId,
        receiverId,
        groupId,
        content,
        messageType
      );

      expect(Notification.prototype.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ EC: 0, EM: "Success", DT: notification });
    });

    // Additional test cases for error scenarios...
  });

  describe("getNotificationsService", () => {
    it("should get notifications successfully", async () => {
      const receiver = "receiverId";
      const userId = "userId";
      const notifications = [
        { _id: "notificationId", content: "Notification content" },
      ];

      // Mock the find method of the Notification model to resolve with notifications
      Notification.find.mockResolvedValueOnce(notifications);

      const result = await getNotificationsService(receiver, userId);

      expect(Notification.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ EC: 0, EM: "Success", DT: notifications });
    });

    // Additional test cases for error scenarios...
  });

  describe("readNotificationService", () => {
    it("should mark notifications as read successfully", async () => {
      const receiver = "receiverId";
      const userId = "userId";
      const notifications = { nModified: 1 };

      // Mock the updateMany method of the Notification model to resolve with notifications
      Notification.updateMany.mockResolvedValueOnce(notifications);

      const result = await readNotificationService(receiver, userId);

      expect(Notification.updateMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ EC: 0, EM: "Success", DT: notifications });
    });

    // Additional test cases for error scenarios...
  });
});
