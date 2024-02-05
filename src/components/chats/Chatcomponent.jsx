import { FaCircleChevronRight } from "react-icons/fa6";
import { useWorkspace } from "../../hooks/useWorkspace";
import useTheme from "../../hooks/useTheme";
import Chat from "./Chat";
import { useCallback, useEffect, useRef, useState } from "react";
import Collaborators from "./Collaborators";
import socketIO from "socket.io-client"
import { useAuth } from "../../hooks/useAuth";
import getTime from "../../utils/getTime";
import { getChats } from "../../api/chats";
import {showToastMessage} from "../../utils/toasts/showToast"
import { ImExit } from "react-icons/im";
import { useNavigate } from "react-router-dom";
let io


export default function Chatcomponent() {
  const inputRef = useRef(null)
  const { name } = useWorkspace()
  const {darkMode} = useTheme()
  const [message,setMessage] = useState('')
  const [chatDisable,setChatDisable] = useState(false)
  const [chats,setChats] = useState([])
  const [collaborators,setCollaborators] = useState(false)
  const [online,setOnline] = useState([])
  const { user,token } = useAuth()
  const { ID,leave } = useWorkspace()
  const navigate = useNavigate()

  useEffect(()=>{
    io = socketIO(`${import.meta.env.VITE_CHAT_ENDPOINT}`,{
      query : {
        workspaceID : ID,
        email : user.email
      }
    })
    getMessages()

    return ()=>{
      io.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleSendMessage = (e)=>{
    if(e.code === "Enter" && !e.shiftKey && message.length>0){
      try {
      setChatDisable(true)  
      const time = getTime()
      io.emit('sendMessage',
      {
        message : message,
        email : user.email,
        profile : user.profile,
        id : ID,
        time
      }
      )             
    } catch (error) {
        showToastMessage("Some Error Occured","error")
    }finally{
      setChatDisable(false)
      setMessage('')
    } 
    }
  }

  const simulateEnter = ()=>{
    const enterKeyPressEvent = new KeyboardEvent('keydown', { code: 'Enter', shiftKey: false });
    return handleSendMessage(enterKeyPressEvent)
  }

  const getMessages = useCallback(async()=>{
    let requestBody = {
      ID,
    }
    const data = await getChats(requestBody,token)
    if(data.valid){
      return setChats(data.data)
    }else{
      return
    }
  },[ID,token])

  const updateMessages = useCallback(()=>{
    io.on('message',(newMessage)=>{
      setChats((prev)=>[...prev,newMessage])
    })
  },[setChats])

  const updateOnline = useCallback(()=>{
    io.on('getOnline',(data)=>{
      setOnline(data)
    })
  },[setOnline])

  useEffect(()=>{
    updateOnline()
  },[updateOnline])


  useEffect(()=>{
   updateMessages()
  },[updateMessages])

  return (
    <div className={`w-full absolute  md:w-[40%] xl:w-[25%] md:static h-full border-t flex flex-col ${darkMode?"bg-[#212529] text-white border-[#30363b]":"bg-white text-black border-[#d3d3d3] "}`}>
        <div className="chat-header w-full p-2 rounded-b-sm border-b border-inherit flex justify-between items-center relative">
          <h1 className="font-bold">{name}</h1>
          <div className="header-second-half flex w-[40%] justify-around items-center ">
          <button type="button" onClick={()=>setCollaborators((prev)=>!prev)} className="members-div active:scale-95 transition-all duration-500 p-2 w-[70%] flex justify-center items-center rounded-lg bg-slate-500 text-white border-2 border-slate-600 text-xs">
            Online
          </button>
          { collaborators && <Collaborators currentlyOnline={online}/> }
          <ImExit size={22} className="cursor-pointer" onClick={()=>{navigate("/dashboard"); leave()}}/>
          </div>
        </div>
        <div className="body-chat h-full w-full border-inherit p-2 flex flex-col overflow-y-scroll">
          {
            chats.length > 0 && chats.map((item,index)=>{
              return <Chat chat={item} key={index}/>
            })
          }
        </div>
        <div className="w-full justify-self-end py-2 border-t border-inherit">
          <div className="input-div w-full relative p-2">
            <input ref={inputRef} type="text" value={message} onChange={(e)=>setMessage(e.target.value)} disabled = {chatDisable} placeholder="Type your message here ..." className="p-2 pr-8 w-full text-xs text-slate-500 outline-slate-500 border-2 border-slate-400 rounded-md" onKeyDown={handleSendMessage} />
            <div className="send-btn cursor-pointer absolute right-4 bottom-4" onClick={simulateEnter}>
              <FaCircleChevronRight size={20} className="text-slate-500 bg-inherit"/>
            </div>
          </div>
        </div>
    </div>
  )
}
