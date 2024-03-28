import axios from '../setup/axios';

const register = (data) => {
    return axios.post("/api/v1/register", data)
}

const login = (data) => {
    return axios.post("/api/v1/login", data)
}

const accountUser = () => {
    return axios.get("/api/v1/account")
}

export {
    register, accountUser, login
}