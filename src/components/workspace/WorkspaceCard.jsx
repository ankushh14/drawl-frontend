import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { MdGroup } from "react-icons/md";
import { getProfiles, leaveWorkspace } from "../../api/workspace";
import { useCallback, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
import { useClickAway } from "@uidotdev/usehooks";
import { showToastMessage } from "../../utils/toasts/showToast";
import { useWorkspacesUpdate } from "../../hooks/useWorkspaceCount";

export default function WorkspaceCard({ workspace }) {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const { darkMode } = useTheme();
  const { setUpdateWorkspaceCount } = useWorkspacesUpdate();

  const [profiles, setProfiles] = useState([]);
  const [submenu, setSubmenu] = useState(false);
  const [view, setView] = useState("main");

  const workspaceRoute = import.meta.env.VITE_WORKSPACES;

  const dotsDivRef = useClickAway(() => setSubmenu(false));

  const handleNavigate = () => {
    navigate(`/${workspaceRoute}/${workspace.ID}`);
  };

  const getProfileData = useCallback(async () => {
    const data = await getProfiles({ workspaceID: workspace.ID }, token);
    if (data.valid) setProfiles(data.data);
  }, [workspace, token]);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  const handleLeave = async () => {
    const response = await leaveWorkspace(
      { userEmail: user.email, workspaceID: workspace.ID },
      token,
    );

    if (response.valid) {
      showToastMessage(response.message, response.info);
      setUpdateWorkspaceCount((prev) => !prev);
    } else {
      showToastMessage("Some error occured", response.info);
    }
  };

  return (
    <div
      className={`w-[300px] h-[220px] m-4 rounded-2xl overflow-hidden transition-all duration-300
      ${
        darkMode
          ? "bg-white/5 border border-white/10 hover:bg-white/10"
          : "bg-white border border-gray-200 hover:shadow-md"
      }`}
    >
      {view === "main" && (
        <div className="h-full flex flex-col justify-between p-4">
          <div className="flex justify-between items-start">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm
              ${
                darkMode
                  ? "bg-gradient-to-br from-purple-500 to-indigo-500"
                  : "bg-gradient-to-br from-purple-500 to-indigo-600"
              }`}
            >
              {workspace.name?.substring(0, 2).toUpperCase()}
            </div>

            <div
              className="relative p-2"
              onClick={() => setSubmenu((prev) => !prev)}
              ref={dotsDivRef}
            >
              <div className="flex flex-col gap-[2px]">
                <span
                  className={`w-[3px] h-[3px] rounded-full ${darkMode ? "bg-white" : "bg-black"}`}
                />
                <span
                  className={`w-[3px] h-[3px] rounded-full ${darkMode ? "bg-white" : "bg-black"}`}
                />
                <span
                  className={`w-[3px] h-[3px] rounded-full ${darkMode ? "bg-white" : "bg-black"}`}
                />
              </div>

              <div
                className={`absolute right-0 top-8 w-[150px] rounded-xl z-20 transition
                ${submenu ? "opacity-100 visible" : "opacity-0 invisible"}
                ${
                  darkMode
                    ? "bg-[#1a1b1f]/95 border border-white/10"
                    : "bg-white border border-gray-200 shadow-lg"
                }`}
              >
                <div
                  className="px-3 py-2 text-xs cursor-pointer  hover:text-gray-500"
                  onClick={() => setView("about")}
                >
                  About
                </div>

                <div
                  className="px-3 py-2 text-xs cursor-pointer hover:text-gray-500"
                  onClick={() => setView("members")}
                >
                  Members
                </div>

                {user.email !== workspace.owner && (
                  <div
                    className="px-3 py-2 text-xs text-red-500 cursor-pointer  hover:text-red-600"
                    onClick={handleLeave}
                  >
                    Leave
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h1 className="text-sm font-semibold line-clamp-2">
              {workspace.name}
            </h1>

            <p className="text-xs mt-1 opacity-60 line-clamp-2">
              {workspace.description || "No description provided"}
            </p>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex -space-x-2">
              {profiles.slice(0, 4).map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt="member"
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-[#1a1b1f]"
                />
              ))}
            </div>

            <div className="text-xs flex items-center gap-1 opacity-70">
              <MdGroup size={14} />
              {workspace.members.length + 1}
            </div>
          </div>

          <div className="flex justify-between items-center text-xs mt-3">
            <span className="opacity-60 truncate">{workspace.owner}</span>

            <button
              onClick={handleNavigate}
              className="text-purple-500 hover:underline"
            >
              Open →
            </button>
          </div>
        </div>
      )}

      {(view === "about" || view === "members") && (
        <div className="h-full p-4 flex flex-col">
          <div className="mb-3 cursor-pointer">
            <FaArrowLeft size={16} onClick={() => setView("main")} />
          </div>

          <div className="text-xs flex flex-col gap-2 overflow-y-auto">
            {view === "about" && (
              <p>{workspace.description || "No description available"}</p>
            )}

            {view === "members" &&
              [...workspace.members, workspace.owner + " (owner)"].map(
                (item, index) => <span key={index}>{item}</span>,
              )}
          </div>
        </div>
      )}
    </div>
  );
}

WorkspaceCard.propTypes = {
  workspace: PropTypes.object.isRequired,
};
