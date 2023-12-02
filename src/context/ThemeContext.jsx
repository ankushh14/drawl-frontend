import { useState } from "react";
import PropTypes from "prop-types"
import { createContext } from "react";

const ThemeContext = createContext(false)


const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false)
    return <ThemeContext.Provider value={{darkMode, setDarkMode}}>
        {children}
    </ThemeContext.Provider>
}

ThemeProvider.propTypes = {
    children: PropTypes.element.isRequired
}

export { ThemeProvider, ThemeContext }