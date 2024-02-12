import AsideBar from "../components/home/AsideBar";
import { useCallback, useEffect, useState } from "react";
import NoWorkSpaceComponent from "../components/home/NoWorkSpaceComponent";
import WorkSpaceModal from "../components/workspace/WorkSpaceModal";
import useTheme from "../hooks/useTheme";
import { getWorkspaces } from "../api/workspace";
import { useAuth } from "../hooks/useAuth";
import { showToastMessage } from "../utils/toasts/showToast";
import WorkspacesInHome from "../components/home/WorkspacesInHome";
import { useWorkspacesUpdate } from "../hooks/useWorkspaceCount";
import JoinWorkspaceModal from "../components/workspace/JoinWorkspaceModal";
import WorkspaceSkeleton from "../utils/skeletons/WorkspaceSkeleton";

export default function HomePage() {
  const { darkMode } = useTheme();
  const { user, token } = useAuth();
  const [workspaces, setWorkspaces] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const { updateWorkspaceCount } = useWorkspacesUpdate();
  const [skeleton, setSkeleton] = useState(false);
  const [noWorkspace, setNoWorkspace] = useState(false);

  const getworkspaces = useCallback(async () => {
    setSkeleton(true);
    const requestBody = {
      owner: user.email,
    };
    const response = await getWorkspaces(requestBody, token);
    if (response.valid) {
      setSkeleton(false);
      if (response.data.length === 0) {
        return setNoWorkspace(true);
      }
      return setWorkspaces(response.data);
    } else {
      setSkeleton(false);
      return showToastMessage(
        response.message + ",Please refresh the page",
        response.info
      );
    }
  }, [user, token]);

  useEffect(() => {
    getworkspaces();
  }, [getworkspaces,updateWorkspaceCount]);

  return (
    <div
      className={` static w-full h-[calc(100vh-41px)] lg:h-full lg:min-h-[calc(100vh-41px)] flex flex-col lg:flex-row  ${
        darkMode ? "bg-[#212529]" : "bg-white"
      }`}
    >
      {!noWorkspace ? (
        <>
          {skeleton ? (
            <WorkspaceSkeleton />
          ) : (
            <WorkspacesInHome workspaces={workspaces} />
          )}
          <AsideBar openModal={setCreateModal} openJoinModal={setJoinModal} />
        </>
      ) : (
        <NoWorkSpaceComponent
          openModal={setCreateModal}
          openJoinModal={setJoinModal}
        />
      )}

      {createModal && <WorkSpaceModal openModal={setCreateModal} />}
      {joinModal && <JoinWorkspaceModal openJoinModal={setJoinModal} />}
    </div>
  );
}
