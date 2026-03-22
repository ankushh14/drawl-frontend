import Chatcomponent from "../chats/Chatcomponent";
import MainWhiteBoard from "../whiteboard/MainWhiteBoard";
import { useWorkspace } from "../../hooks/useWorkspace";
import { useAuth } from "../../hooks/useAuth";
import { useCallback, useEffect, useState } from "react";
import WorkspaceUtilityBar from "./WorkspaceUtilityBar";

export default function Innerworkspacelayout() {
  const { name, owner, members } = useWorkspace();
  const { user } = useAuth();
  const [accessToWorkspace, setAccessToWorkspace] = useState(false);
  const [online, setOnline] = useState([]);
  const [chatComponent, setChatComponent] = useState(false);

  const isMember = useCallback(() => {
    if (owner === user.email || members?.includes(user.email)) {
      return setAccessToWorkspace(true);
    } else {
      return setAccessToWorkspace(false);
    }
  }, [owner, user, members]);

  useEffect(() => {
    isMember();
  }, [isMember]);

  return (
    name !== null &&
    accessToWorkspace && (
      <div className={`w-full h-screen max-h-screen flex flex-col`}>
        <WorkspaceUtilityBar
          online={online}
          setChatComponent={setChatComponent}
        />
        <div className="w-full flex flex-1 h-full max-h-[calc(100%-41.6px)]">
          <MainWhiteBoard />
          <Chatcomponent setOnline={setOnline} chatComponent={chatComponent} />
        </div>
      </div>
    )
  );
}
