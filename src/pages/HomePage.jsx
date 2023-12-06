// import AsideBar from "../components/home/AsideBar"
import { useState } from "react"
import NoWorkSpaceComponent from "../components/home/NoWorkSpaceComponent"
import WorkSpaceModal from "../components/workspace/WorkSpaceModal"
import useTheme from "../hooks/useTheme"
export default function HomePage() {
  const {darkMode} = useTheme()
  const [createModal,setCreateModal] = useState(false)
  return (
    <div className={`w-full h-screen flex flex-col md:flex-row ${darkMode?"bg-black":"bg-white"}`}>
      <NoWorkSpaceComponent openModal={setCreateModal}/>
      {createModal && <WorkSpaceModal openModal={setCreateModal}/>}
    </div>
  )
}
