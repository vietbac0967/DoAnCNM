import { io } from "socket.io-client";

const socket = io("http://192.160.0.6:5000");

const handleCusttomClient = (data) => {
  socket.emit("storeClientInfo", data);
};

const handlerefreshAccount = (callback) => {
  socket.on("refresh", callback);
};

const handleoffrefreshAccount = () => {
  socket.off("refresh");
};

const handleroffefreshMessange = () => {
  socket.off("refreshmessange");
};

const handlerefreshMessange = (callback) => {
  socket.on("refreshmessange", callback);
};

const handlerefreshMessangesennder = (callback) => {
  socket.on("refreshmessangesender", callback);
};

const handledisconnect = (data) => {
  socket.emit("logout", data);
};

const handleAcctiveDisconnect = () => {
  socket?.disconnect();
};

const handlsendmessange = (data) => {
  socket.emit("sendmessange", data);
};

const handlesendtext = (data) => {
  socket.emit("sendtest", data);
};

const handlesendaddgroup = () => {
  socket.emit("sendaddgroup");
};

const handleactionaddgroup = (callback) => {
  socket.on("sendaddgroup", callback);
};

const handlsendmessangeingroup = (data) => {
  socket.emit("sendmessangeingroup", data);
};

const handlerefreshMessangeingroup = (callback) => {
  socket.on("refreshmessangeingroup", callback);
};

const handleuserjoingroup = (data) => {
  socket.emit("joinRoom", data);
};

const handleuserleavegroup = (data) => {
  socket.emit("leaveRoom", data);
};

export {
  handleCusttomClient,
  handlerefreshAccount,
  handlerefreshMessange,
  handleoffrefreshAccount,
  handleroffefreshMessange,
  handledisconnect,
  handleAcctiveDisconnect,
  handlsendmessange,
  handlesendtext,
  handlesendaddgroup,
  handleactionaddgroup,
  handlsendmessangeingroup,
  handlerefreshMessangeingroup,
  handlerefreshMessangesennder,
  handleuserjoingroup,
  handleuserleavegroup,
};
