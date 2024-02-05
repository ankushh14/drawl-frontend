import { useCallback, useState } from "react";
import useTheme from "../../hooks/useTheme"
import ThemeToggle from "../../utils/theme/ThemeToggle";
import { IoIosNotifications } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import NotificationComponent from "../notification/NotificationComponent";
import { useAuth } from "../../hooks/useAuth";
import { userLogout } from "../../api/auth";
import { showToastMessage } from "../../utils/toasts/showToast";
import { useIsusingworkspace } from "../../hooks/useIsusingworkspace";


export default function Navbar() {
  const {darkMode} = useTheme()
  const {isUsingworkspace} = useIsusingworkspace()
  const navigate = useNavigate()
  const {user,token,logout} = useAuth()
  const [nav,setNav] = useState(false)
  const [notifications,setNotifications] = useState(false)
  const [ping,setPing] = useState(false)



  const logoutFunction = useCallback(async()=>{
    const data = await userLogout(token)
    if(data.valid){
      showToastMessage(data.message,data.info)
      return logout()
    }else{
      showToastMessage(data.message,data.info)
    }
  },[token,logout])

  return (
    <div className={`
    navbar w-full flex justify-between items-center p-2 transition-colors duration-500 border-b 
    ${darkMode?"bg-[#212529]  text-white border-white":"bg-white text-black border-[#d3d3d3]"}
    ${isUsingworkspace && "hidden"}
    `}>
        <div className="logo-div">
            <h1 className="font-Aclonica font-bold cursor-pointer" onClick={()=>navigate("/dashboard")}>
                Nexusmeethub
            </h1>
        </div>
        <div className="some-div flex items-center justify-center space-x-1 md:space-x-2">
        <div className="theme-toggle-div">
          <ThemeToggle/>
        </div>
        <div className="common-div relative">
          <IoIosNotifications size={20} className="cursor-pointer" onClick={()=>setNotifications((prev)=>!prev)}/>
          {
            ping && 
          <div className="notification-ball absolute bottom-0 right-0 w-[0.55rem] animate-pulse h-[0.55rem] rounded-full bg-[#63f58c]">
          </div>
          }
        </div>
        <div className="hamburger-div flex flex-col cursor-pointer justify-center items-center space-y-[0.15rem] w-[1.5rem]  p-1" onClick={()=>setNav((prev)=>!prev)}>
          <span className={`w-full h-[0.2rem] rounded-xl transition-all duration-500 ${darkMode?"bg-white":"bg-black"} ${nav?"translate-y-[0.168rem] rotate-45":"rotate-0"} `}></span>
          <span className={`w-full h-[0.2rem] rounded-xl transition-all duration-500 ${darkMode?"bg-white":"bg-black"} ${nav?"-translate-y-[0.168rem] -rotate-45":"rotate-0"}`}></span>
        </div>
        <ul className={`nav-inside-div flex flex-col text-sm w-full md:w-[320px] top-[2.55rem] absolute ${nav?"h-[214px] border py-3":"h-0 py-0 border-none"} transition-height overflow-hidden duration-500 rounded-md right-0 px-6 z-30 ${!darkMode?"bg-white text-black border-[#d3d3d3]":"bg-[#212529] text-white border-white"}`}>
          <li className="w-full py-3 flex justify-between text-xs">
            <span>{user.email}</span>
            <img src={user.profile} alt={`${user.email} profile`} className={`w-[20px] h-[20px] rounded-full`}/>
          </li>
          <NavLink className="w-full border-t border-inherit py-2" to={"/dashboard"} onClick={()=>setNav((prev)=>!prev)}>Dashboard</NavLink>
          <NavLink className="w-full border-y border-inherit py-2" to={"/profile"} onClick={()=>setNav((prev)=>!prev)}>Profile</NavLink>
          <button type="button" onClick={()=>logoutFunction()} className={`border border-[#d3d3d3] bg-red-500 text-white rounded-md px-8 py-3 my-3 flex justify-center items-center active:scale-95 transition-all duration-500`}>Logout</button>
        </ul>
        </div>
        <NotificationComponent openController={setNotifications} noti = {notifications} setPing={setPing}/>
    </div>
  )
}
