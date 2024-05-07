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

const sendMessageImg = (data) => {
    return axios.post("/api/message/sendImage", data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
}

const sendMessageImgGroup = (data) => {
    return axios.post("/api/message/sendImageGroup", data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
}

export {
    getAllMessage, sendMessage, deleteMessage, recallMessage,
    getMessagesGroup, sendMessageGroup, sendMessageImg, sendMessageImgGroup
}