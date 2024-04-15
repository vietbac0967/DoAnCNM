import { Server } from "socket.io";
import http from "http";
import app from "../../app.js";
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("disconnet", () => {
    console.log("user disconnected");
  });

  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  // delete message

  // recall message
  socket.on("recall-msg", (data) => {
    console.log("recall-msg", data);
    const sendUserSocket = onlineUsers.get(data.to._id);
    socket.to(sendUserSocket).emit("recall", data);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    console.log("send-msg", data);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data);
    }
  });
  socket.on("send-image", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    console.log("send-msg", data);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
  socket.on("join-group", (groupId) => {
    console.log("join-group", groupId);
    socket.join(groupId);
  });

  socket.on("send-group-msg", (data) => {
    // console.log("send-group-msg", data);
    socket.to(data.groupId).emit("group-msg-receive", data.message);
  });
  socket.on("recall-group-msg", (data) => {
    console.log("recall-group-msg", data);
    socket.to(data.groupId).emit("group-recall", data);
  });
  // leave room
  socket.on("leave-group", (groupId) => {
    console.log("leave-group", groupId);
    socket.leave(groupId);
  });
});

export { io, server };
