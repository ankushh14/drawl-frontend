import axios from "axios";
import { ServerUrl,headers } from "../data/auth.data";

const findMembers = async(reqBody)=>{
    try {
        const data = await axios.post(`${ServerUrl}workspace/members`,reqBody,{
            ...headers,
            withCredentials:true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

const createWorkspace = async(requestBody)=>{
    try {
        const data = await axios.post(`${ServerUrl}workspace/create`,requestBody,{
            ...headers,
            withCredentials:true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

const getWorkspaces = async(requestBody)=>{
    try {
        const data = await axios.post(`${ServerUrl}workspace/getworkspaces`,requestBody,{
            ...headers,
            withCredentials:true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

const getSpecificWorkspace = async(requestBody)=>{
    try {
        const data = await axios.post(`${ServerUrl}workspace/getspecific`,requestBody,{
            ...headers,
            withCredentials:true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

export {findMembers,createWorkspace,getWorkspaces,getSpecificWorkspace}