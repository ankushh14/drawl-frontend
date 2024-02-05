import Chatcomponent from "../chats/Chatcomponent"
import MainWhiteBoard from "../whiteboard/MainWhiteBoard"
import { useWorkspace } from "../../hooks/useWorkspace"
import { useAuth } from "../../hooks/useAuth"
import { useCallback, useEffect, useState } from "react"
import WorkspaceUtilityBar from "./WorkspaceUtilityBar"

export default function Innerworkspacelayout() {
  const { name, owner, members } = useWorkspace()
  const { user } = useAuth()
  const [accessToWorkspace, setAccessToWorkspace] = useState(false)

  const isMember = useCallback(() => {
    if (owner === user.email || members?.includes(user.email)) {
      return setAccessToWorkspace(true)
    } else {
      return setAccessToWorkspace(false)
    }
  }, [owner, user, members])

  useEffect(() => {
    isMember()
  }, [isMember])

  return (
    (name !== null
      &&
      accessToWorkspace
    )
    &&
    <div className="w-full h-screen flex flex-col">
      <WorkspaceUtilityBar/>
      <div className="w-full flex h-full">
        <MainWhiteBoard />
        <Chatcomponent />
      </div>
    </div>
  )
}
