import axios from "axios";
import { ServerUrl,headers } from "../data/auth.data";

const findMembers = async(reqBody,token)=>{
    try {
        const data = await axios.post(`${ServerUrl}workspace/members`,reqBody,{
            headers:{
                "Authorization":`Bearer ${token}`,
                ...headers
            },
            withCredentials:true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

const createWorkspace = async(requestBody,token)=>{
    try {
        const data = await axios.post(`${ServerUrl}workspace/create`,requestBody,{
            headers:{
                "Authorization":`Bearer ${token}`,
                ...headers
            },
            withCredentials:true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

const getWorkspaces = async(requestBody,token)=>{
    try {
        const data = await axios.post(`${ServerUrl}workspace/getworkspaces`,requestBody,{
            headers:{
                "Authorization":`Bearer ${token}`,
                ...headers
            },
            withCredentials:true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

const getSpecificWorkspace = async(requestBody,token)=>{
    try {
        const data = await axios.post(`${ServerUrl}workspace/getspecific`,requestBody,{
            headers:{
                "Authorization":`Bearer ${token}`,
                ...headers
            },
            withCredentials:true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}
const getProfiles = async(requestBody,token)=>{
    try {
        const data = await axios.post(`${ServerUrl}workspace/getprofiles`,requestBody,{
            headers:{
                "Authorization":`Bearer ${token}`,
                ...headers
            },
            withCredentials:true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

export {findMembers,createWorkspace,getWorkspaces,getSpecificWorkspace,getProfiles}