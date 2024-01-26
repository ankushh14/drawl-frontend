import { useCallback, useEffect } from "react";
import { getSpecificWorkspace } from "../../api/workspace";
import { useWorkspace } from "../../hooks/useWorkspace";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import WorkspacePassword from "./WorkspacePassword";
import { showToastMessage } from "../../utils/toasts/showToast";
import Innerworkspacelayout from "./Innerworkspacelayout";


export default function WorkspaceValidator() {
    const navigate = useNavigate()
    const {user,token} = useAuth()
    const {enter,passwordStatus,owner} = useWorkspace()
    const id = useParams()

    const getWorkspace = useCallback(async () => {
        let requestBody = {
            id
        }
        const response = await getSpecificWorkspace(requestBody,token)
        if(response.valid){
            return enter(response.data)
        }else{
            showToastMessage(response.message,response.info)
            return navigate('/dashboard')
        }

    }, [id,enter,navigate,token])

    useEffect(()=>{
        getWorkspace()
    },[getWorkspace])

    return (
        (passwordStatus && owner !== user.email ) ? <WorkspacePassword/> : <Innerworkspacelayout/>
    )
}
