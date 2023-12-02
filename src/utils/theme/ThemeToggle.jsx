import { MdOutlineLightMode,MdOutlineDarkMode } from "react-icons/md";
import useTheme from "../../hooks/useTheme";
import PropTypes from "prop-types"


export default function ThemeToggle({onClick}) {
  const {darkMode} = useTheme()  
  return (
    <div className={`rounded-xl ${darkMode?"bg-black border-white":"bg-white border-black"} w-[2rem] h-4 flex justify-between transition-colors duration-500 items-center relative p-[0.1rem] cursor-pointer border `}  onClick={onClick}>
        <MdOutlineDarkMode size={14} color="white"/>
        <MdOutlineLightMode size={14} color="black"/>
        <div className={`toggle-ball absolute rounded-full w-4 h-4 transition-all duration-300  ${darkMode?"right-0 bg-white":"right-[0.9rem] bg-black"}`}>
        </div>
    </div>
  )
}

ThemeToggle.propTypes = {
    onClick : PropTypes.func.isRequired
}
