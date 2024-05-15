import axios from '../setup/axios';

const login = async (data) => {
    return axios.post("/api/auth/login", data)
}
export {
    login
}