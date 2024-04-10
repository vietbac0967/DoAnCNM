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
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

export { io, server };
