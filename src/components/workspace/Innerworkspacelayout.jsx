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
      console.log("here")
      return setAccessToWorkspace(true)
    } else {
      console.log("not here")
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
    <div className="w-full flex">
      <MainWhiteBoard />
      <Chatcomponent />
    </div>
  )
}
