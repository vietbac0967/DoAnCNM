import { Server } from "socket.io";
import http from "http";
import app from "../../app.js";
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
  connectionStateRecovery: {},
});
global.onlineUsers = new Map();
let clients = [];
io.on("connection", (socket) => {
  // console.log("a user connected", socket.id);
  // store client info
  socket.on("storeClientInfo", (data) => {
    console.log("storeClientInfo", data);
    if (data && data.customId) {
      const existingClientIndex = clients.findIndex(
        (client) => client.customId === data.customId
      );

      if (existingClientIndex !== -1) {
        clients[existingClientIndex] = {
          customId: data.customId,
          clientId: socket.id,
        };
      } else {
        var clientInfo = {
          customId: data.customId,
          clientId: socket.id,
        };
        clients.push(clientInfo);
      }
      console.log(clients);
    }
  });

  socket.on("sendMessage", (data) => {
    console.log("data message:::", data);
    const sender = data.sender;
    const receiver = data.receiver;

    if (clients && clients.length > 0) {
      const index = clients.findIndex(
        (item) => item.customId.localeCompare(receiver.phone) === 0
      );
      const indexSender = clients.findIndex(
        (item) => item.customId.localeCompare(sender.phone) === 0
      );
      console.log("index:::", index);
      if (index !== -1) {
        socket.to(clients[index].clientId).emit("refreshMessage", {
          phone: sender.phone,
          userId: sender.userId,
        });
        // socket.to(clients[index].clientId).emit("refreshMessage", data);
      }
      if (indexSender !== -1) {
        socket.emit("refreshMessageSender", {
          phone: receiver.phoneNumber,
          userId: receiver.userId,
        });
      }
    }
  });

  socket.on("disconnet", () => {
    if (clients && clients.length > 0) {
      let index = clients.filter(
        (item) => item.clientId.localeCompare(socket.id) !== 0
      );
      clients = [...index];
      console.log(clients);
    }
  });
  socket.on("logout", (data) => {
    console.log("check data", data);
    if (clients && clients.length > 0) {
      const index = clients.findIndex(
        (client) => client.customId === data.customId
      );
      console.log(index);
      if (index !== -1) {
        clients.splice(index, 1);
        console.log(`Người dùng ${data.customId} đã đăng xuất.`);
      }
      console.log(clients);
    }
  });
  socket.on("joinGroup", (data) => {
    socket.join(data.groupId);
    if (data && data.user && data.name && data.groupId) {
      console.log(`User ${data.user} joined room: ${data.name}`);
    } else {
      console.log(`User ${data.user} is ready`);
    }
  });

  socket.on("sendMessageInGroup", (data) => {
    console.log(data);
    socket.to(data.groupId).emit("receiveMessageInGroup", data);
  });
  socket.on("leaveGroup", (data) => {
    socket.leave(data.groupId);
    console.log(`User ${data.user} left room: ${data.groupId}`);
  })

});

export { io, server };
