import PropTypes from "prop-types";
import useTheme from "../../hooks/useTheme";
import WorkspaceCard from "../workspace/WorkspaceCard";
import { getWorkspaces } from "../../api/workspace";
import { showToastMessage } from "../../utils/toasts/showToast";
import { useCallback, useEffect, useState } from "react";
import { useWorkspacesUpdate } from "../../hooks/useWorkspaceCount";
import { useAuth } from "../../hooks/useAuth";
import WorkspaceSkeleton from "../../utils/skeletons/WorkspaceSkeleton";

export default function WorkspacesInHome({ setNoWorkspace }) {
  const { darkMode } = useTheme();
  const { updateWorkspaceCount } = useWorkspacesUpdate();
  const [skeleton, setSkeleton] = useState(false);
  const { user, token } = useAuth();
  const [workspaces, setWorkspaces] = useState([]);

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
      setNoWorkspace(false)
      return setWorkspaces(response.data);
    } else {
      setSkeleton(false);
      return showToastMessage(
        response.message + ",Please refresh the page",
        response.info
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token, setNoWorkspace,updateWorkspaceCount]);

  useEffect(() => {
    getworkspaces();
  }, [getworkspaces]);

  return (
    <div
      className={`cards-cont flex flex-wrap overflow-y-scroll justify-center h-[80%] lg:h-auto lg:overflow-hidden w-full  lg:w-[70%]  p-4  
      ${
        darkMode
          ? "bg-[#212529] text-white  shadow-white"
          : "bg-white text-black shadow-slate-500"
      }`}
    >
      {skeleton ? (
        <WorkspaceSkeleton />
      ) : (
        workspaces.map((item, index) => {
          return <WorkspaceCard workspace={item} key={index} />;
        })
      )}
    </div>
  );
}

WorkspacesInHome.propTypes = {
  setNoWorkspace: PropTypes.func.isRequired,
};
