import axios from "axios";
import { ServerUrl,headers } from "../data/auth.data";

const googleAuthTokenValidation = async (authToken) => {
    try {
        const userData = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${authToken}`);
        const {name,email} = userData.data
        let returnObj = {
            fullname:name,
            email
        }
        return returnObj
    } catch (error) {
        throw new Error("Invalid Token")
    }
}

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


export {googleAuthTokenValidation,userRegister,verifyUser,userLogin}