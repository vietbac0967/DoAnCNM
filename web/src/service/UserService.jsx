import axios from '../setup/axios';

const register = (data) => {
    return axios.post("/api/auth/register", data)
}

const login = (data) => {
    return axios.post("/api/auth/login", data)
}

const accountUser = () => {
    return axios.get("/api/auth/verifyAccount")
}

const verifyOTP = (data) => {
    return axios.post("/api/auth/verifyOTP", data)
}

const resendEmail = (data) => {
    return axios.post("/api/auth/reSendEmail", data)
}

const getuserbyPhone = (data) => {
    return axios.post("/api/user/getByPhone", data)
}

const sendRequestFrient = (data) => {
    return axios.post("/api/user/sendFriendRequest", data)

}

const acceptRequestFrient = (data) => {
    return axios.post("/api/user/acceptFriendRequest", data)

}

const rejectRequestFriend = (data) => {
    return axios.post("/api/user/rejectFriendRequest", data)
}

const deleteFriend = (data) => {
    return axios.post("/api/user/deleteFriend", data)
}

const getAllFriend = () => {
    return axios.get("/api/user/getFriends")
}

const updateAVTUser = (data) => {
    return axios.post("/api/user/updateImage", data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
}

const updateUserInfo = (data) => {
    return axios.post("/api/update", data)
}

const getInfoUser = (data) => {
    return axios.post("/api/user", data)
}

const logOutUser = () => {
    return axios.post("/api/auth/logout")
}

export {
    register, accountUser, login, verifyOTP, resendEmail, getuserbyPhone,
    sendRequestFrient, acceptRequestFrient, rejectRequestFriend, deleteFriend,
    getAllFriend, updateAVTUser, updateUserInfo, getInfoUser,logOutUser
}