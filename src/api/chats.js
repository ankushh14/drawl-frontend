import axios from "axios";
import { ServerUrl,headers } from "../data/auth.data";

const getChats = async(requestBody)=>{
    try {
        const data = await axios.post(`${ServerUrl}chats/getchats`,requestBody,{
            ...headers,
            withCredentials:true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

export {getChats}