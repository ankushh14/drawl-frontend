import { useCallback, useEffect } from "react";
import { getSpecificWorkspace } from "../../api/workspace";
import { useWorkspace } from "../../hooks/useWorkspace";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import STATUS from "../../utils/status";
import WorkspacePassword from "./WorkspacePassword";
import { showToastMessage } from "../../utils/toasts/showToast";
import Innerworkspacelayout from "./Innerworkspacelayout";


export default function WorkspaceValidator() {
    const navigate = useNavigate()
    const {updateStatus,user} = useAuth()
    const {enter,passwordStatus,owner} = useWorkspace()
    const id = useParams()

    const getWorkspace = useCallback(async () => {

        updateStatus(STATUS.PENDING)
        let requestBody = {
            id
        }
        const response = await getSpecificWorkspace(requestBody)
        if(!response.valid){
            showToastMessage(response.message,response.info)
            return navigate('/home')
        }
        enter(response.data)
        return updateStatus(STATUS.SUCCESS)

    }, [id,updateStatus,enter,navigate])

    useEffect(()=>{
        getWorkspace()
    },[getWorkspace])

    return (
        (passwordStatus && owner !== user.email ) ? <WorkspacePassword/> : <Innerworkspacelayout/>
    )
}
