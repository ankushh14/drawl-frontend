import Chatcomponent from "../chats/Chatcomponent"
import MainWhiteBoard from "../whiteboard/MainWhiteBoard"
import { useWorkspace } from "../../hooks/useWorkspace"
import { useAuth } from "../../hooks/useAuth"
import { useCallback, useEffect, useState } from "react"

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
      <div className="utility-bar w-full flex p-2 border-b-2 justify-center items-center">
        <h1 className="font-Aclonica font-bold cursor-pointer">
          Nexusmeethub
        </h1>
      </div>
      <div className="w-full flex h-full">
        <MainWhiteBoard />
        <Chatcomponent />
      </div>
    </div>
  )
}
