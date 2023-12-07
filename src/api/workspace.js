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

export {findMembers}