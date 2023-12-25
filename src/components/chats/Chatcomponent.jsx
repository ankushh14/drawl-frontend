import { FaCircleChevronRight } from "react-icons/fa6";
import { useWorkspace } from "../../hooks/useWorkspace";
import useTheme from "../../hooks/useTheme";
import Chat from "./Chat";
import { useCallback, useEffect, useRef, useState } from "react";
import Collaborators from "./Collaborators";
import socketIO from "socket.io-client"
import { useAuth } from "../../hooks/useAuth";
let io


export default function Chatcomponent() {
  const inputRef = useRef(null)
  const { name } = useWorkspace()
  const {darkMode} = useTheme()
  const [message,setMessage] = useState('')
  const [chats,setChats] = useState([])
  const [collaborators,setCollaborators] = useState(false)
  const { user } = useAuth()
  const { ID } = useWorkspace()

  useEffect(()=>{
    io = socketIO(`${import.meta.env.VITE_CHAT_ENDPOINT}`,{
      query : {
        workspaceID : ID,
        email : user.email
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleSendMessage = (e)=>{
    if(e.code === "Enter" && !e.shiftKey && message.length>0){
      io.emit('sendMessage',
      {
        message : message,
        email : user.email,
        profile : user.profile
      }
      )
      return setMessage('')
    }
  }

  const simulateEnter = ()=>{
    const enterKeyPressEvent = new KeyboardEvent('keydown', { code: 'Enter', shiftKey: false });
    return handleSendMessage(enterKeyPressEvent)
  }



  const updateMessages = useCallback(()=>{
    io.on('message',(newMessage)=>{
      setChats((prev)=>[...prev,newMessage])
    })
  },[setChats])


  useEffect(()=>{
   updateMessages()
  },[updateMessages])

  return (
    <div className={`w-full absolute  md:w-[25%] md:static h-[94vh] border md:ml-1  flex flex-col border-[#d3d3d3] ${darkMode?"bg-black text-white":"bg-white text-black"}`}>
        <div className="chat-header w-full p-2 rounded-b-sm border border-inherit flex justify-between items-center relative">
          <h1 className="font-bold">{name}</h1>
          <button type="button" onClick={()=>setCollaborators((prev)=>!prev)} className="members-div active:scale-95 transition-all duration-500 p-2 w-[30%] flex justify-center items-center rounded-lg bg-slate-500 text-white border-2 border-slate-600 text-xs">
            <h1>Collaborators</h1>
          </button>
          { collaborators && <Collaborators/> }
        </div>
        <div className="body-chat h-full w-full border-inherit p-2 flex flex-col overflow-y-scroll">
          {
            chats.length > 0 && chats.map((item,index)=>{
              return <Chat chat={item} key={index}/>
            })
          }
        </div>
        <div className="w-full justify-self-end py-2 border-y border-inherit">
          <div className="input-div w-full relative p-2">
            <input ref={inputRef} type="text" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Type your message here ..." className="p-2 pr-8 w-full text-xs text-slate-500 outline-slate-500 border-2 border-slate-400 rounded-md" onKeyDown={handleSendMessage} />
            <div className="send-btn cursor-pointer absolute right-4 bottom-4" onClick={simulateEnter}>
              <FaCircleChevronRight size={20} className="text-slate-500 bg-inherit"/>
            </div>
          </div>
        </div>
    </div>
  )
}
