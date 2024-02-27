import axios from "axios";
import { ServerUrl, headers } from "../data/auth.data";

const getNotifications = async (reqBody, token) => {
    try {
        const data = await axios.post(`${ServerUrl}notifications/get`, reqBody, {
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

const sendResponse = async (reqBody, token) => {
    try {
        const data = await axios.post(`${ServerUrl}notifications/response`, reqBody, {
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

const deleteOne = async (reqBody, token) => {
    try {
        const data = await axios.post(`${ServerUrl}notifications/deleteone`, reqBody, {
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

const clearAll = async (reqBody, token) => {
    try {
        const data = await axios.post(`${ServerUrl}notifications/clearall`, reqBody, {
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
    getNotifications,
    sendResponse,
    deleteOne,
    clearAll
}