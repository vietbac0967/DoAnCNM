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

const getAllUser = () => {
    return axios.get("/api/admin/users")

}
const getNumberOfSendMessaages = (userId) => {
    return axios.get('/api/admin/messages', {
        params: { userId }
    })
}
const getNumberOfSendImage = (userId) => {
    return axios.get('/api/admin/images', {
        params: { userId }
    })
}
const getNumberOfNewFriends = (userId) => {
    return axios.get('/api/admin/newFriends', {
        params: { userId }
    })
}
const getTotalDataSizeOfUser = (userId) => {
    return axios.get('/api/admin/totalDataSize', {
        params: { userId }
    })
}
const getAllDetailAboutChatApp = () => {
    return axios.get("/api/admin/count")
}
const getFriendsFollowMonthAndYear = (userId, month, year) => {
    return axios.get('/api/admin/newFriends', {
        params: { userId, month, year }
    })
}
const getNewRegisterUsers = (month, year) => {
    return axios.get('/api/admin/newUsers', {
        params: { month, year }
    })
}
const getUserById = (id) => {
    return axios.post('/api/user', {
        userId: id
    })
}
export {
    register, accountUser, login, verifyOTP, resendEmail, getuserbyPhone,
    sendRequestFrient, acceptRequestFrient, rejectRequestFriend, deleteFriend,
    getAllFriend, updateAVTUser, getAllUser, updateUserInfo, getInfoUser, logOutUser,
    getNumberOfSendMessaages, getNumberOfSendImage, getNumberOfNewFriends,
    getTotalDataSizeOfUser, getAllDetailAboutChatApp, getFriendsFollowMonthAndYear,
    getNewRegisterUsers, getUserById
}