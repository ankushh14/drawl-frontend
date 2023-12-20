import Chatcomponent from "../chats/Chatcomponent"
import MainWhiteBoard from "../whiteboard/MainWhiteBoard"

export default function Innerworkspacelayout() {
  return (
    <div className="w-full flex">
        <MainWhiteBoard/>
        <Chatcomponent/>
    </div>
  )
}
