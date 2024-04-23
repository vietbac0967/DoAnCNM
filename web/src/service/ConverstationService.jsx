import axios from '../setup/axios';

const getConverstations = () => {
    return axios.get("/api/conversation/getAll")
}

const getConversationForward = (messageId) => {
    return axios.get("/api/conversation/getForward", {
        params: {
            messageId: messageId
        }
    })
}

export {
    getConversationForward, getConverstations
}