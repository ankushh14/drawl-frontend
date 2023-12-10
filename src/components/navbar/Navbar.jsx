import { useCallback, useEffect, useState } from "react";
import useTheme from "../../hooks/useTheme"
import { useLocalStorage } from "@uidotdev/usehooks";
import ThemeToggle from "../../utils/theme/ThemeToggle";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import NotificationComponent from "../notification/NotificationComponent";


export default function Navbar() {
  const {darkMode,setDarkMode} = useTheme()
  const navigate = useNavigate()
  const [themeInLocal,setThemeInLocal] = useLocalStorage("darkTheme",false)
  const [nav,setNav] = useState(false)
  const [notifications,setNotifications] = useState(false)
  const [ping,setPing] = useState(false)
  const changeInTheme = useCallback(()=>{
    setDarkMode(themeInLocal)
  },[setDarkMode,themeInLocal])
  useEffect(()=>{
   changeInTheme() 
  },[changeInTheme])


  const toggleTheme = ()=>{
    return setThemeInLocal((prev)=>!prev)
  }

  return (
    <div className={`navbar w-full flex justify-between items-center p-2 transition-colors duration-500 border-b-2 ${darkMode?"bg-black  text-white border-b-white":"bg-white text-black border-b-[#d3d3d3]"}`}>
        <div className="logo-div">
            <h1 className="font-Aclonica font-bold cursor-pointer" onClick={()=>navigate("/home")}>
                Nexusmeethub
            </h1>
        </div>
        <div className="common-div flex items-center justify-center space-x-1 md:space-x-2">
        <div className="theme-toggle-div">
          <ThemeToggle onClick={toggleTheme}/>
        </div>
        <div className="common-div relative">
          <IoIosNotifications size={20} className="cursor-pointer" onClick={()=>setNotifications((prev)=>!prev)}/>
          {
            ping && 
          <div className="notification-ball absolute bottom-0 right-0 w-[0.55rem] animate-pulse h-[0.55rem] rounded-full bg-[#63f58c]">
          </div>
          }
          <NotificationComponent openController={setNotifications} noti = {notifications} setPing={setPing}/>
        </div>
        <div className="hamburger-div flex flex-col cursor-pointer justify-center items-center space-y-[0.15rem] w-[1.5rem]  p-1" onClick={()=>setNav((prev)=>!prev)}>
          <span className={`w-full h-[0.2rem] rounded-xl transition-all duration-500 ${darkMode?"bg-white":"bg-black"} ${nav?"translate-y-[0.168rem] rotate-45":"rotate-0"} `}></span>
          <span className={`w-full h-[0.2rem] rounded-xl transition-all duration-500 ${darkMode?"bg-white":"bg-black"} ${nav?"-translate-y-[0.168rem] -rotate-45":"rotate-0"}`}></span>
        </div>
        </div>
    </div>
  )
}
