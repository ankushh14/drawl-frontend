import axios from "axios";
import { ServerUrl,headers } from "../data/auth.data";

const getNotifications = async(reqBody)=>{
    try {
        const data = await axios.post(`${ServerUrl}notifications/get`,reqBody,{
            ...headers,
            withCredentials:true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

const sendResponse = async(reqBody)=>{
    try {
        const data = await axios.post(`${ServerUrl}notifications/response`,reqBody,{
            ...headers,
            withCredentials:true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

export {getNotifications,sendResponse}