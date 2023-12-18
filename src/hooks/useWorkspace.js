import { useContext } from "react";
import { WorkspaceContext } from "../context/WorkspaceContext";

const useWorkspace = ()=>{
    const context = useContext(WorkspaceContext)
    if(context === undefined){
        throw new Error("Use context within proper providers")
    }
    return context
}

export {useWorkspace}