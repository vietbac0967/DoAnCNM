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

export {
    handleCusttomClient, handlerefreshAccount, handlesendtext, handlsendmessange,
    handlerefreshMessange, handlerefreshMessangesennder
}