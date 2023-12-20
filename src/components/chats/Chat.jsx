import { useAuth } from "../../hooks/useAuth"

export default function Chat() {
    const {user} = useAuth()
    return (
        <div className="outline-chat my-4 w-full flex flex-col">
            <div className="w-full p-2 bg-slate-500 rounded-md text-white text-xs ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae illum ratione exercitationem!
            </div>
            <div className="prof-div w-full mt-[0.15rem] flex justify-end items-center">
            <img src={user.profile} className="w-5 h-5  rounded-full" alt="profile" />
            </div>
        </div>
    )
}
