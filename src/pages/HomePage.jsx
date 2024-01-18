import AsideBar from "../components/home/AsideBar"
import { useCallback, useEffect, useState } from "react"
import NoWorkSpaceComponent from "../components/home/NoWorkSpaceComponent"
import WorkSpaceModal from "../components/workspace/WorkSpaceModal"
import useTheme from "../hooks/useTheme"
import { getWorkspaces } from "../api/workspace"
import { useAuth } from "../hooks/useAuth"
import { showToastMessage } from "../utils/toasts/showToast"
import WorkspacesInHome from "../components/home/WorkspacesInHome"
import STATUS from "../utils/status"

export default function HomePage() {
  const {darkMode} = useTheme()
  const {user,updateStatus} = useAuth()
  const [workspaces,setWorkspaces] = useState([])
  const [createModal,setCreateModal] = useState(false)

  const getworkspaces = useCallback(async()=>{
    updateStatus(STATUS.PENDING)
    const requestBody = {
      owner : user.email
    }
    const response = await getWorkspaces(requestBody)
    if(response.valid){
      updateStatus(STATUS.SUCCESS)
      return setWorkspaces(response.data)
    }else{
      updateStatus(STATUS.SUCCESS)
      return showToastMessage(response.message,response.info)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user,updateStatus,createModal])

  useEffect(()=>{
    getworkspaces()
  },[getworkspaces])

  return (
    <div className={` static w-full h-[93.7vh] lg:h-full lg:min-h-screen flex flex-col lg:flex-row  ${darkMode?"bg-black":"bg-white"}`}>

      {
        workspaces.length>0?
        <>
          <WorkspacesInHome workspaces={workspaces}/>
          <AsideBar openModal = {setCreateModal}/>
        </>
        :
        <NoWorkSpaceComponent openModal={setCreateModal}/>
      }

      {createModal && <WorkSpaceModal openModal={setCreateModal}/>}
    </div>
  )
}


