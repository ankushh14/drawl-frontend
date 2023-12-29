import PropTypes from 'prop-types'
import { useAuth } from '../../hooks/useAuth'

export default function Chat({ chat }) {
    const {user} = useAuth()
    return (
        <div className="outline-chat my-4 w-full flex flex-col">
            <div className={`max-w-[80%] p-2 rounded-md text-white text-xs ${user.email === chat.email?"bg-slate-500 self-end":"bg-slate-400 self-start"} `}>
                <p className='w-full'>{chat.message}</p>
                <div className={`time-div w-full ${user.email === chat.email ? "text-end":"text-start"} text-[0.45rem] text-slate-300`}>
                    {chat.time}
                </div>
            </div>
            <div className={`prof-div w-full mt-[0.20rem] ${user.email === chat.email?"flex-row justify-end":"flex-row-reverse justify-start"} flex justify-end items-center`}>
                <h1 className="text-[0.65rem] text-slate-500">
                    {
                        user.email === chat.email ? "you":chat.email
                    }
                </h1>
                <img src={chat.profile} className="w-5 h-5 mx-1 rounded-full" alt="profile" />
            </div>
        </div>
    )
}

Chat.propTypes = {
    chat: PropTypes.object.isRequired
}