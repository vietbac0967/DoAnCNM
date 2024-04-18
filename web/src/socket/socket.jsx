import { io } from "socket.io-client";

const URL_BE = import.meta.env.VITE_URL_BE

const socket = io(URL_BE);

const handleCusttomClient = (data) => {
    socket.emit("storeClientInfo", data)

}

const handlerefreshAccount = (callback) => {
    socket.on("refresh", callback)
}

const handlesendtext = (data) => {
    socket.emit("sendtest", data)
}

const handlsendmessange = (data) => {
    socket.emit("sendmessange", data)
}

const handlerefreshMessange = (callback) => {
    socket.on("refreshmessange", callback)
}

const handlerefreshMessangesennder = (callback) => {
    socket.on("refreshmessangesender", callback)
}

const handlesendaddgroup = () => {
    socket.emit("sendaddgroup")
}

const handleactionaddgroup = (callback) => {
    socket.on("sendaddgroup", callback)
}

const handlsendmessangeingroup = (data) => {
    socket.emit("sendmessangeingroup", data)
}

const handlerefreshMessangeingroup = (callback) => {
    socket.on("refreshmessangeingroup", callback)
}

const handleuserjoingroup = (data) => {
    socket.emit("joinRoom", data)
}

const handleuserleavegroup = (data) => {
    socket.emit("leaveRoom", data)
}

export {
    handleCusttomClient, handlerefreshAccount, handlesendtext, handlsendmessange,
    handlerefreshMessange, handlerefreshMessangesennder, handlesendaddgroup, handleactionaddgroup,
    handlsendmessangeingroup, handlerefreshMessangeingroup, handleuserjoingroup, handleuserleavegroup
}