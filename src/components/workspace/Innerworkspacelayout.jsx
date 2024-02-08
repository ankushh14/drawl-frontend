import Chatcomponent from "../chats/Chatcomponent";
import MainWhiteBoard from "../whiteboard/MainWhiteBoard";
import { useWorkspace } from "../../hooks/useWorkspace";
import { useAuth } from "../../hooks/useAuth";
import { useCallback, useEffect, useState } from "react";
import WorkspaceUtilityBar from "./WorkspaceUtilityBar";
import useTheme from "../../hooks/useTheme";

export default function Innerworkspacelayout() {
  const { name, owner, members } = useWorkspace();
  const { user } = useAuth();
  const [accessToWorkspace, setAccessToWorkspace] = useState(false);
  const { darkMode } = useTheme();
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
      <div
        className={`w-full h-screen max-h-screen flex flex-col ${
          darkMode ? "bg-[#212529]" : "bg-white"
        }`}
      >
        <WorkspaceUtilityBar
          online={online}
          setChatComponent={setChatComponent}
        />
        <div className="w-full flex flex-1 max-h-[calc(100vh-41.6px)]">
          <MainWhiteBoard />
          <Chatcomponent
            setOnline={setOnline}
            chatComponent={chatComponent}
            setChatComponent={setChatComponent}
          />
        </div>
      </div>
    )
  );
}
