import { io } from "socket.io-client";
import { URL_SERVER } from "@env";
const socket = io(URL_SERVER);

const handleCusttomClientSocket = (data) => {
  socket.emit("storeClientInfo", data);
};

const handleRefreshAccount = (callback) => {
  socket.on("refresh", callback);
};

const handleOffefreshAccount = () => {
  socket.off("refresh");
};

const handleroffefreshMessange = () => {
  socket.off("refreshmessange");
};

const handleRefreshMessageSocket = (callback) => {
  socket.on("refreshMessage", callback);
};

const handleRefreshMessageSenderSocket = (callback) => {
  socket.on("refreshMessageSender", callback);
};

const handleDisconnectSocket = (callback) => {
  socket.emit("disconnet", callback);
};
const handleLogoutUserSocket = (data) => {
  socket.emit("logout", data);
};
const handleAcctiveDisconnect = () => {
  socket?.disconnect();
};

const handlSendMessageSocket = (data) => {
  socket.emit("sendMessage", data);
};

const handleSendText = (data) => {
  socket.emit("sendtest", data);
};

const handleSendAddGroup = () => {
  socket.emit("sendaddgroup");
};

const handleactionaddgroup = (callback) => {
  socket.on("sendaddgroup", callback);
};

const handlerefreshMessangeingroup = (callback) => {
  socket.on("refreshmessangeingroup", callback);
};
const handleSendMessageInGroupSocket = (data) => {
  socket.emit("sendMessageInGroup", data);
};
const handleReceiveMessageInGroupSocket = (callback) => {
  socket.on("receiveMessageInGroup", callback);
};
const handleJoinGroupSocket = (data) => {
  socket.emit("joinGroup", data);
};

const handleLeaveGroupUserSocket = (data) => {
  socket.emit("leaveGroup", data);
};

export {
  handleCusttomClientSocket,
  handlSendMessageSocket,
  handleRefreshMessageSocket,
  handleRefreshMessageSenderSocket,
  handleJoinGroupSocket,
  handleSendMessageInGroupSocket,
  handleReceiveMessageInGroupSocket,
  handleLogoutUserSocket,
  handleDisconnectSocket,
  handleLeaveGroupUserSocket,
  // handlerefreshAccount,
  // handlerefreshMessange,
  // handleoffrefreshAccount,
  // handleroffefreshMessange,
  // handledisconnect,
  // handleAcctiveDisconnect,
  // handlsendmessange,
  // handlesendtext,
  // handlesendaddgroup,
  // handleactionaddgroup,
  // handlsendmessangeingroup,
  // handlerefreshMessangeingroup,
  // handlerefreshMessangesennder,
  // handleuserjoingroup,
  // handleuserleavegroup,
};
