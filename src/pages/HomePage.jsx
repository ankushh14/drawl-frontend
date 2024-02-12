import AsideBar from "../components/home/AsideBar";
import { useState } from "react";
import NoWorkSpaceComponent from "../components/home/NoWorkSpaceComponent";
import WorkSpaceModal from "../components/workspace/WorkSpaceModal";
import useTheme from "../hooks/useTheme";
import WorkspacesInHome from "../components/home/WorkspacesInHome";
import JoinWorkspaceModal from "../components/workspace/JoinWorkspaceModal";


export default function HomePage() {
  const { darkMode } = useTheme();
  const [createModal, setCreateModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [noWorkspace, setNoWorkspace] = useState(false);

  return (
    <div
      className={` static w-full h-[calc(100vh-41px)] lg:h-full lg:min-h-[calc(100vh-41px)] flex flex-col lg:flex-row  ${
        darkMode ? "bg-[#212529]" : "bg-white"
      }`}
    >
      {!noWorkspace ? (
        <>
          <WorkspacesInHome setNoWorkspace={setNoWorkspace}/>
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
