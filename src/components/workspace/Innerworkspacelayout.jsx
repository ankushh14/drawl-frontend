import Chatcomponent from "../chats/Chatcomponent"
import MainWhiteBoard from "../whiteboard/MainWhiteBoard"
import { useWorkspace } from "../../hooks/useWorkspace"

export default function Innerworkspacelayout() {
  const { name } = useWorkspace()
  return (
    name !== null && <div className="w-full flex">
        <MainWhiteBoard/>
        <Chatcomponent/>
    </div>
  )
}
