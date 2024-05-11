import axios from '../setup/axios';

const CreateGroup = (data) => {
    return axios.post("/api/group/create", data)
}

const GetGroupbyUser = () => {
    return axios.get("/api/group/getGroups")
}

const deleteGroup = (data) => {
    return axios.post("/api/group/deleteGroup", data)
}

const getUserForGroup = (groupId) => {
    return axios.get("/api/group/getUserForGroup", {
        params: {
            groupId: groupId
        }
    })
}

const leaveGroup = (data) => {
    return axios.post("/api/group/leaveGroup", data)
}

const updateNameGroup = (data) => {
    return axios.post("/api/group/updateNameGroup", data)
}

const addMember = (data) => {
    return axios.post("/api/group/addMember", data)
}

const getLeadForGroup = (data) => {
    return axios.post("/api/group/lead", data)
}

const deleteMemeberFromGroup = (data) => {
    return axios.post("/api/group/deleteMember", data)
}

const updateDeputyLeader = (data) => {
    return axios.post("/api/group/updateDeputyLeader", data)
}

const updateAVTGroup = (data) => {
    return axios.post("/api/group/updateImageGroup", data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
}


export {
    CreateGroup, GetGroupbyUser, deleteGroup, getUserForGroup, leaveGroup,
    updateNameGroup, addMember, getLeadForGroup, deleteMemeberFromGroup,
    updateDeputyLeader, updateAVTGroup
}
