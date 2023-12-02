import { useCallback, useEffect } from "react";
import useTheme from "../../hooks/useTheme"
import { useLocalStorage } from "@uidotdev/usehooks";
import ThemeToggle from "../../utils/theme/ThemeToggle";


export default function Navbar() {
  const {darkMode,setDarkMode} = useTheme()
  const [themeInLocal,setThemeInLocal] = useLocalStorage("darkTheme",false)
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
    <div className={`navbar w-full flex justify-between items-center p-2 transition-colors duration-500 border-b ${darkMode?"bg-black  text-white border-b-white":"bg-white text-black border-b-black"}`}>
        <div className="logo-div">
            <h1>
                nexusMeetHub
            </h1>
        </div>
        <div className="theme-toggle-div">
          <ThemeToggle onClick={toggleTheme}/>
        </div>
    </div>
  )
}
