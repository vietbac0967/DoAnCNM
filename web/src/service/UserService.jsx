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
    register, accountUser, login, getAllUser,
    getNumberOfSendMessaages, getNumberOfSendImage, getNumberOfNewFriends,
    getTotalDataSizeOfUser, getAllDetailAboutChatApp, getFriendsFollowMonthAndYear,
    getNewRegisterUsers, getUserById
}