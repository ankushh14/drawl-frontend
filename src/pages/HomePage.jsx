import AsideBar from "../components/home/AsideBar"
import { useCallback, useEffect, useState } from "react"
import NoWorkSpaceComponent from "../components/home/NoWorkSpaceComponent"
import WorkSpaceModal from "../components/workspace/WorkSpaceModal"
import useTheme from "../hooks/useTheme"
import { getWorkspaces } from "../api/workspace"
import { useAuth } from "../hooks/useAuth"
import { showToastMessage } from "../utils/toasts/showToast"
import WorkspacesInHome from "../components/home/WorkspacesInHome"

export default function HomePage() {
  const {darkMode} = useTheme()
  const {user} = useAuth()
  const [workspaces,setWorkspaces] = useState([])
  const [createModal,setCreateModal] = useState(false)

  const getworkspaces = useCallback(async()=>{
    const requestBody = {
      owner : user.email
    }
    const response = await getWorkspaces(requestBody)
    if(response.valid){
      return setWorkspaces(response.data)
    }else{
      return showToastMessage(response.message,response.info)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user,createModal])

  useEffect(()=>{
    getworkspaces()
  },[getworkspaces])

  return (
    <div className={`relative md:static w-full h-[93.7vh] md:h-full md:min-h-screen flex flex-col md:flex-row py-3 ${darkMode?"bg-black":"bg-white"}`}>

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


