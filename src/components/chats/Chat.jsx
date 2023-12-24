import PropTypes from 'prop-types'
import { useAuth } from '../../hooks/useAuth'

export default function Chat({ chat }) {
    const {user} = useAuth()
    return (
        <div className="outline-chat my-4 w-full flex flex-col">
            <div className="w-full p-2 bg-slate-500 rounded-md text-white text-xs ">
                {chat.message}
            </div>
            <div className="prof-div w-full mt-[0.15rem] space-x-2 flex justify-end items-center">
                <h1 className="text-[0.65rem] text-slate-500">
                    {
                        user.email === chat.email ? "you":chat.email
                    }
                </h1>
                <img src={chat.profile} className="w-5 h-5  rounded-full" alt="profile" />
            </div>
        </div>
    )
}

Chat.propTypes = {
    chat: PropTypes.object.isRequired
}