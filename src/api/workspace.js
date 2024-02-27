import axios from "axios";
import { ServerUrl, headers } from "../data/auth.data";

const findMembers = async (reqBody, token) => {
    try {
        const data = await axios.post(`${ServerUrl}workspace/members`, reqBody, {
            headers: {
                "Authorization": `Bearer ${token}`,
                ...headers
            },
            withCredentials: true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}
const findWorkspaces = async (reqBody, token) => {
    try {
        const data = await axios.post(`${ServerUrl}workspace/findworkspaces`, reqBody, {
            headers: {
                "Authorization": `Bearer ${token}`,
                ...headers
            },
            withCredentials: true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

const createWorkspace = async (requestBody, token) => {
    try {
        const data = await axios.post(`${ServerUrl}workspace/create`, requestBody, {
            headers: {
                "Authorization": `Bearer ${token}`,
                ...headers
            },
            withCredentials: true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}
const joinWorkspace = async (requestBody, token) => {
    try {
        const data = await axios.post(`${ServerUrl}workspace/joinworkspace`, requestBody, {
            headers: {
                "Authorization": `Bearer ${token}`,
                ...headers
            },
            withCredentials: true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}
const deleteWorkspace = async (requestBody, token) => {
    try {
        const data = await axios.post(`${ServerUrl}workspace/deleteworkspace`, requestBody, {
            headers: {
                "Authorization": `Bearer ${token}`,
                ...headers
            },
            withCredentials: true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}
const removeMember = async (requestBody, token) => {
    try {
        const data = await axios.post(`${ServerUrl}workspace/removemember`, requestBody, {
            headers: {
                "Authorization": `Bearer ${token}`,
                ...headers
            },
            withCredentials: true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

const leaveWorkspace = async (requestBody, token) => {
    try {
        const data = await axios.post(`${ServerUrl}workspace/leave`, requestBody, {
            headers: {
                "Authorization": `Bearer ${token}`,
                ...headers
            },
            withCredentials: true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

const getWorkspaces = async (requestBody, token) => {
    try {
        const data = await axios.post(`${ServerUrl}workspace/getworkspaces`, requestBody, {
            headers: {
                "Authorization": `Bearer ${token}`,
                ...headers
            },
            withCredentials: true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

const getSpecificWorkspace = async (requestBody, token) => {
    try {
        const data = await axios.post(`${ServerUrl}workspace/getspecific`, requestBody, {
            headers: {
                "Authorization": `Bearer ${token}`,
                ...headers
            },
            withCredentials: true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}
const getProfiles = async (requestBody, token) => {
    try {
        const data = await axios.post(`${ServerUrl}workspace/getprofiles`, requestBody, {
            headers: {
                "Authorization": `Bearer ${token}`,
                ...headers
            },
            withCredentials: true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

export { 
    findMembers, 
    createWorkspace, 
    getWorkspaces, 
    getSpecificWorkspace, 
    getProfiles, 
    findWorkspaces, 
    joinWorkspace, 
    deleteWorkspace, 
    removeMember,
    leaveWorkspace 
}