import axios from '../setup/axios';

const getAllMessage = (data) => {
    return axios.post("/api/message/getMessages", data)
}

const sendMessage = (data) => {
    return axios.post("/api/message/sendMessage", data)

}

export {
    getAllMessage, sendMessage
}