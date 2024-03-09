import { useAuth } from "../hooks/useAuth"
import { getWorkspaces } from "../api/workspace";
import { useCallback, useEffect, useState } from "react";
import { useWorkspacesUpdate } from "../hooks/useWorkspaceCount";
import ProfileAccordion from "../components/profile/ProfileAccordion";
import { showToastMessage } from "../utils/toasts/showToast";
import useTheme from "../hooks/useTheme";

export default function ProfilePage() {
    const { user,token } = useAuth()
    const {updateWorkspaceCount} = useWorkspacesUpdate()
    const [accordionData,setAccordionData] = useState(null)
    const {darkMode} = useTheme()

    const getUserWorkspaces = useCallback(async()=>{
        let requestBody = {
            owner : user.email,
            forProfile:true
        }
        const data = await getWorkspaces(requestBody,token)
        if(data.valid){
            return setAccordionData(data.data)
        }else{
            showToastMessage(data.message,data.info)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user,token,updateWorkspaceCount])

    useEffect(()=>{
        getUserWorkspaces()
    },[getUserWorkspaces])

    return (
        <div className={`main-profile-div w-full flex flex-col lg:flex-row p-5 ${darkMode?"text-white bg-[#212529]":"bg-white text-black"} min-h-[calc(100vh-40px)]`}>
            <div className="main-profile w-full lg:w-[50%] flex flex-col justify-center items-center p-5 max-h-[400px]">
                <div className="profile-img-div w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] rounded-full border-8 relative">
                    <img src={user.profile} alt={user.email + "profile image"} className="w-full rounded-full h-full object-contain" />
                </div>
                <div className="profile-content-div w-full flex justify-center flex-col items-center pt-4">
                    <div className="fullname-div w-full lg:w-[50%] p-2">
                        <h1 className="w-full text-center text-sm lg:text-base font-semibold">{user.fullname}</h1>
                    </div>
                    <div className="gmail-div w-full lg:w-[50%] p-2">
                        <h1 className="w-full text-center text-sm lg:text-base font-semibold">{user.email}</h1>
                    </div>
                </div>
            </div>
            <div className="workspaces-div w-full lg:w-[50%] flex flex-col">
                <h1 className="font-bold text-xl mb-2">Your workspaces</h1>
                { accordionData?.length === 0 && <p className="text-md font-semibold mt-6 text-center w-full">You currently dont own any workspaces</p> }
                {
                    accordionData?.map((accordion,index)=>{
                        return <ProfileAccordion key={index} workspaceName={accordion.name} workspaceMembers={accordion.members} workspaceID={accordion.ID} workspacePassword={accordion.password}/>
                    })
                }
            </div>
        </div>
    )
}
