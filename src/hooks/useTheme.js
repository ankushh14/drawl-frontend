import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const useTheme = ()=>{
    const themeContext = useContext(ThemeContext)
    if(themeContext === undefined){
        throw new Error("Theme Context should be used inside Provider")
    }
    return themeContext
}

export default useTheme