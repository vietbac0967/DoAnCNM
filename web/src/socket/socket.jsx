import { io } from "socket.io-client";

const URL_BE = import.meta.env.VITE_URL_BE

const socket = io(URL_BE);

const handleCusttomClient = (data) => {
    socket.emit("storeClientInfo", data)
}

const handlerefreshAccount = (callback) => {
    socket.on("refreshNotification", callback)
}

const handlesendtext = (data) => {
    socket.emit("sendNotification", data)
}

const handlsendmessange = (data) => {
    socket.emit("sendMessage", data)
}

const handlerefreshMessange = (callback) => {
    socket.on("refreshMessage", callback)
}

const handlerefreshMessangesennder = (callback) => {
    socket.on("refreshMessageSender", callback)
}

const handlesendaddgroup = () => {
    socket.emit("sendaddgroup")
}

const handleactionaddgroup = (callback) => {
    socket.on("sendaddgroup", callback)
}

const handlsendmessangeingroup = (data) => {
    socket.emit("sendMessageInGroup", data)
}

const handlerefreshMessangeingroup = (callback) => {
    socket.on("receiveMessageInGroup", callback)
}

const handleuserjoingroup = (data) => {
    socket.emit("joinGroup", data)
}

const handleuserleavegroup = (data) => {
    socket.emit("leaveGroup", data)
}

const handlesendinfoAll = (data) => {
    socket.emit("typing", data)
}

const handlerefreshinfoAll = (callback) => {
    socket.on("typing", callback)
}

const handlesendAllInfo = (data) => {
    socket.emit("allinfo", data)
}

const handlerefreshAllInfo = (callback) => {
    socket.on("allinfo", callback)
}

export {
    handleCusttomClient, handlerefreshAccount, handlesendtext, handlsendmessange,
    handlerefreshMessange, handlerefreshMessangesennder, handlesendaddgroup, handleactionaddgroup,
    handlsendmessangeingroup, handlerefreshMessangeingroup, handleuserjoingroup, handleuserleavegroup,
    handlesendinfoAll, handlerefreshinfoAll, handlesendAllInfo, handlerefreshAllInfo
}