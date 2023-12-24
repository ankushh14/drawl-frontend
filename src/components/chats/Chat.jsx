import { useAuth } from "../../hooks/useAuth"
import PropTypes from 'prop-types'

export default function Chat({ message }) {
    const { user } = useAuth()
    return (
        <div className="outline-chat my-4 w-full flex flex-col">
            <div className="w-full p-2 bg-slate-500 rounded-md text-white text-xs ">
                {message}
            </div>
            <div className="prof-div w-full mt-[0.15rem] space-x-2 flex justify-end items-center">
                <h1 className="text-[0.65rem] text-slate-500">{user.email}</h1>
                <img src={user.profile} className="w-5 h-5  rounded-full" alt="profile" />
            </div>
        </div>
    )
}

Chat.propTypes = {
    message: PropTypes.string.isRequired
}