import axios from '../setup/axios';

const getAllMessage = (data) => {
    return axios.post("/api/message/getMessages", data)
}

const sendMessage = (data) => {
    return axios.post("/api/message/sendMessage", data)

}

const deleteMessage = (data) => {
    return axios.post("/api/message/deleteMessage", data)

}

const recallMessage = (data) => {
    return axios.post("/api/message/recallMessage", data)
}

const getMessagesGroup = (groupId) => {
    return axios.get("/api/message/messagesGroup", {
        params: {
            groupId: groupId
        }
    })
}

const sendMessageGroup = (data) => {
    return axios.post("/api/message/sendMessageGroup", data)
}

export {
    getAllMessage, sendMessage, deleteMessage, recallMessage,
    getMessagesGroup, sendMessageGroup
}