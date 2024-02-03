import { createContext, useState } from "react";
import PropTypes from 'prop-types'

const initialState = {
    isUsingworkspace : false,
    setIsUsingworkspace : () =>{}
}

const IsUsingWorkspaceContext = createContext(initialState)

const IsUsingworkspaceProvider = ({children})=>{
    const [isUsingworkspace, setIsUsingworkspace] = useState(false)

    return <IsUsingWorkspaceContext.Provider value={{isUsingworkspace,setIsUsingworkspace}}>
            {children}
        </IsUsingWorkspaceContext.Provider>

}

IsUsingworkspaceProvider.propTypes = {
    children : PropTypes.element.isRequired
}

export {IsUsingWorkspaceContext,IsUsingworkspaceProvider}