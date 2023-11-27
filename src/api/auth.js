import axios from "axios";
import { ServerUrl,headers } from "../data/auth.data";

const userRegister = async(requestBody)=>{
    try {
        const data = await axios.post(`${ServerUrl}auth/register`, requestBody, {
            headers: headers,
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

const verifyUser = async(requestBody)=>{
    try {
        const data = await axios.post(`${ServerUrl}auth/verify`, requestBody, {
            headers: headers,
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

const userLogin = async(requestBody)=>{
    try {
        const data = await axios.post(`${ServerUrl}auth/login`, requestBody, {
            headers: headers,
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}


export {userRegister,verifyUser,userLogin}