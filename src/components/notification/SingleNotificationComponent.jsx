import PropTypes from "prop-types"
import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";
import { sendResponse } from "../../api/notification";
import { showToastMessage } from "../../utils/toasts/showToast";
import { useAuth } from "../../hooks/useAuth";
import { useWorkspacesUpdate } from "../../hooks/useWorkspaceCount";

export default function SingleNotificationComponent({item,setNotificationRefresh}) {
    const { token } = useAuth()
    const {setUpdateWorkspaceCount} = useWorkspacesUpdate()
    const handleResponse = async(answer = undefined)=>{
        if(answer === undefined){
            return 
        }
        let requestBody = {
            notificationID : item._id,
            answer
        }
        const response = await sendResponse(requestBody,token)
        if(response.valid){
            setUpdateWorkspaceCount((prev)=>!prev)
            return setNotificationRefresh((prev)=>!prev)
        }else{
            return showToastMessage("Some error occured",response.info)
        }
    }

    return (
        <div className="indi-notification w-full h-[110px] border-b border-inherit last:border-none">
            <p className="text-xs font-semibold p-2 w-full">
                {item.message}
            </p>
            {
                (item.type === "INVITE" || "REQUEST") && <div className="buttons-div flex text-xs items-center p-2 space-x-3">
                    <button type="button" className={` rounded-md px-4 py-2 flex justify-center items-center  active:scale-95 transition-all duration-500 bg-[#FF7F50] text-white font-semibold`} onClick={()=>handleResponse(true)}><IoCheckmarkSharp size={16} className="mr-[0.15rem]"  /> Accept</button>
                    <button type="button" className={` rounded-md px-4 py-2 flex justify-center items-center  active:scale-95 transition-all duration-500 bg-red-500 text-white font-semibold`} onClick={()=>handleResponse(false)}><IoCloseSharp size={16} className="mr-[0.15rem]"  /> Reject</button>

                </div>
            }
        </div>
    )
}

SingleNotificationComponent.propTypes = {
    item : PropTypes.object.isRequired,
    setNotificationRefresh : PropTypes.func.isRequired,
}
