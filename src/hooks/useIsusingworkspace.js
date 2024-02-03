import { IsUsingWorkspaceContext } from "../context/IsUsingWorkspaceContext";
import { useContext } from "react";

const useIsusingworkspace = ()=>{
    const context = useContext(IsUsingWorkspaceContext)
    if(!context){
        throw new Error("Use IsusingWorkspace context inside its provider")
    }
    return context
}

export {useIsusingworkspace}