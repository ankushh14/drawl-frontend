import { useCallback, useEffect, useState } from "react";
import useTheme from "../../hooks/useTheme"
import { useLocalStorage } from "@uidotdev/usehooks";
import ThemeToggle from "../../utils/theme/ThemeToggle";


export default function Navbar() {
  const {darkMode,setDarkMode} = useTheme()
  const [themeInLocal,setThemeInLocal] = useLocalStorage("darkTheme",false)
  const [nav,setNav] = useState(false)
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
            <h1>
                nexusMeetHub
            </h1>
        </div>
        <div className="common-div flex items-center justify-center">
        <div className="theme-toggle-div">
          <ThemeToggle onClick={toggleTheme}/>
        </div>
        <div className="hamburger-div flex flex-col justify-center items-center mx-1 space-y-[0.15rem] w-[1.5rem]  p-1" onClick={()=>setNav((prev)=>!prev)}>
          <span className={`w-full h-[0.2rem] rounded-xl transition-all duration-500 ${darkMode?"bg-white":"bg-black"} ${nav?"translate-y-[0.168rem] rotate-45":"rotate-0"} `}></span>
          <span className={`w-full h-[0.2rem] rounded-xl transition-all duration-500 ${darkMode?"bg-white":"bg-black"} ${nav?"-translate-y-[0.168rem] -rotate-45":"rotate-0"}`}></span>
        </div>
        </div>
        {/* <div className="nav-menu">

        </div> */}
    </div>
  )
}
