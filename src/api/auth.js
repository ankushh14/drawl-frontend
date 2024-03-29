import axios from "axios";
import { ServerUrl, headers } from "../data/auth.data";

const userRegister = async (requestBody) => {
    try {
        const data = await axios.post(`${ServerUrl}auth/register`, requestBody, {
            headers: headers,
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

const oauthRegister = async(requestBody)=>{
    try {
        const data = await axios.post(`${ServerUrl}auth/oauth`, requestBody, {
            headers: headers,
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

const verifyUser = async (requestBody) => {
    try {
        const data = await axios.post(`${ServerUrl}auth/verify`, requestBody, {
            headers: headers,
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

const userLogin = async (requestBody) => {
    try {
        const data = await axios.post(`${ServerUrl}auth/login`, requestBody, {
            headers: headers,
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}
const refreshToken = async () => {
    try {
        const data = await axios.post(`${ServerUrl}auth/refresh`, {
            headers: {
                ...headers,
            },
            withCredentials: true
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response, info: "error" }
    }
}

const userLogout = async (token) => {
    try {
        const data = await axios.post(`${ServerUrl}auth/logout`, {}, {
            headers: {
                ...headers,
                "Authorization": `Bearer ${token}`
            }
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

const forgotPassword = async (requestBody) => {
    try {
        const data = await axios.post(`${ServerUrl}auth/forgotpassword`, requestBody, {
            headers: headers,
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}

const verifyForgotPassword = async (requestBody) => {
    try {
        const data = await axios.post(`${ServerUrl}auth/verifyforgotpassword`, requestBody, {
            headers: headers,
        })
        return { ...data.data, info: "success" }
    } catch (error) {
        return { ...error.response.data, info: "error" }
    }
}




export {
    userRegister,
    verifyUser,
    userLogin,
    userLogout,
    refreshToken,
    forgotPassword,
    verifyForgotPassword,
    oauthRegister
}