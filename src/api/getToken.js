import axios from "axios";

const getToken = async (googleToken) => {
    try {
        const userData = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleToken}`);
        const returnData = {
            fullname: userData.data.name,
            email: userData.data.email,
            profile: userData.data.picture
        }
        return { returnData, valid: true }
    } catch (error) {
        console.log(error.response.data)
        throw new Error("Invalid Token")
    }
}

export {
    getToken
}