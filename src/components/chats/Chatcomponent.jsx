import { FaCircleChevronRight } from "react-icons/fa6";
import { useWorkspace } from "../../hooks/useWorkspace";
import useTheme from "../../hooks/useTheme";
import Chat from "./Chat";
import { useState } from "react";


export default function Chatcomponent() {
  const { name } = useWorkspace()
  const {darkMode} = useTheme()
  const [chats,setChats] = useState([])
  return (
    <div className={`w-full absolute md:w-[25%] md:static h-[94vh] border ml-1  flex flex-col border-[#d3d3d3] ${darkMode?"bg-black text-white":"bg-white text-black"}`}>
        <div className="chat-header w-full p-2 rounded-b-sm border border-inherit">
          <h1>{name}</h1>
        </div>
        <div className="body-chat h-full w-full border-inherit p-2 flex flex-col-reverse">
          <Chat/>
          <Chat/>
          <Chat/>
          <Chat/>
        </div>
        <div className="w-full justify-self-end py-2 border-y border-inherit">
          <div className="input-div w-full relative p-2">
            <input type="text" placeholder="Type your message here ..." className="p-2 pr-8 w-full text-xs outline-slate-500 border-2 border-slate-400 rounded-md" />
            <div className="send-btn cursor-pointer absolute right-4 bottom-4">
              <FaCircleChevronRight size={20} className="text-slate-500 bg-inherit"/>
            </div>
          </div>
        </div>
    </div>
  )
}
