import { createContext, useCallback, useMemo, useReducer } from "react";
import PropTypes from "prop-types"


const initialState = {
    name: null,
    description: null,
    password: null,
    ID: null,
    members: [],
    passwordStatus : null,
    owner: null
}

const WorkspaceContext = createContext({
    ...initialState,
    enter : ()=>{},
    leave : ()=>{},
    updatePasswordStatus : ()=>{}
})

const workspaceReducer = (state,action) =>{
    switch(action.type){
        case 'ENTER':{
            if(action.payload.password.length > 0){
                return {
                    ...action.payload,
                    passwordStatus : true
                }
            }else{
                return{
                    ...action.payload,
                    passwordStatus : false
                }
            }
        }
        case 'LEAVE':{
            return {
                ...initialState
            }
        }
        case 'UPDATESTATUS':{
            return {
                ...state,
                passwordStatus : action.payload.value
            }
        }
        default:
            throw new Error("unhandled action")
    }
}

const WorkSpaceProvider = ({children})=>{
    const [state,dispatch] = useReducer(workspaceReducer,initialState)
    const enter = useCallback((payload)=>{
        dispatch({
            type : "ENTER",
            payload : {
                ...payload
            }
        })
    },[])

    const leave = useCallback(()=>{
        dispatch({
            type : "LEAVE"
        })
    },[])

    const updatePasswordStatus = useCallback((value)=>{
        dispatch({
            type : "UPDATESTATUS",
            payload : {
                value
            }
        })
    },[])

    const value = useMemo(()=>({
        ...state,
        enter,
        leave,
        updatePasswordStatus
    }),[state,enter,leave,updatePasswordStatus])

    console.log("Workspace : ",state)

    return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

WorkSpaceProvider.propTypes = {
    children : PropTypes.element.isRequired
}

export {WorkSpaceProvider,WorkspaceContext}
