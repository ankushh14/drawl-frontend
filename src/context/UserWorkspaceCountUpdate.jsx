import { useState,createContext } from "react";
import PropTypes from 'prop-types'

const WorkspaceCountContext = createContext({
    updateWorkspaceCount : false,
    setUpdateWorkspaceCount : () =>{}
})

const WorkspaceCountProvider = ({children})=>{
    const [updateWorkspaceCount,setUpdateWorkspaceCount] = useState(false)
    return <WorkspaceCountContext.Provider value = {{updateWorkspaceCount,setUpdateWorkspaceCount}}>
            {children}
            </WorkspaceCountContext.Provider>
}

WorkspaceCountProvider.propTypes = {
    children : PropTypes.element.isRequired
}

export {WorkspaceCountContext,WorkspaceCountProvider}

