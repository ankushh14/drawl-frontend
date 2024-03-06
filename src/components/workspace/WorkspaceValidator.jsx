import { useCallback, useEffect, useState } from "react";
import { getSpecificWorkspace } from "../../api/workspace";
import { useWorkspace } from "../../hooks/useWorkspace";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import WorkspacePassword from "./WorkspacePassword";
import { showToastMessage } from "../../utils/toasts/showToast";
import Innerworkspacelayout from "./Innerworkspacelayout";
import MainLoader from "../../utils/loaders/MainLoader";


export default function WorkspaceValidator() {
    const navigate = useNavigate()
    const {user,token} = useAuth()
    const {enter,passwordStatus,owner} = useWorkspace()
    const id = useParams()
    const [loader,setLoader] = useState(false)

    const getWorkspace = useCallback(async () => {
        setLoader(true)
        console.log("Re-render")
        let requestBody = {
            id
        }
        const response = await getSpecificWorkspace(requestBody,token)
        setLoader(false)
        if(response.valid){
            return enter(response.data)
        }else{
            showToastMessage(response.message,response.info)
            return navigate('/dashboard')
        }

    }, [id,enter,navigate,token])

    useEffect(()=>{
        getWorkspace()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        loader?<MainLoader/>:
        (passwordStatus && owner !== user.email ) ? <WorkspacePassword/> : <Innerworkspacelayout/>
    )
}
