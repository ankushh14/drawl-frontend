import AsideBar from "../components/home/AsideBar";
import { useState } from "react";
import NoWorkSpaceComponent from "../components/home/NoWorkSpaceComponent";
import WorkSpaceModal from "../components/workspace/WorkSpaceModal";
import WorkspacesInHome from "../components/home/WorkspacesInHome";
import JoinWorkspaceModal from "../components/workspace/JoinWorkspaceModal";

export default function HomePage() {
  const [createModal, setCreateModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [noWorkspace, setNoWorkspace] = useState(false);

  return (
    <div className={` static w-full h-auto flex flex-col lg:flex-row`}>
      {!noWorkspace ? (
        <>
          <WorkspacesInHome setNoWorkspace={setNoWorkspace} />
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
