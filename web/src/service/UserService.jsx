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

export {
    register, accountUser, login, verifyOTP, resendEmail
}