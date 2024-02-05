import { MdOutlineLightMode,MdOutlineDarkMode } from "react-icons/md";
import useTheme from "../../hooks/useTheme";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useCallback, useEffect } from "react";



export default function ThemeToggle() {
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
    <div className={`rounded-xl ${darkMode?"bg-black border-white":"bg-white border-black"} w-[2rem] h-4 flex justify-between transition-colors duration-500 items-center relative p-[0.1rem] cursor-pointer border `}  onClick={toggleTheme}>
        <MdOutlineDarkMode size={14} color="white"/>
        <MdOutlineLightMode size={14} color="black"/>
        <div className={`toggle-ball absolute rounded-full w-4 h-4 transition-all duration-300  ${darkMode?"right-0 bg-white":"right-[0.9rem] bg-black"}`}>
        </div>
    </div>
  )
}
