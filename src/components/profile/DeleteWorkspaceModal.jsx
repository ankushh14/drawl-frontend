import useTheme from "../../hooks/useTheme"
import PropTypes from 'prop-types'
import { IoWarning } from "react-icons/io5";
import { deleteWorkspace } from "../../api/workspace";
import { useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import { showToastMessage } from "../../utils/toasts/showToast";
import { useWorkspacesUpdate } from "../../hooks/useWorkspaceCount";


export default function DeleteWorkspaceModal({workspaceName,workspaceID,ModalOpenController}) {
    const { darkMode } = useTheme()
    const { token } = useAuth()
    const { setUpdateWorkspaceCount } = useWorkspacesUpdate()

    const workspaceDelete = useCallback(async()=>{
        let requestBody = {
            workspaceID
        }
        const response = await deleteWorkspace(requestBody,token)
        if(response.valid){
            setUpdateWorkspaceCount((prev)=>!prev)
            return showToastMessage(response.message,response.info)
        }
        return showToastMessage(response.message,response.info)
    },[workspaceID,token,setUpdateWorkspaceCount])

    const handleDelete = async()=>{
        workspaceDelete()
        return ModalOpenController(false)
    }

    return (
        <div className="Modal-background fixed top-0 left-0 right-0 bottom-0 bg-[#5c5b5b5d] flex justify-center items-center">
            <div className={`w-[300px] rounded-md shadow p-3 flex flex-col ${darkMode ? "bg-[#212529] text-white" : "bg-white text-black overflow-hidden"}`}>
                <div className="w-full flex p-2 justify-center items-center text-red-500">
                    <IoWarning size={60}/>
                </div>
                <div className="w-full">
                    <h1 className="text-center w-full font-semibold">Are you sure you want to delete the workspace `{workspaceName}` ?</h1>
                </div>
                <div className="note-div w-full py-2 text-slate-400 text-xs text-center">
                    <p>This action cannot be reverted!!</p>
                </div>
                <div className="btns-div flex w-full justify-center items-center py-2">
                    <button className={`border text-white bg-red-500 mx-1 rounded-md px-4 py-2 text-xs lg:text-sm flex justify-center items-center active:scale-95 transition-all duration-500 w-[40%]`} onClick={handleDelete}>Yes</button>
                    <button className={`border text-white bg-red-500 mx-1 rounded-md px-4 py-2 text-xs lg:text-sm flex justify-center items-center active:scale-95 transition-all duration-500 w-[40%]`} onClick={()=>ModalOpenController(false)}>No</button>
                </div>
            </div>
        </div>
    )
}

DeleteWorkspaceModal.propTypes = {
    workspaceName : PropTypes.string.isRequired,
    workspaceID : PropTypes.string.isRequired,
    ModalOpenController : PropTypes.func.isRequired
}
