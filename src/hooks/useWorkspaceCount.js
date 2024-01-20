import { useContext } from "react";
import { WorkspaceCountContext } from "../context/UserWorkspaceCountUpdate";

const useWorkspacesUpdate = ()=>{
    const context = useContext(WorkspaceCountContext)
    if(context === undefined){
        throw new Error("useWorkspaceCount must be used inside workspaceContextProvider")
    }
    return context
}

export  {useWorkspacesUpdate}